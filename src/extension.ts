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
				'Code with Sign Language',
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
				addToCode(message, editor),
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
						/*
						if (reserved.includes(expression)) {
							signs.push(expression);
						} else {
						*/
							const characters = expression.split('');
							for (let character of characters) {
								if (character.match(/[a-z0-9]/)) {
									signs.push(character);
								}
							}
						// }
					}
				}
			}

			for (let sign of signs) {
				videos.push({
					sign: sign,
					file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',sign+'.mp4')),
				});
			}
			webview.postMessage({videos});

			webview.html = getWebviewContent(webview, uri);
		})
	);
}

function addToCode(message: string, editor: vscode.TextEditor) : void
{
	if (editor && editor.selections) {
		for (let selection of editor.selections) {
			const position = new vscode.Position(selection.end + 1);
			editor.edit((editor, position, message) => {
				editor.insert(position, message.text);
			});
		}
	}
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
		<div id="infoContainer">
			<div id="currentTime"></div>
			<div id="currentSpeed">1x</div>
			<div id="totalDuration"></div>
		</div>		
		<div id="videoContainer"></div>
		<div id="playerTopContainer">
			<button id="slower">
				<i class="fa-solid fa-backward" id="slowerIcon"></i>
			</button>
			<div id="currentSign"></div>
			<button id="faster">
				<i class="fa-solid fa-forward" id="fasterIcon"></i>
			</button>
		</div>
		<div id="playerBottomContainer">
			<button id="rewind">
				<i class="fa-solid fa-backward-fast" id="rewindIcon"></i>
			</button>
			<button id="backward">
				<i class="fa-solid fa-backward-step" id="backwardIcon"></i>
			</button>
			<button id="playPause">
				<i class="fa-regular fa-circle-play" id="playPauseIcon"></i>
			</button>
			<button id="forward">
				<i class="fa-solid fa-forward-step" id="forwardIcon"></i>
			</button>
			<button id="autoRepeat">
				<i class="fa-solid fa-repeat" id="autoRepeatIcon"></i>
			</button>
		</div>
		<div id="addToCodeContainer">
			<button id="addToCode">
				<i class="fa-regular fa-keyboard"></i>
				<i class="fa-solid fa-arrow-right"></i>
				<i class="fa-regular fa-file-code"></i>
			</button>
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
    'abstract',
    'arguments',
    'as',
    'async',
    'await',
    'boolean',
    'break',
    'byte',
    'case',
    'catch',
    'char',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'double',
    'else',
    'enum',
    'eval',
    'export',
    'extends',
    'false',
    'final',
    'finally',
    'float',
    'for',
    'from',
    'function',
    'get',
    'goto',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'int',
    'interface',
    'let',
    'long',
    'native',
    'new',
    'null',
    'of',
    'package',
    'private',
    'protected',
    'public',
    'return',
    'set',
    'short',
    'static',
    'super',
    'switch',
    'synchronized',
    'this',
    'throw',
    'throws',
    'transient',
    'true',
    'try',
    'typeof',
    'var',
    'void',
    'volatile',
    'while',
    'with',
    'yield',
];
