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
				<button id="goToCodeToSign" title="Código → Libras">
					<i class="fa-regular fa-file-code"></i>
					<i class="fa-solid fa-arrow-right" id="goToCodeToSignArrow"></i>
					<i class="fa-solid fa-hands"></i>
				</button>
				<button id="goToSignToCode" title="Libras → Código">
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
				<button id="tooltipToggle" class="button infoToggle" title="Tooltips">
					<i class="fa-solid fa-comment"></i>
				</button>
				<span id="infoContainer">
					<span id="currentToken"></span>
					<button id="info" class="button" title="O que isto significa?">
						<i class="fa-solid fa-question" id="infoIcon"></i>
					</button>
				</span>
				<button id="updateCodeToSign" class="button infoToggle" title="Código → Libras (novamente)">
					<i class="fa-solid fa-file-circle-check"></i>
				</button>
			</section>
		</div>

		<div id="debug"></div>

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
