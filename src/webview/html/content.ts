import { Webview, Uri } from 'vscode';

export function getHtml(webview: Webview, uri: Uri): string
{
	const allCss: Uri[] = [
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','icons','fontawesome','css','fontawesome.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','icons','fontawesome','css','regular.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','icons','fontawesome','css','solid.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','css','jquery-ui.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','css','jquery-ui-slider-pips.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','css','style.css')),
	];

	const allJs: Uri[] = [
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','js','libs','jquery.js')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','js','libs','jquery-ui.js')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','js','libs','jquery-ui-slider-pips.js')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','js','behavior.js')),
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
			<button id="tabCodeToSign" class="button infoToggle" title="Tradutor de código para Libras">
				<i class="fa-regular fa-file-code" id="codeToSignFirstIcon"></i>
				<i class="fa-solid fa-arrow-right" id="codeToSignArrow"></i>
				<i class="fa-solid fa-hands" id="codeToSignLastIcon"></i>
			</button>
			<button id="tabSignToCode" class="button infoToggle" title="Tradutor de Libras para código">
				<i class="fa-solid fa-hands" id="signToCodeFirstIcon"></i>
				<i class="fa-solid fa-arrow-right" id="signToCodeArrow"></i>
				<i class="fa-regular fa-file-code" id="signToCodeLastIcon"></i>
			</button>
		</nav>
		<main>
			<section id="timeContainer" class="codeToSignToggle">
				<span id="currentTime" class="infoTimeToggle"></span>
				<div id="speedContainer">
					<button id="slower" class="button infoToggle" title="Diminuir velocidade">
						<i class="fa-solid fa-backward" id="slowerIcon"></i>
					</button>
					<span id="currentSpeed" class="infoTimeToggle">1x</span>
					<button id="faster" class="button infoToggle" title="Aumentar velocidade">
						<i class="fa-solid fa-forward" id="fasterIcon"></i>
					</button>
				</div>
				<span id="totalDuration" class="infoTimeToggle"></span>
			</section>
			<section id="categoriesContainer" class="signToCodeToggle"></section>
			<section id="mainVideosContainer" class="codeToSignToggle"></section>
			<section id="categoriesVideosContainer" class="signToCodeToggle"></section>
			<section id="sliderContainer" class="codeToSignToggle"></section>
			<section id="playerContainer">
				<button id="rewind" class="button infoToggle codeToSignToggle" title="Retornar ao início">
					<i class="fa-solid fa-backward-fast" id="rewindIcon"></i>
				</button>
				<button id="backward" class="button infoToggle codeToSignToggle" title="Sinal anterior">
					<i class="fa-solid fa-backward-step" id="backwardIcon"></i>
				</button>
				<button id="previousInCategory" class="button infoToggle signToCodeToggle" title="Sinal anterior da categoria">
					<i class="fa-solid fa-angle-left" id="previousInCategoryIcon"></i>
				</button>
				<button id="playPause" class="button" title="Reproduzir ou pausar vídeo">
					<i class="fa-solid fa-circle-play" id="playPauseIcon"></i>
				</button>
				<button id="nextInCategory" class="button infoToggle signToCodeToggle" title="Próximo sinal da categoria">
					<i class="fa-solid fa-angle-right" id="nextInCategoryIcon"></i>
				</button>
				<button id="forward" class="button infoToggle codeToSignToggle" title="Próximo sinal">
					<i class="fa-solid fa-forward-step" id="forwardIcon"></i>
				</button>
				<button id="autoRepeatToggle" class="button infoToggle codeToSignToggle" title="Repetir automaticamente">
					<i class="fa-solid fa-repeat" id="autoRepeatToggleIcon"></i>
				</button>
			</section>
			<section id="actionsContainer">
				<div id="infoContainer">
					<span id="currentSign"></span>
					<button id="info" class="button" title="O que isto significa?">
						<i class="fa-solid fa-question" id="infoIcon"></i>
					</button>
				</div>
				<div id="mainActionsContainer">
					<button id="tooltipToggle" class="button infoToggle" title="Tooltips">
						<i class="fa-solid fa-comment" id="tooltipToggleIcon"></i>
					</button>
					<button id="readCode" class="button infoToggle codeToSignToggle" title="Ler código selecionado">
						<i class="fa-solid fa-glasses" id="readCodeIcon"></i>
					</button>
				</div>
			</section>
			<section id="examplesContainer" class="signToCodeToggle">
				<button id="previousExample" class="button" title="Exemplo anterior">
					<i class="fa-solid fa-caret-left" id="previousExampleIcon"></i>
				</button>
				<code id="exampleBlock"></code>
				<button id="writeCode" class="button" title="Escrever exemplo no código">
					<i class="fa-solid fa-pen" id="writeCodeIcon"></i>
				</button>
				<button id="nextExample" class="button" title="Próximo exemplo">
					<i class="fa-solid fa-caret-right" id="nextExampleIcon"></i>
				</button>
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
