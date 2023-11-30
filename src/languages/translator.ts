import * as vscode from 'vscode';
import * as javascriptCodeChecker from './javascript/codeChecker';
import { ISign, ISignVideos } from '../utils/interfaces';

export function readCode(editor: vscode.TextEditor, webview: vscode.Webview, uri: vscode.Uri): ISignVideos[]
{
	const signLanguage: string = 'libras';
	const language: string = editor.document.languageId;
	const results: ISign[] = [];
	const videos: ISignVideos[] = [];
	let text: string = '';

	if (editor.selections.length > 0)
	{
		for (let selection of editor.selections)
		{
			if (text.length > 0) { text += ' '; }
			const range: vscode.Range = new vscode.Range(selection.start, selection.end);
			text += editor.document.getText(range);
		}
	}
	else { text = editor.document.getText(); }

	text = text.trim().replace(/[\t\v\f ]+/g, ' ');
	
	switch (language)
	{
		case 'javascript':
			results.push(...javascriptCodeChecker.getResults(text));
			break;
		default:
			return videos;
	}

	if (results)
	{
		for (let result of results)
		{
			if (result.directory !== 'misc')
			{
				videos.push({
					token: result.token,
					file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',signLanguage,language,result.directory,result.file+'.mp4')),
					info: result.info ?  webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',signLanguage,language,'info',result.info+'.mp4')) : undefined,
					examples: undefined,
				});
			}
			else
			{
				videos.push({
					token: result.token,
					file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',signLanguage,'misc',result.file+'.mp4')),
					info: undefined,
					examples: undefined,
				});
			}
		}
	}

	return videos;
}

export function writeCode(editor: vscode.TextEditor, text: string)
{
	const position: vscode.Position = editor.selection.active;
	editor.edit((builder: vscode.TextEditorEdit) => {
		builder.insert(position, text);
	});
}
