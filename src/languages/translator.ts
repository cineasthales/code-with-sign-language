import * as vscode from 'vscode';
import * as javascriptCodeChecker from './javascript/codeChecker';
import { ISign, ISignVideos } from '../utils/interfaces';

export function readCode(editor: vscode.TextEditor, webview: vscode.Webview, uri: vscode.Uri) : ISignVideos[]
{
	const signLanguage: string = 'libras';
	const language: string = editor.document.languageId;
	const results: ISign[] = [];
	const videos: ISignVideos[] = [];
	
	switch (language) {
		case 'javascript':
			results.push(...javascriptCodeChecker.getResults(editor));
			break;
		default:
			return videos;
	}

	if (results) {
		for (let result of results) {
			videos.push({
				token: result.token,
				file: webview.asWebviewUri(vscode.Uri.joinPath(uri, 'videos', signLanguage, language, result.directory, result.sign + '.mp4')),
				info: result.info ?  webview.asWebviewUri(vscode.Uri.joinPath(uri, 'videos', signLanguage, language, 'info', result.info + '.mp4')) : undefined,
				exemples: undefined
			});
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
