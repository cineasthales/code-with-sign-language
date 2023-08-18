import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext)
{
	// TODO: copy media to client extension path if it was not copied yet

	let panel: vscode.WebviewPanel | undefined = undefined;

	context.subscriptions.push(
		vscode.commands.registerCommand('code-with-sign-language.start', () =>
		{
			if (panel) { panel.dispose(); }

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
			let signs, videos = [];

			webview.onDidReceiveMessage(
				message => {
					if (editor)
					{
						const position = editor.selection.active;
						editor.edit(builder => {
							builder.insert(position, message.text);
						});
					}
				},
				undefined,
				context.subscriptions
			);

			if (editor && editor.selections)
			{
				signs = fetchSigns(editor);
				
				for (let sign of signs)
				{
					videos.push({
						sign: sign,
						file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',sign+'.mp4')),
					});
				}
			}

			webview.postMessage({videos});

			webview.html = getWebviewContent(webview, uri);
		})
	);
}

function fetchSigns(editor: vscode.TextEditor) : string[]
{
	let signs = [];

	for (let selection of editor.selections)
	{
		const range = new vscode.Range(selection.start, selection.end);
		const text = editor.document.getText(range).trim().replace(/\t\v\f[ ]+/g, ' ');
		const textLength = text.length;

		for (let i = 0; i < textLength; i++)
		{
			/*
			se char é espaço
				continuar

			se char é \r\n
				se closure é \r\n
					closure vira vazio
				continuar

			se char é aspa, apóstrofo ou acento grave
				se closure é vazio
					closure vira o char
					adiciona "string.start" no signs
					continuar
				se closure é o char
					closure vira vazio
					adiciona "string.end" no signs
					continuar

			senão se char é asterisco e char seguinte é barra e closure é * /
			closure vira vazio
			adiciona "comment.end" no signs
			i++
			continuar

			senão se char é sustenido e char seguinte é exclamação e closure é vazio
			closure vira \r\n
			adiciona "comment.hashbang" no signs
			i++
			continuar

			senão se char é barra
			se closure é vazio
				se char seguinte é barra
					closure vira \r\n
					adiciona "comment.single" no signs
					i++
				senão se char seguinte é asterisco
					closure vira * /
					adiciona "comment.start" no signs
					i++
				senão
					closure vira barra
					adiciona "regex.start" no signs
				continuar
			se closure é barra
				closure vira vazio
				adiciona "regex.end" no signs
				continuar

			senão se closure é vazio e se char é início de palavra reservada e se não tiver \w_$ antes dele
			faz substring dessa palavra até o próximo char não letra minúscula
			se esta substring conter nas palavras reservadas e depois dela não tem \w_$
				adiciona palavra reservada em signs
				i avança até o último char da palavra
				continuar

			adiciona char em signs
			*/

			///////////////////////////////////////////////////////////////////////

			/*
			if (text[i].match(/\s/)) {
				continue;
			}

			if (text[i].match(/a-gilopnr-wy/))
			{
				let noMatch = true;
				
				for (let word of reservedWords)
				{
					const wordLength = word.length;
					
					if (text.indexOf(word, i) === i
						&& (i === 0 || !text[i-1].match(/\w_$/))
						&& (i+wordLength === textLength ||
							!text[i+wordLength].match(/\w_$/)))
					{
						signs.push(word);
						noMatch = false;
						i += wordLength-1;
						break;
					}
				}

				if (noMatch) { signs.push(text[i]); }
			}
			else if (text[i].match(/'"/))
			{
				const character = text[i];
				signs.push('string');
				do { i++; signs.push(text[i]); }
				while (text[i] != character);
			}
			else if (text[i].match(/`/))
			{
				const character = text[i];
				signs.push('templateString');
				do { i++; signs.push(text[i]); }
				while (text[i] != character);
			}
			else if (text[i] === '/')
			{
				if (i+1 < textLength)
				{
					i++;
					if (text[i] === '/')
					{
						signs.push('singleLineComment');
						do { i++; signs.push(text[i]); }
						while (!(text[i].match(/\r\n/)));
					}
					else if (text[i] === '*')
					{
						signs.push('multipleLinesComment');
						do { i++; signs.push(text[i]); }
						while (!(text[i] === '*' && text[i+1] === '/'));
						i++;
					}
				}
			}
			else {
				signs.push(text[i]);
			}
			*/
		}
	}

	if (!signs.length) { signs.push("oi"); }

	return signs;
}

