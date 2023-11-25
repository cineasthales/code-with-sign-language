import * as vscode from 'vscode';
import * as content from './html/content';
import * as analyser from './languages/javascript/analyser';
import { categories } from './languages/javascript/categories';
export interface ICategory {
    title: string;
    id: string;
    icon: string;
    signs: string[];
}

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
				signs = analyser.getSigns(editor);
				
				for (let sign of signs)
				{
					videos.push({
						sign: sign,
						file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras',sign+'.mp4')),
					});
				}
			}

			const tooltips = [
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
				{sign: '', file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip.mp4'))},
			];

			webview.postMessage({videos, tooltips, categories});

			webview.html = content.getHtml(webview, uri, categories);
		})
	);
}

export function deactivate() {
	// TODO: clean up media from client extension path
}