import * as vscode from 'vscode';
import * as javascriptCodeChecker from './javascript/codeChecker';
import { IResult, IVideo } from '../utils/interfaces';

export function readCode(editor: vscode.TextEditor, webview: vscode.Webview, uri: vscode.Uri) : IVideo[]
{
	let results: IResult[] = [];
	const videos: IVideo[] = [];

	if (vscode.languages.getDiagnostics(editor.document.uri).length > 0) {
		return videos;
	}

	switch (editor.document.languageId) {
		case 'javascript':
			results = javascriptCodeChecker.getResults(editor);
			break;
		default:
			return videos;
	}

	if (results) {
		for (let result of results) {
			videos.push({
				token: result.token,
				sign: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','sign',result.sign+'.mp4')),
				info: result.info ? webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','info',result.info+'.mp4')) : undefined,
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