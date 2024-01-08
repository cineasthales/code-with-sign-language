import * as vscode from 'vscode';
import * as content from './webview/html/content';
import Translator from './languages/translator';
import { ITooltips, ISignVideos, ICategoryVideos } from './utils/interfaces';
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

			let messageType: string = 'init';
			let videos: ISignVideos[] = translator.getWelcome();
			const tooltips: ITooltips[] = translator.getTooltips();
			
			webview.postMessage({messageType, videos, tooltips});

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
							if (message.type === 'readCode')
							{
								if (vscode.languages.getDiagnostics(editor.document.uri).length > 0)
								{
									throw new Error(errors.documentHasErrors);
								}
								else
								{
									videos = translator.readCode(editor);
									if (videos)
									{
										messageType = 'main';
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
								messageType = 'categories';
								const categories: ICategoryVideos[] = translator.getCategories(
									message.currentLanguage, editor.document.languageId
								);
								const newLanguage = editor.document.languageId;
								webview.postMessage({messageType, categories, newLanguage});
							}
						}
					}
					catch (err)
					{
						if (err instanceof Error)
						{
							if (errors.hasOwnProperty(err.message))
							{
								messageType = 'main';
								videos = translator.getError(err.message);
								webview.postMessage({messageType, videos});
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
