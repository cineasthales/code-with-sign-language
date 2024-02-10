import { Webview, Uri } from 'vscode';

export function getHtml(webview: Webview, uri: Uri): string
{
	const allCss: Uri[] = [
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','icons','fontawesome','css','fontawesome.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','icons','fontawesome','css','regular.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','icons','fontawesome','css','solid.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','css','libs','jquery-ui.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','css','libs','jquery-ui-slider-pips.css')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','css','style.css')),
	];

	const allJs: Uri[] = [
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','js','libs','jquery.js')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','js','libs','jquery-ui.js')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','js','libs','jquery-ui-slider-pips.js')),
		webview.asWebviewUri(Uri.joinPath(uri,'src','webview','js','behavior.js')),
	];

	const welcome = webview.asWebviewUri(Uri.joinPath(uri,'videos','libras','welcome.mp4'));

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
	<main>

		<div id="initialTab">
			<nav id="initialMenu">
				<button id="goToCodeToSign" class="button" title="Código → Libras">
					<i class="fa-regular fa-file-code"></i>
					<i class="fa-solid fa-arrow-right" id="goToCodeToSignArrow"></i>
					<i class="fa-solid fa-hands"></i>
				</button>
				<button id="goToSignToCode" class="button" title="Libras → Código">
					<i class="fa-solid fa-hands"></i>
					<i class="fa-solid fa-arrow-right" id="goToSignToCodeArrow"></i>
					<i class="fa-regular fa-file-code"></i>
				</button>
			</nav>
			<section id="initialVideo">
				<video type="video/mp4" muted autoplay
					src="${welcome.scheme}://${welcome.authority}${welcome.path}">
				</video>
			</section>
		</div>

		<div id="loadingTab">
			<i class="fa-solid fa-spinner"></i>
		</div>

		<div id="codeToSignTab">
			<section id="codeToSignTime">
				<span id="currentTime" class="infoTimeToggle"></span>
				<span id="speedContainer">
					<button id="slower" class="button infoToggle" title="Diminuir velocidade">
						<i class="fa-solid fa-backward"></i>
					</button>
					<span id="currentSpeed" class="infoTimeToggle">1x</span>
					<button id="faster" class="button infoToggle" title="Aumentar velocidade">
						<i class="fa-solid fa-forward"></i>
					</button>
				</span>
				<span id="totalDuration" class="infoTimeToggle"></span>
			</section>
			<section id="codeToSignVideos"></section>
			<section id="codeToSignSlider"></section>
			<section id="codeToSignPlayer">
				<button id="rewind" class="button infoToggle" title="Retornar ao início">
					<i class="fa-solid fa-backward-fast"></i>
				</button>
				<button id="backward" class="button infoToggle" title="Sinal anterior">
					<i class="fa-solid fa-backward-step"></i>
				</button>
				<button id="playPause" class="button" title="Reproduzir ou pausar vídeo">
					<i class="fa-solid fa-circle-play" id="playPauseIcon"></i>
				</button>
				<button id="forward" class="button infoToggle" title="Próximo sinal">
					<i class="fa-solid fa-forward-step"></i>
				</button>
				<button id="autoRepeatToggle" class="button infoToggle" title="Repetir automaticamente">
					<i class="fa-solid fa-repeat"></i>
				</button>
			</section>
			<section id="codeToSignActions">
				<button id="codeToSignTooltipToggle" class="button infoToggle" title="Tooltips">
					<i class="fa-solid fa-comment"></i>
				</button>
				<span id="infoContainer">
					<span id="codeToSignCurrentToken"></span>
					<button id="info" class="button" title="O que isto significa?">
						<i class="fa-solid fa-question" id="infoIcon"></i>
					</button>
				</span>
				<button id="codeToSignAgain" class="button infoToggle" title="Código → Libras (novamente)">
					<i class="fa-solid fa-file-circle-check"></i>
				</button>
			</section>
		</div>

		<div id="signToCodeTab">
			<section id="signToCodeCategories"></section>
			<section id="signToCodeVideos"></section>
			<section id="signToCodeSlider"></section>
			<section id="signToCodePlayer">
				<button id="previousInCategory" class="button infoToggle" title="Sinal anterior da categoria">
					<i class="fa-solid fa-angle-left"></i>
				</button>
				<button id="nextInCategory" class="button infoToggle" title="Próximo sinal da categoria">
					<i class="fa-solid fa-angle-right"></i>
				</button>
			</section>
			<section id="signToCodeActions">
				<button id="signToCodeTooltipToggle" class="button infoToggle" title="Tooltips">
					<i class="fa-solid fa-comment"></i>
				</button>
				<span id="signToCodeCurrentToken"></span>
				<button id="writeExampleToCode" class="button" title="Escrever exemplo no código">
					<i class="fa-solid fa-file-pen"></i>
				</button>
			</section>
			<section id="signToCodeExample">
				<code id="exampleContainer"></code>
			</section>
		</div>

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