function getWebviewContent(webview: vscode.Webview, uri: vscode.Uri) : string
{
	const allCss = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','fontawesome.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','regular.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','solid.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','jquery-ui.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','webview.css')),
	];

	const allJs = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery.js')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery-ui.js')),
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
		<nav id="tabsContainer">
			<button id="tabCodeToSign" class="infoToggle" title="Tradutor de código para Libras">
				<i class="fa-regular fa-file-code"></i>
				<i class="fa-solid fa-arrow-right" id="codeToSignArrow"></i>
				<i class="fa-solid fa-hands"></i>
			</button>
			<div id="verticalLine"></div>
			<button id="tabSignToCode" class="infoToggle" title="Tradutor de Libras para código">
				<i class="fa-solid fa-hands"></i>
				<i class="fa-solid fa-arrow-right" id="signToCodeArrow"></i>
				<i class="fa-regular fa-file-code"></i>
			</button>
		</nav>
		<main>
			<section id="timeContainer">
				<div id="currentTime" class="infoTimeToggle"></div>
				<div id="speedContainer">
					<button id="slower" class="infoToggle" title="Diminuir velocidade">
						<i class="fa-solid fa-backward" id="slowerIcon"></i>
					</button>
					<span id="currentSpeed" class="infoTimeToggle">1x</span>
					<button id="faster" class="infoToggle" title="Aumentar velocidade">
						<i class="fa-solid fa-forward" id="fasterIcon"></i>
					</button>
				</div>
				<div id="totalDuration" class="infoTimeToggle"></div>
			</section>
			<section id="categoriesContainer">`;

				for (let category of categories) {
					html += `
					<button id="category${category.id}" class="infoToggle" title="${category.title}">
						<i class="fa-solid fa-${category.icon}" id="category${category.id}Icon"></i>
					</button>`;
				}

			html += `
			</section>
			<div id="videoContainer"></div>
			<section id="playerMainContainer">
				<button id="rewind" class="infoToggle" title="Retornar ao início">
					<i class="fa-solid fa-backward-fast" id="rewindIcon"></i>
				</button>
				<button id="backward" class="infoToggle" title="Sinal anterior">
					<i class="fa-solid fa-backward-step" id="backwardIcon"></i>
				</button>
				<button id="playPause" title="Reproduzir vídeo">
					<i class="fa-regular fa-circle-play" id="playPauseIcon"></i>
				</button>
				<button id="forward" class="infoToggle" title="Próximo sinal">
					<i class="fa-solid fa-forward-step" id="forwardIcon"></i>
				</button>
				<button id="autoRepeat" class="infoToggle" title="Repetir automaticamente">
					<i class="fa-solid fa-repeat" id="autoRepeatIcon"></i>
				</button>
			</section>
			<section id="playerInfoContainer">
				<div id="currentSign"></div>
				<div id="otherActionsContainer">
					<button id="addToCode" disabled title="Escrever palavra no código">
						<i class="fa-solid fa-file-pen" id="addToCodeIcon"></i>
					</button>
					<button id="info" title="O que é isto?">
						<i class="fa-regular fa-circle-question" id="infoIcon"></i>
					</button>
				</div>
			</section>
		</main>
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

const reservedWords = [
	'arguments',
	'async',
	'await',
	'break',
	'case',
	'catch',
	'class',
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
	'instanceof',
	'new',
	'null',
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
	'as',				// substring of other reserved word(s)
	'const',			// substring of other reserved word(s)
	'in',				// substring of other reserved word(s)
	'let',				// substring of other reserved word(s)
	'of',				// substring of other reserved word(s)
	'enum', 			// future reserved word
	'implements',			// future reserved word
	'package',			// future reserved word
	'private',			// future reserved word
	'protected',			// future reserved word
	'public',			// future reserved word
];

const categories = [
	{
		title: 'Variáveis e Constantes',
		id: 'Var',
		icon: 'tags',
		signs: ['var', 'let', 'const', 'typeof'],
	},
	{
		title: 'Valores',
		id: 'Value',
		icon: 'database',
		signs: ['true', 'false', 'null', 'undefined'],
	},
	{
		title: 'Estruturas de Condição',
		id: 'Condition',
		icon: 'flag',
		signs: ['if', 'else', 'switch', 'case', 'default'],
	},
	{
		title: 'Estruturas de Repetição',
		id: 'Repetition',
		icon: 'rotate-left',
		signs: ['while', 'do', 'break', 'continue', 'for', 'of', 'in'],
	},
	{
		title: 'Tratamento de Exceção',
		id: 'Exception',
		icon: 'circle-xmark',
		signs: ['try', 'catch', 'finally', 'throw'],
	},
	{
		title: 'Funções e Métodos',
		id: 'Function',
		icon: 'gears',
		signs: ['function', 'void', 'return', 'arguments', 'eval', 'yield'],
	},
	{
		title: 'Classes',
		id: 'Class',
		icon: 'sitemap',
		signs: ['class', 'constructor', 'get', 'set', 'extends', 'static'],
	},
	{
		title: 'Objetos',
		id: 'Object',
		icon: 'cube',
		signs: ['new', 'this', 'super', 'instanceof', 'delete'],
	},
	{
		title: 'Programação Assíncrona',
		id: 'Async',
		icon: 'diagram-project',
		signs: ['async', 'await'],
	},
	{
		title: 'Módulos',
		id: 'Module',
		icon: 'cubes',
		signs: ['import', 'export', 'from', 'as'],
	},
	{
		title: 'Depuração',
		id: 'Debug',
		icon: 'bug-slash',
		signs: ['debugger'],
	},
];
