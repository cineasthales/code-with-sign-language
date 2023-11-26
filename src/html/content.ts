import { Webview, Uri } from 'vscode';
import { ICategory } from '../utils/interfaces';

export function getHtml(webview: Webview, extensionUri: Uri, categories: ICategory[]): string
{
	const allCss: Uri[] = [
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','icons','fontawesome','css','fontawesome.css')),
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','icons','fontawesome','css','regular.css')),
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','icons','fontawesome','css','solid.css')),
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','css','jquery-ui.css')),
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','css','jquery-ui-slider-pips.css')),
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','css','style.css')),
	];

	const allJs: Uri[] = [
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','js','jquery.js')),
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','js','jquery-ui.js')),
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','js','jquery-ui-slider-pips.js')),
		webview.asWebviewUri(Uri.joinPath(extensionUri,'src','js','behavior.js')),
	];

	let html: string = `
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
				<i class="fa-regular fa-file-code" id="codeToSignFirstIcon"></i>
				<i class="fa-solid fa-arrow-right" id="codeToSignArrow"></i>
				<i class="fa-solid fa-hands" id="codeToSignLastIcon"></i>
			</button>
			<button id="tabSignToCode" class="infoToggle" title="Tradutor de Libras para código">
				<i class="fa-solid fa-hands" id="signToCodeFirstIcon"></i>
				<i class="fa-solid fa-arrow-right" id="signToCodeArrow"></i>
				<i class="fa-regular fa-file-code" id="signToCodeLastIcon"></i>
			</button>
		</nav>
		<main>
			<section id="timeContainer" class="codeToSignToggle">
				<span id="currentTime" class="infoTimeToggle"></span>
				<div id="speedContainer">
					<button id="slower" class="infoToggle" title="Diminuir velocidade">
						<i class="fa-solid fa-backward" id="slowerIcon"></i>
					</button>
					<span id="currentSpeed" class="infoTimeToggle">1x</span>
					<button id="faster" class="infoToggle" title="Aumentar velocidade">
						<i class="fa-solid fa-forward" id="fasterIcon"></i>
					</button>
				</div>
				<span id="totalDuration" class="infoTimeToggle"></span>
			</section>
			<section id="categoriesContainer" class="signToCodeToggle">`;

				for (let category of categories) {
					html += `
					<button id="category${category.id}" class="infoToggle categories" title="${category.title}">
						<i class="fa-solid fa-${category.icon}" id="category${category.id}Icon"></i>
					</button>`;
				}

			html += `
			</section>
			<div id="videoContainer"></div>
			<div id="sliderContainer" class="codeToSignToggle"></div>
			<section id="playerContainer">
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
			<section id="actionsContainer">
				<div id="infoContainer">
					<span id="currentSign"></span>
					<button id="info" title="O que é esta palavra?">
						<i class="fa-solid fa-question" id="infoIcon"></i>
					</button>
				</div>
				<div id="mainActionsContainer">
					<button id="readCode" class="infoToggle codeToSignToggle" title="Ler código selecionado">
						<i class="fa-solid fa-glasses" id="readCodeIcon"></i>
					</button>
					<button id="writeCode" class="infoToggle signToCodeToggle" title="Escrever palavra no código">
						<i class="fa-solid fa-pen" id="writeCodeIcon"></i>
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