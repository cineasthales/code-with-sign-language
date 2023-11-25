import * as vscode from 'vscode';
import * as content from './html/content';
import * as translator from './languages/translator';
import { categories } from './languages/javascript/categories';

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
				'Programar com Libras',
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

			const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
			const webview: vscode.Webview = panel.webview;
			const uri: vscode.Uri = context.extensionUri;

			webview.onDidReceiveMessage(
				(message: any) => {
					if (editor) {
						if (message.type === 'read' && editor.selections) {
							translator.readCode(editor, webview, uri);
						} else if (message.type === 'write' && message.text) {
							translator.writeCode(editor, message.text);
						}
					}
				},
				undefined,
				context.subscriptions
			);

			const messages = [
				webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','messages','welcome.mp4')),
			];

			const tooltips: (vscode.Uri)[] = [];
			const buttons: string[] = [
				'tabCodeToSign', 'tabSignToCode', 'slower', 'faster', 'rewind', 'backward', 'previousInCategory',
				'playPause', 'nextInCategory', 'forward', 'autoRepeat', 'info', 'readCode', 'writeCode',
			];
			for (let button of buttons) {
				tooltips.push(webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltips',button+'.mp4')));
			}

			webview.postMessage({messages, tooltips});

			webview.html = content.getHtml(webview, uri, categories);
		})
	);
}

export function deactivate() 
{
	// TODO: clean up media from client extension path
}