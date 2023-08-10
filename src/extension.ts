import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext)
{
	// TODO: copy media to client extension path if it was not copied yet

	let panel: vscode.WebviewPanel | undefined = undefined;

	context.subscriptions.push(
		vscode.commands.registerCommand('code-with-sign-language.start', () =>
		{
			if (panel) {
				panel.dispose();
			}

			panel = vscode.window.createWebviewPanel(
				'sign-videos',
				'Libras',
				vscode.ViewColumn.Two,
				{
					enableScripts: true,
					retainContextWhenHidden: true
				}
			);

			panel.onDidDispose(
				() => { panel = undefined; },
				undefined,
				context.subscriptions
			);

			const webview = panel.webview;
			const editor = vscode.window.activeTextEditor;
			const uri = context.extensionUri;
			let signs = [], videos = [];

			webview.onDidReceiveMessage(
				message => {
					if (editor) {
						const position = editor.selection.active;
						editor.edit(builder => {
							builder.insert(position, message.text);
						});
					}
				},
				undefined,
				context.subscriptions
			);

			if (editor && editor.selections) {
				for (let selection of editor.selections) {
					const range = new vscode.Range(selection.start, selection.end);
					const selected = editor.document.getText(range)
						.trim()
						.replace(/\s+/g, ' ')
						.toLowerCase()
						.split(' ');
					for (let expression of selected) {
						/* if (reserved.includes(expression) || futureReserved.includes(expression)) {
							signs.push(expression);
						} else { */
							const characters = expression.split('');
							for (let character of characters) {
								if (character.match(/[a-z0-9]/)) {
									signs.push(character);
								}
							}
						// }
					}
				}
				if (!signs.length) {
					videos.push({
						sign: '',
						file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','oi.mp4')),
					});
				} else {
					for (let sign of signs) {
						videos.push({
							sign: sign,
							file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',sign+'.mp4')),
						});
					}
				}
			}

			webview.postMessage({videos});

			webview.html = getWebviewContent(webview, uri);
		})
	);
}

function getWebviewContent(webview: vscode.Webview, uri: vscode.Uri) : string
{
	const allCss = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','fontawesome.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','regular.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','solid.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','webview.css')),
	];

	const allJs = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery.js')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','webview.js')),
	];

	let html = `
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	`;

	for (let css of allCss) {
		html += `<link href="${css}" rel="stylesheet">`;
	}

	html += `
	</head>
	<body>
		<div id="tabsContainer">
			<button id="tabCodeToSign" class="infoToggle">
				<i class="fa-regular fa-file-code codeToSignIcon"></i>
    				<i class="fa-solid fa-arrow-right codeToSignIcon" id="codeToSignArrow"></i>
				<i class="fa-solid fa-hands codeToSignIcon"></i>
			</button>
			<div id="verticalLine"></div>
			<button id="tabSignToCode" class="infoToggle">
				<i class="fa-solid fa-hands signToCodeIcon"></i>
    				<i class="fa-solid fa-arrow-right signToCodeIcon" id="signToCodeArrow"></i>
				<i class="fa-regular fa-file-code signToCodeIcon"></i>
			</button>
		</div>
		<div id="timeContainer">
			<div id="currentTime" class="infoTimeToggle"></div>
			<div id="speedContainer">
				<button id="slower" class="infoToggle">
					<i class="fa-solid fa-backward" id="slowerIcon"></i>
				</button>
				<span id="currentSpeed" class="infoTimeToggle">1x</span>
				<button id="faster" class="infoToggle">
					<i class="fa-solid fa-forward" id="fasterIcon"></i>
				</button>
			</div>
			<div id="totalDuration" class="infoTimeToggle"></div>
		</div>		
		<div id="videoContainer"></div>
		<div id="playerMainContainer">
			<button id="rewind" class="infoToggle">
				<i class="fa-solid fa-backward-fast" id="rewindIcon"></i>
			</button>
			<button id="backward" class="infoToggle">
				<i class="fa-solid fa-backward-step" id="backwardIcon"></i>
			</button>
			<button id="playPause">
				<i class="fa-regular fa-circle-play" id="playPauseIcon"></i>
			</button>
			<button id="forward" class="infoToggle">
				<i class="fa-solid fa-forward-step" id="forwardIcon"></i>
			</button>
			<button id="autoRepeat" class="infoToggle">
				<i class="fa-solid fa-repeat" id="autoRepeatIcon"></i>
			</button>
		</div>
		<div id="playerInfoContainer">
			<div id="currentSign"></div>
			<div id="otherActionsContainer">
				<button id="addToCode" disabled>
					<i class="fa-regular fa-keyboard" id="addToCodeIcon"></i>
				</button>
				<button id="info">
					<i class="fa-regular fa-circle-question" id="infoIcon"></i>
				</button>
			</div>
		</div>
	`;

	for (let js of allJs) {
		html += `<script src="${js}"></script>`;
	}

	html += `
	</body>
	</html>
	`;

	return html;
}

export function deactivate() {
	// TODO: clean up media from client extension path
}

const reserved = [
	'arguments',
	'as',
	'async',
	'await',
	'break',
	'case',
	'catch',
	'class',
	'const',
	'constructor',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'eval',
	'export',
	'extends',
	'false',
	'finally',
	'for',
	'from',
	'function',
	'get',
	'if',
	'import',
	'in',
	'instanceof',
	'let',
	'NaN',
	'new',
	'null',
	'of',
	'return',
	'set',
	'static',
	'super',
	'switch',
	'this',
	'throw',
	'true',
	'try',
	'typeof',
	'undefined',
	'var',
	'void',
	'while',
	'with',
	'yield',
];

const futureReserved = [
	'enum',
	'implements',
	'interface',
	'package',
	'private',
	'protected',
	'public',
];

const dictionary = [
	{
		category: 'Variáveis e Constantes',
		signs: ['var', 'let', 'const', 'typeof'],
	},
	{
		category: 'Valores',
		signs: ['true', 'false', 'null', 'undefined', 'NaN'],
	},
	{
		category: 'Estruturas de Condição',
		signs: ['if', 'else', 'switch', 'case', 'default'],
	},
	{
		category: 'Estruturas de Repetição',
		signs: ['while', 'do', 'break', 'continue', 'for', 'of', 'in'],
	},
	{
		category: 'Tratamento de Exceção',
		signs: ['try', 'catch', 'finally', 'throw'],
	},
	{
		category: 'Funções e Métodos',
		signs: ['function', 'void', 'return', 'arguments', 'eval', 'yield'],
	},
	{
		category: 'Classes',
		signs: ['class', 'constructor', 'get', 'set', 'extends', 'static'],
	},
	{
		category: 'Objetos',
		signs: ['new', 'this', 'super', 'instanceof', 'delete'],
	},
	{
		category: 'Programação Assíncrona',
		signs: ['async', 'await'],
	},
	{
		category: 'Módulos',
		signs: ['import', 'export', 'from', 'as'],
	},
	{
		category: 'Depuração',
		signs: ['debugger'],
	},
];
