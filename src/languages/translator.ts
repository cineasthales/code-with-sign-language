import * as vscode from 'vscode';
import * as javascriptCodeChecker from './javascript/codeChecker';
import { IVideo } from '../utils/interfaces';

export function readCode(editor: vscode.TextEditor, webview: vscode.Webview, uri: vscode.Uri) : IVideo[]
{
	let signs: string[];
	const videos: IVideo[] = [];

	if (vscode.languages.getDiagnostics(editor.document.uri).length > 0) {
		return videos;
	}

	switch (editor.document.languageId) {
		case 'javascript':
			signs = javascriptCodeChecker.getSigns(editor);
			break;
		default:
			return videos;
	}

	if (signs) {
		for (let sign of signs) {
			videos.push({
				sign: sign,
				file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','code',sign+'.mp4')),
				info: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos','libras','info',sign+'.mp4')),
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