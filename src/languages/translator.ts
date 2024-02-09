import * as vscode from 'vscode';
import * as javascriptCodeChecker from './javascript/codeChecker';
import * as javascriptCategories from './javascript/categories';
import { ITooltips, ISign, ISignVideos, ICategory, ICategoryVideos } from '../utils/interfaces';
import { tooltipsIds } from '../utils/constants';

export class Translator
{
	signLanguage: string;
	webview: vscode.Webview;
	uri: vscode.Uri;

	constructor(signLanguage: string, webview: vscode.Webview, uri: vscode.Uri)
	{
		this.signLanguage = signLanguage;
		this.webview = webview;
		this.uri = uri;
	}

	getTooltips(): ITooltips[]
	{
		const tooltips: ITooltips[] = [];
		for (let tooltip of tooltipsIds)
		{
			tooltips.push({
				id: tooltip,
				file: this.webview.asWebviewUri(
					vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'tooltip',tooltip+'.mp4')
				),
			});
		}
		return tooltips;
	}

	getError(message: string): ISignVideos[]
	{
		const videos: ISignVideos[] = [];
		videos.push({
			token: 'Erro!',
			file: this.webview.asWebviewUri(
				vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'error',message+'.mp4')
			),
			info: undefined,
			example: undefined,
		});
		return videos;
	}

	readCode(editor: vscode.TextEditor): ISignVideos[]
	{
		const language: string = editor.document.languageId;
		const results: ISign[] = [];
		const videos: ISignVideos[] = [];
	
		const text: string = this.#sanitizeEditorText(editor);

		switch (language)
		{
			case 'javascript':
				results.push(...javascriptCodeChecker.getResults(text));
				break;
			default:
				return videos;
		}
	
		if (results.length > 0)
		{
			for (let result of results)
			{
				if (result.isCode)
				{
					videos.push({
						token: result.token,
						file: this.webview.asWebviewUri(
							vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'languages',language,'code',result.file+'.mp4')
						),
						info: result.info ?
							this.webview.asWebviewUri(
								vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'languages',language,'info',result.info+'.mp4')
							) : undefined,
						example: undefined,
					});
				}
				else
				{
					videos.push({
						token: result.token,
						file: this.webview.asWebviewUri(
							vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'misc',result.file+'.mp4')
						),
						info: undefined,
						example: undefined,
					});
				}
			}
		}
	
		return videos;
	}

	writeCode(editor: vscode.TextEditor, text: string): void
	{
		const position: vscode.Position = editor.selection.active;
		editor.edit((builder: vscode.TextEditorEdit) => { builder.insert(position, text); });
	}

	getCategories(language: string): ICategoryVideos[]
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
	
		if (results.length > 0)
		{
			for (let result of results)
			{
				const categoryVideos: ISignVideos[] = [];
				
				for (let sign of result.signs)
				{
					categoryVideos.push({
						token: sign.token,
						file: this.webview.asWebviewUri(
							vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'languages',language,'code',sign.file+'.mp4')
						),
						info: sign.info ?
							this.webview.asWebviewUri(
								vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'languages',language,'info',sign.info+'.mp4')
							) : undefined,
						example: sign.example,
					});
				}
	
				categories.push({
					title: result.title,
					id: result.id,
					icon: result.icon,
					tooltip: this.webview.asWebviewUri(
						vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'languages',language,'category',result.tooltip+'.mp4')
					),
					videos: categoryVideos,
				});
			}
		}
	
		return categories;
	}

	#sanitizeEditorText(editor: vscode.TextEditor): string
	{
		let text: string = '';
	
		for (let selection of editor.selections)
		{
			if (text.length > 0) { text += ' '; }
			const range: vscode.Range = new vscode.Range(selection.start, selection.end);
			text += editor.document.getText(range);
		}
		if (text === '') { text = editor.document.getText(); }

		return text
			.trim()
			.replace(/[\t\v\f ]+/g, ' ')
			.replace(/console[ ]*\.[ ]*log/g, 'console.log')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
	}
}
