import * as vscode from 'vscode';
import * as content from './webview/html/content';
import * as translator from './languages/translator';
import { ISignVideos, ICategoryVideos } from './utils/interfaces';
import { errors, supportedLanguages, tooltipsIds } from './utils/constants';

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

			const signLanguage: string = 'libras';
			const webview: vscode.Webview = panel.webview;
			const uri: vscode.Uri = context.extensionUri;

			const welcome: vscode.Uri = webview.asWebviewUri(
				vscode.Uri.joinPath(uri,'videos',signLanguage,'welcome.mp4')
			);

			const tooltips: (vscode.Uri)[] = [];
			for (let tooltip of tooltipsIds) {
				tooltips.push(webview.asWebviewUri(
					vscode.Uri.joinPath(uri,'videos',signLanguage,'tooltip',tooltip+'.mp4')
				));
			}
			
			let messageType: string = 'init';
			webview.postMessage({messageType, welcome, tooltips, tooltipsIds});

			webview.html = content.getHtml(webview, uri);

			webview.onDidReceiveMessage(
				(message: any) =>
				{
					try {
						const editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
						if (!editor)
						{
							throw new Error(errors.documentNotOpened);
						}
						else if (supportedLanguages.includes(editor.document.languageId))
						{
							throw new Error(errors.languageNotSupported);
						}
						else if (message.type)
						{
							if (message.type === 'readCode')
							{
								if (vscode.languages.getDiagnostics(editor.document.uri).length > 0)
								{
									throw new Error(errors.documentHasErrors);
								}
								else
								{
									const videos: ISignVideos[] = translator.readCode(
										signLanguage, editor, webview, uri);
									if (videos)
									{
										messageType = 'videos';
										webview.postMessage({messageType, videos});
									}
									else
									{
										throw new Error(errors.documentIsEmpty);
									}
								}
							}
							else if (message.type === 'writeCode' && message.text)
							{
								translator.writeCode(editor, message.text);
							}
							else if (message.type === 'getCategories')
							{
								const categories: ICategoryVideos[] = translator.getCategories(
									signLanguage, editor.document.languageId, webview, uri);
								messageType = 'categories';
								webview.postMessage({messageType, categories});
							}
						}
					} catch (err) {
						if (err instanceof Error)
						{
							if (errors.hasOwnProperty(err.message)) {
								const error: vscode.Uri = webview.asWebviewUri(
									vscode.Uri.joinPath(uri,'videos',signLanguage,'error',err.message+'.mp4')
								);
								messageType = 'error';
								webview.postMessage({messageType, error});
							}
							else
							{
								vscode.window.showErrorMessage(err.message);
							}
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
