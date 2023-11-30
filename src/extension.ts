import * as vscode from 'vscode';
import * as content from './html/content';
import * as translator from './languages/translator';
import { IVideo } from './utils/interfaces';
import { messagesIds , tooltipsIds } from './utils/constants';
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

			
			const webview: vscode.Webview = panel.webview;
			const uri: vscode.Uri = context.extensionUri;

			const messages: (vscode.Uri)[] = [];
			const tooltips: (vscode.Uri)[] = [];
			for (let message of messagesIds) {
				messages.push(webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','message',message+'.mp4')));
			}
			for (let tooltip of tooltipsIds) {
				tooltips.push(webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','tooltip',tooltip+'.mp4')));
			}
			webview.postMessage({messages, tooltips});

			webview.html = content.getHtml(webview, uri, categories);

			webview.onDidReceiveMessage(
				(message: any) => {
					const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;

					if (!editor)
					{
						/* webview.postMessage({documentNotOpened}); */
					}

					if (editor.document.languageId !== 'javascript')
					{
						/* webview.postMessage({language}); */
					}
					
					if (message.type)
					{
						if (message.type === 'read')
						{
							if (!vscode.languages.getDiagnostics(editor.document.uri).length > 0) {
								//webview.postMessage({errors});
							}
							
							const videos: IVideo[] = translator.readCode(editor, webview, uri);
							if (videos) {
								webview.postMessage({videos});
							}
						}
						else if (message.type === 'write' && message.text)
						{
							translator.writeCode(editor, message.text);
						}
					}
				},
				undefined,
				context.subscriptions
			);
		})
	);
}

export function deactivate() 
{
	// TODO: clean up media from client extension path
}
