import * as vscode from 'vscode';
import * as extension from '../extension';

export function getHtml(webview: vscode.Webview, uri: vscode.Uri, categories: extension.ICategory[]) : string
{
	const allCss = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','fontawesome.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','regular.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','fontawesome','css','solid.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','jquery-ui.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','jquery-ui-slider-pips.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','style.css')),
	];

	const allJs = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery.js')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery-ui.js')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery-ui-slider-pips.js')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','behavior.js')),
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