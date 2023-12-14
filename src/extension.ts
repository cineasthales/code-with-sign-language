import * as vscode from 'vscode';
import * as content from './webview/html/content';
import * as translator from './languages/translator';
import { FileDownloader, getApi } from "@microsoft/vscode-file-downloader-api";
import { ITooltips, ISignVideos, ICategoryVideos } from './utils/interfaces';
import { errors, supportedLanguages } from './utils/constants';

export function activate(context: vscode.ExtensionContext)
{	/*
 	try
  	{
		const fileDownloader: FileDownloader = await getApi();
		const downloadedFiles: Uri[] = await fileDownloader.listDownloadedItems(context);

	 	if (!downloadedFiles)
   		{
			const url = 'https://drive.google.com/';
   			const filename = 'videos.zip';
   			const cancellationToken = new CancellationTokenSource().token;

			const progressCallback = (downloadedBytes: number, totalBytes: number | undefined) => {
   				const downloadedPercentage = Math.floor((downloadedBytes * 100) / totalBytes);
				vscode.window.showInformationMessage(`Baixando vídeos: ${downloadedPercentage}% completo.`);
			};

			const directory: Uri = await fileDownloader.downloadFile(
				Uri.parse(url),
				filename,
				context,
				cancellationToken,
				progressCallback,
    				{ shouldUnzip: true },
			);
	  	}
	}
 	catch (err)
  	{
		if (err instanceof Error)
		{
  			vscode.window.showErrorMessage(err.message);
     		}
       	}*/
	
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

			let messageType: string = 'init';
			let videos: ISignVideos[] = translator.getWelcome(signLanguage, webview, uri);
			const tooltips: ITooltips[] = translator.getTooltips(signLanguage, webview, uri);
			
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
									videos = translator.readCode(
										signLanguage, editor, webview, uri
									);
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
									signLanguage, message.currentLanguage, editor.document.languageId, webview, uri
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
								videos = translator.getError(err.message, signLanguage, webview, uri);
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

export function deactivate() 
{
	//await fileDownloader.deleteAllItems(context);
}
