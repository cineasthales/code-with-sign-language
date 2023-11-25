import * as vscode from 'vscode';
import * as analyser from './javascript/analyser';

export function readCode(editor: vscode.TextEditor, webview: vscode.Webview, uri: vscode.Uri)
{
	const signs: string[] = analyser.getSigns(editor);
	const videos: object[] = [];
	for (let sign of signs) {
		videos.push({
			sign: sign,
			file: webview.asWebviewUri(vscode.Uri.joinPath(uri, 'videos', 'libras', 'code', sign + '.mp4')),
			info: webview.asWebviewUri(vscode.Uri.joinPath(uri, 'videos', 'libras', 'info', sign + '.mp4')),
		});
	}
}

export function writeCode(editor: vscode.TextEditor, text: string)
{
	const position: vscode.Position = editor.selection.active;
	editor.edit((builder: vscode.TextEditorEdit) => {
		builder.insert(position, text);
	});
}