import * as vscode from 'vscode';
import * as javascriptCodeChecker from './javascript/codeChecker';
import * as javascriptCategories from './javascript/categories';
import { ITooltips, ISign, ISignVideos, ICategory, ICategoryVideos } from '../utils/interfaces';
import { tooltipsIds } from '../utils/constants';

class Translator
{
	signLanguage: string;
	webview: vscode.Webview;
	uri: vscode.Uri;

	constructor(signLanguage: string, webview: vscode.Webview, uri: vscode.Uri): void
	{
		this.signLanguage = signLanguage;
		this.webview = webview;
		this.uri = uri;
	}

	getWelcome(): ISignVideos[]
	{
		const videos: ISignVideos[] = [];
		videos.push({
			token: '',
			file: this.webview.asWebviewUri(
				vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'welcome.mp4')
			),
			info: undefined,
			examples: undefined,
		});
		return videos;
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
			examples: undefined,
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
	
		if (results)
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
						examples: undefined,
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
						examples: undefined,
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

	getCategories(currentLanguage: string, editorLanguage: string): ICategoryVideos[]
	{
		const categories: ICategoryVideos[] = [];
		
		if (currentLanguage === editorLanguage) {
			return categories;
		}
		
		const results: ICategory[] = [];
	
		switch (editorLanguage)
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
						file: this.webview.asWebviewUri(
							vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'languages',editorLanguage,'code',sign.file+'.mp4')
						),
						info: sign.info ?
							this.webview.asWebviewUri(
								vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'languages',editorLanguage,'info',sign.info+'.mp4')
							) : undefined,
						examples: sign.examples,
					});
				}
	
				categories.push({
					title: result.title,
					id: result.id,
					icon: result.icon,
					tooltip: this.webview.asWebviewUri(
						vscode.Uri.joinPath(this.uri,'videos',this.signLanguage,'languages',editorLanguage,'category',result.tooltip+'.mp4')
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
	
		text = text.trim().replace(/[\t\v\f ]+/g, ' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	
		return text;
	}
}
