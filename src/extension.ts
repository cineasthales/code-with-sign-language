import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext)
{
	context.subscriptions.push(
		vscode.commands.registerCommand('code-with-sign-language.start', () =>
		{
			const panel = vscode.window.createWebviewPanel(
				'sign-videos',
				'Code with Sign Language',
				vscode.ViewColumn.Two,
				{
					enableScripts: true,
					// TODO: include videos path access
				}
			);
			
			panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
		})
	);
}

function getWebviewContent(webview: vscode.Webview, uri: vscode.Uri): string
{
	const css = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','css','fontawesome.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','css','regular.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','icons','css','solid.css')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','css','webview.css')),
	];

	const js = [
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','jquery.js')),
		webview.asWebviewUri(vscode.Uri.joinPath(uri,'src','js','webview.js')),
	];

	return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="${css[0]}">
		<link rel="stylesheet" href="${css[1]}">
		<link rel="stylesheet" href="${css[2]}">
		<link rel="stylesheet" href="${css[3]}">
	</head>
	<body>
		<main>
			<div id="videoContainer"></div>
			<div id="infoContainer">
				<div id="currentTime"></div>
				<div id="currentSign"></div>
				<div id="totalDuration"></div>
			</div>
			<div id="playerContainer">
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
		</main>
		<script src="${js[0]}"></script>
		<script src="${js[1]}"></script>
	</body>
	</html>
	`;
}

export function deactivate() {}