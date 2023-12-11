import * as vscode from 'vscode';
import * as javascriptCodeChecker from './javascript/codeChecker';
import * as javascriptCategories from './javascript/categories';
import { ISign, ISignVideos, ICategory, ICategoryVideos } from '../utils/interfaces';

export function readCode(signLanguage: string, editor: vscode.TextEditor, webview: vscode.Webview, uri: vscode.Uri): ISignVideos[]
{
	const language: string = editor.document.languageId;
	const results: ISign[] = [];
	const videos: ISignVideos[] = [];

	const text: string = getTextInEditor(editor);

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
			if (result.isCode)
			{
				videos.push({
					token: result.token,
					file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',signLanguage,'languages',language,'code',result.file+'.mp4')),
					info: result.info ?
						webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',signLanguage,'languages',language,'info',result.info+'.mp4')) : undefined,
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
	editor.edit((builder: vscode.TextEditorEdit) => { builder.insert(position, text); });
}

export function getCategories(signLanguage: string, language: string, webview: vscode.Webview, uri: vscode.Uri): ICategoryVideos[]
{
	const results: ICategory[] = [];
	const categories: ICategoryVideos[] = [];

	switch (language)
	{
		case 'javascript':
			results.push(...javascriptCategories.categories);
			break;
		default:
			return categories;
	}

	if (results)
	{
		for (let result of results)
		{
			const categoryVideos: ISignVideos[] = [];
			
			for (let sign of result.signs)
			{
				categoryVideos.push({
					token: sign.token,
					file: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',signLanguage,'languages',language,'code',sign.file+'.mp4')),
					info: sign.info ?
						webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',signLanguage,'languages',language,'info',sign.info+'.mp4')) : undefined,
					examples: sign.examples,
				});
			}

			categories.push({
				title: result.title,
				id: result.id,
				icon: result.icon,
				tooltip: webview.asWebviewUri(vscode.Uri.joinPath(uri,'videos',signLanguage,'languages',language,'category',result.tooltip+'.mp4')),
				videos: categoryVideos,
			});
		}
	}

	return categories;
}

function getTextInEditor(editor: vscode.TextEditor): string
{
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

	text = text.trim().replace(/[\t\v\f ]+/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, '');

	return text;
}
