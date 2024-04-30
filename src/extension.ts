import * as vscode from 'vscode';
import * as content from './webview/content';
import { Translator } from './languages/translator';
import { ITooltips, ICategoryVideos } from './utils/interfaces';
import { errors, supportedLanguages } from './utils/constants';

export function activate(context: vscode.ExtensionContext)
{
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

			const translator = new Translator(signLanguage, webview, uri);

			let messageType: string = 'tooltips';
			const tooltips: ITooltips[] = translator.getTooltips();

			webview.postMessage({ messageType, tooltips });

			webview.html = content.getHtml(webview, uri);

			webview.onDidReceiveMessage(
				(message: any) =>
				{
					try {
						let editor: vscode.TextEditor | undefined = undefined;

						if (vscode.window.visibleTextEditors.length === 0)
						{
							throw new Error(errors.documentNotOpened);
						}

						for (let oneTextEditor of vscode.window.visibleTextEditors)
						{
							if (supportedLanguages.includes(oneTextEditor.document.languageId)) {
								editor = oneTextEditor;
								break;
							}
						}
						if (!editor)
						{
							throw new Error(errors.languageNotSupported);
						}

						if (message.type)
						{
							messageType = message.type;

							if (messageType === 'codeToSign')
							{
								if (vscode.languages.getDiagnostics(editor.document.uri).length > 0)
								{
									throw new Error(errors.documentHasErrors);
								}
								else
								{
									const videos = translator.readCode(editor);
									if (videos && videos.length)
									{
										webview.postMessage({ messageType, videos });
									}
									else
									{
										throw new Error(errors.documentIsEmpty);
									}
								}
							}
							else if (messageType === 'signToCode' && message.text)
							{
								translator.writeCode(editor, message.text);
							}
							else if (messageType === 'categories')
							{
								const categories: ICategoryVideos[] = translator.getCategories(
									editor.document.languageId
								);
								webview.postMessage({messageType, categories});
							}
							else if (messageType === 'settings')
							{
								vscode.commands.executeCommand('workbench.action.openSettings');
							}
						}
					}
					catch (err)
					{
						if (err instanceof Error)
						{
							if (errors.hasOwnProperty(err.message))
							{
								messageType = 'error';
								const error = translator.getError(err.message);
								webview.postMessage({ messageType, error });
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