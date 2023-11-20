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

			const tooltips = [
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip1.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip2.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip3.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip4.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip5.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip6.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip7.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip8.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip9.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip10.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','tooltip11.mp4'))},
			];

			webview.postMessage({videos, tooltips, categories});

			webview.html = getWebviewContent(webview, uri);
		})
	);
}

function fetchSigns(editor: vscode.TextEditor) : string[]
{
	let signs = [];

	if (vscode.languages.getDiagnostics(editor.document.uri).length > 0) {
		signs.push('oi');
	}

	for (let selection of editor.selections)
	{
		const range = new vscode.Range(selection.start, selection.end);
		const text = editor.document.getText(range).trim().replace(/[\t\v\f ]+/g, ' ');
		const textLength = text.length;
		let i = 0, closure = '';

		// Comentário hashbang
		if (selection === editor.selections[0]
			&& selection.start.isEqual(new vscode.Position(0, 0))
			&& text[0] === '#' && text[1] === '!')
		{
			closure = '\n';
			signs.push('comment.hashbang');
			i = 2;
		}

		for (i; i < textLength; i++)
		{
			// Espaço em branco
			if (text[i] === ' ') { continue; }

			// Nova linha
			if (text[i].match(/[\r\n]/))
			{
				if (closure === '\n') { closure = ''; }
				continue;
			}

			// Não estando em um bloco especial
			if (closure === '')
			{
				// String
				if (text[i].match(/["'`]/))
				{
					closure = text[i];
					signs.push('string.start');
					continue;
				}

				if (text[i] === '/')
				{
					// Comentário em linha única
					if (text[i+1] === '/')
					{
						closure = '\n';
						signs.push('comment.single.start');
						i++;
						continue;
					}
					// Comentário em bloco
					if (text[i+1] === '*')
					{
						closure = '*/';
						signs.push('comment.start');
						i++;
						continue;
					}
					// Expressão Regular
					closure = '/';
					signs.push('regex.start');
					continue;
				}

				// Vetor
				if (text[i] === '[')
				{
					closure = ']';
					signs.push('array.start');
					continue;
				}

				// Incremento
				if (text[i] === '+' && text[i+1] === '+') {
					signs.push('increment');
					i++;
					continue;
				}

				// Decremento
				if (text[i] === '-' && text[i+1] === '-') {
					signs.push('decrement');
					i++;
					continue;
				}

				if (text[i] === '?') {
					if (text[i+1] === '?') {
						// Atribuição em coalescência nula
						if (text[i+2] === '=') {
							signs.push('assign.nullcoalesc');
							i += 2;
							continue;
						}
						// Coalescência nula
						signs.push('nullcoalesc');
						i++;
						continue;
					}
					// Cadeia opcional
					if (text[i+1] === '.') {
						signs.push('chain.optional');
						i++;
						continue;
					}
					// If ternário
					signs.push('ternary.if');
					continue;
				}

				// Else ternário
				if (text[i] === ':') {
					signs.push('ternary.else');
					continue;
				}

				// Cadeia
				if (text[i] === '.') {
					signs.push('chain');
					continue;
				}

				if (text[i] === '!') {
					if (text[i+1] === '=') {
						// Estritamente diferente
						if (text[i+2] === '=') {
							signs.push('different.strict');
							i += 2;
							continue;
						}
						// Diferente
						signs.push('different');
						i++;
						continue;
					}
					// Operador lógico NOT
					signs.push('logical.not');
					continue;
				}

				if (text[i] === '&') {
					// Operador lógico AND
					if (text[i+1] === '&') {
						signs.push('logical.and');
						i++;
						continue;
					}
					// Bitwise AND
					signs.push('bitwise.and');
					continue;
				}

				if (text[i] === '|') {
					// Operador lógico OR
					if (text[i+1] === '|') {
						signs.push('logical.or');
						i++;
						continue;
					}
					// Bitwise OR
					signs.push('bitwise.or');
					continue;
				}

				// Bitwise XOR
				if (text[i] === '^') {
					signs.push('bitwise.xor');
					continue;
				}

				if (text[i] === '*') {
					// Potência
					if (text[i+1] === '*') {
						signs.push('math.power');
						i++;
						continue;
					}
					// Multiplicação
					signs.push('math.times');
					continue;
				}

				if (text[i] === '=') {
					if (text[i+1] === '=') {
						if (text[i+2] === '=') {
							// Estritamente igual
							signs.push('equals.strict');
							i += 2;
							continue;
						}
						// Igual
						signs.push('equals');
						i++;
						continue;
					}
					if (text[i+1] === '>') {
						// Função Seta
						signs.push('function.arrow');
						i++;
						continue;
					}
					// Atribuição
					signs.push('assignment');
					continue;
				}

				if (text[i] === '>') {
					// Maior ou igual
					if (text[i+1] === '=') {
						signs.push('greater.equal');
						i++;
						continue;
					}
					if (text[i+1] === '>') {
						// Troca bitwise à direita sem sinal
						if (text[i+1] === '>') {
							signs.push('bitwise.shift.unsigned');
							i += 2;
							continue;
						}
						// Troca bitwise à direita
						signs.push('bitwise.shift.right');
						i++;
						continue;
					}
					// Maior
					signs.push('greater');
					continue;
				}

				if (text[i] === '<') {
					// Menor ou igual
					if (text[i+1] === '=') {
						signs.push('lesser.equal');
						i++;
						continue;
					}
					// Troca bitwise à esquerda
					if (text[i+1] === '<') {
						signs.push('bitwise.shift.left');
						i++;
						continue;
					}
					// Menor
					signs.push('lesser');
					continue;
				}

				// Palavras reservadas
				if (text[i].match(/[a-gilopnr-wy]/) && (i === 0 || !text[i-1].match(/[\w$]/)))
				{
					const firstWord = text.substring(i).match(/\w+\b/);
	
					if (firstWord && firstWord.length > 0 && !firstWord[0].match(/[\d_$]+/)
						&& firstWord[0] === firstWord[0].toLowerCase())
					{
						const found = reservedWords.find(word => word === firstWord[0]);
						if (found) {
							if (found !== 'function' && found !== 'yield') {
								signs.push(found);
								i += found.length-1;
								continue;
							}
							// Gerador function ou yield
							if (text[i+1] === '*') {
								signs.push(found + '.generator');
								i += found.length;
								continue;
							}
							// Gerador function ou yield
							if (text[i+1] === ' ' && text[i+2] === '*') {
								signs.push(found + '.generator');
								i += found.length+1;
								continue;
							}
							// Function ou yield
							signs.push(found);
							i += found.length-1;
							continue;
						}
					}
				}
			}
			else
			{
				// String (fechamento)
				if (closure === text[i] && text[i].match(/["'`]/)
					&& text[i-1] !== '\\')
				{
					closure = '';
					signs.push('string.end');
					continue;
				}

				// Expressão Regular (fechamento)
				if (closure === '/' && text[i] === '/')
				{
					closure = '';
					signs.push('regex.end');
					continue;
				}

				// Comentário em linha única (fechamento)
				if (closure === '\n' && text[i] === '\n')
				{
					closure = '';
					signs.push('comment.single.end');
					continue;
				}

				// Comentário em bloco (fechamento)
				if (closure === '*/' && text[i] === '*' && text[i+1] === '/')
				{
					closure = '';
					signs.push('comment.end');
					i++;
					continue;
				}

				// Vetor (fechamento)
				if (closure === ']' && text[i] === ']') {
					closure = '';
					signs.push('array.end');
					continue;
				}
			}

			// Sendo caractere alfanumérico
			if (text[i].match(/[a-zA-Z0-9]/)) { signs.push(text[i]); }
		}
	}

	if (!signs.length) { signs.push('oi'); }

	return signs;
}

function getWebviewContent(webview: vscode.Webview, uri: vscode.Uri) : string
{
	const allCss = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','fontawesome.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','regular.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','solid.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','jquery-ui.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','jquery-ui-slider-pips.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','webview.css')),
	];

	const allJs = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery.js')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery-ui.js')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery-ui-slider-pips.js')),
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
					<button id="category${category.id}" class="infoToggle categories" title="${category.title}">
						<i class="fa-solid fa-${category.icon}" id="category${category.id}Icon"></i>
					</button>`;
				}

			html += `
			</section>
			<div id="videoContainer"></div>
			<div id="sliderContainer"></div>
			<section id="playerMainContainer">
				<button id="rewind" class="infoToggle codeToSignToggle" title="Retornar ao início">
					<i class="fa-solid fa-backward-fast" id="rewindIcon"></i>
				</button>
				<button id="backward" class="infoToggle codeToSignToggle" title="Sinal anterior">
					<i class="fa-solid fa-backward-step" id="backwardIcon"></i>
				</button>
				<button id="previousInCategory" class="infoToggle signToCodeToggle" title="Sinal anterior da categoria">
					<i class="fa-solid fa-angle-left" id="previousInCategoryIcon"></i>
				</button>
				<button id="playPause" title="Reproduzir vídeo">
					<i class="fa-solid fa-circle-play" id="playPauseIcon"></i>
				</button>
				<button id="nextInCategory" class="infoToggle signToCodeToggle" title="Próximo sinal da categoria">
					<i class="fa-solid fa-angle-right" id="nextInCategoryIcon"></i>
				</button>
				<button id="forward" class="infoToggle codeToSignToggle" title="Próximo sinal">
					<i class="fa-solid fa-forward-step" id="forwardIcon"></i>
				</button>
				<button id="autoRepeat" class="infoToggle codeToSignToggle" title="Repetir automaticamente">
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
						<i class="fa-solid fa-question" id="infoIcon"></i>
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
	'as',			// substring of other reserved word(s)
	'const',		// substring of other reserved word(s)
	'in',			// substring of other reserved word(s)
	'let',			// substring of other reserved word(s)
	'of',			// substring of other reserved word(s)
	'enum',			// future reserved word
	'implements',		// future reserved word
	'package',		// future reserved word
	'private',		// future reserved word
	'protected',		// future reserved word
	'public',		// future reserved word
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
		icon: 'flag',
		signs: ['true', 'false', 'null', 'undefined'],
	},
	{
		title: 'Estruturas de Condição',
		id: 'Condition',
		icon: 'arrows-split-up-and-left',
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
		icon: 'triangle-exclamation',
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
		icon: 'icons',
		signs: ['new', 'this', 'super', 'instanceof', 'delete'],
	},
	{
		title: 'Programação Assíncrona',
		id: 'Async',
		icon: 'arrows-turn-right',
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
