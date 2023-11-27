import * as vscode from "vscode";
import { reservedWords } from './sintax';
import { IResult } from '../../utils/interfaces';

export function getResults(editor: vscode.TextEditor) : IResult[]
{
	const results: IResult[] = [];

	for (let selection of editor.selections)
	{
		const range: vscode.Range = new vscode.Range(selection.start, selection.end);
		const text: string = editor.document.getText(range).trim().replace(/[\t\v\f ]+/g, ' ');
		const textLength: number = text.length;
		let i: number = 0;
		let closure: string = '';

		if (selection === editor.selections[0]
			&& selection.start.isEqual(new vscode.Position(0, 0))
			&& text[0] === '#' && text[1] === '!')
		{
			results.push({token:'#!',sign:'comment.hashbang',info:'comment.hashbang'});
			closure = '\n';
			i = 2;
		}

		for (i; i < textLength; i++)
		{
			if (text[i] === ' ') { continue; }

			if (text[i].match(/[\r\n]/))
			{
				if (closure === '\n') { closure = ''; }
				continue;
			}

			if (closure === '')
			{
				if (text[i].match(/["'`]/))
				{
					results.push({token:text[i],sign:'string.begin',info:'string'});
					closure = text[i];
					continue;
				}

				if (text[i] === '/')
				{
					if (text[i+1] === '/')
					{
						results.push({token:'//',sign:'comment.single.begin',info:'comment.single'});
						closure = '\n';
						i++;
						continue;
					}
					if (text[i+1] === '*')
					{
						results.push({token:'/*',sign:'comment.block.begin',info:'comment.block'});
						closure = '*/';
						i++;
						continue;
					}
					results.push({token:'/',sign:'regex.begin',info:'regex'});
					closure = '/';
					continue;
				}

				if (text[i] === '[')
				{
					results.push({token:'[',sign:'array.begin',info:'array'});
					closure = ']';
					continue;
				}

				if (text[i] === '+' && text[i+1] === '+') {
					results.push({token:'++',sign:'math.increment',info:'math.increment'});
					i++;
					continue;
				}

				if (text[i] === '-' && text[i+1] === '-') {
					results.push({token:'--',sign:'math.decrement',info:'math.decrement'});
					i++;
					continue;
				}

				if (text[i] === '?') {
					if (text[i+1] === '?') {
						if (text[i+2] === '=') {
							results.push({token:'??=',sign:'nullcoalesc.assignment',info:'nullcoalesc.assignment'});
							i += 2;
							continue;
						}
						results.push({token:'??',sign:'nullcoalesc',info:'nullcoalesc'});
						i++;
						continue;
					}
					if (text[i+1] === '.') {
						results.push({token:'?.',sign:'chain.optional',info:'chain.optional'});
						i++;
						continue;
					}
					results.push({token:'?',sign:'ternary.if',info:'ternary'});
					continue;
				}

				if (text[i] === ':') {
					results.push({token:':',sign:'ternary.else',info:'ternary'});
					continue;
				}

				if (text[i] === '.') {
					results.push({token:'.',sign:'chain',info:'chain'});
					continue;
				}

				if (text[i] === '!') {
					if (text[i+1] === '=') {
						if (text[i+2] === '=') {
							results.push({token:'!==',sign:'different.strict',info:'different.strict'});
							i += 2;
							continue;
						}
						results.push({token:'!=',sign:'different',info:'different'});
						i++;
						continue;
					}
					results.push({token:'!',sign:'logical.not',info:'logical.not'});
					continue;
				}

				if (text[i] === '&') {
					if (text[i+1] === '&') {
						results.push({token:'&&',sign:'logical.and',info:'logical.and'});
						i++;
						continue;
					}
					results.push({token:'&',sign:'bitwise.and',info:'bitwise.and'});
					continue;
				}

				if (text[i] === '|') {
					if (text[i+1] === '|') {
						results.push({token:'||',sign:'logical.or',info:'logical.or'});
						i++;
						continue;
					}
					results.push({token:'|',sign:'bitwise.or',info:'bitwise.or'});
					continue;
				}

				if (text[i] === '^') {
					results.push({token:'^',sign:'bitwise.xor',info:'bitwise.xor'});
					continue;
				}

				if (text[i] === '*') {
					if (text[i+1] === '*') {
						results.push({token:'**',sign:'math.power',info:'math.power'});
						i++;
						continue;
					}
					results.push({token:'*',sign:'math.times',info:'math.times'});
					continue;
				}

				if (text[i] === '=') {
					if (text[i+1] === '=') {
						if (text[i+2] === '=') {
							results.push({token:'===',sign:'equals.strict',info:'equals.strict'});
							i += 2;
							continue;
						}
						results.push({token:'==',sign:'equals',info:'equals'});
						i++;
						continue;
					}
					if (text[i+1] === '>') {
						results.push({token:'=>',sign:'function.arrow',info:'function.arrow'});
						i++;
						continue;
					}
					results.push({token:'=',sign:'assignment',info:'assignment'});
					continue;
				}

				if (text[i] === '>') {
					if (text[i+1] === '=') {
						results.push({token:'>=',sign:'greater.equal',info:'greater.equal'});
						i++;
						continue;
					}
					if (text[i+1] === '>') {
						if (text[i+1] === '>') {
							results.push({token:'>>>',sign:'bitwise.shift.unsigned',info:'bitwise.shift.unsigned'});
							i += 2;
							continue;
						}
						results.push({token:'>>',sign:'bitwise.shift.right',info:'bitwise.shift.right'});
						i++;
						continue;
					}
					results.push({token:'>',sign:'greater',info:'greater'});
					continue;
				}

				if (text[i] === '<') {
					if (text[i+1] === '=') {
						results.push({token:'<=',sign:'lesser.equal',info:'lesser.equal'});
						i++;
						continue;
					}
					if (text[i+1] === '<') {
						results.push({token:'<<',sign:'bitwise.shift.left',info:'bitwise.shift.left'});
						i++;
						continue;
					}
					results.push({token:'<',sign:'lesser',info:'lesser'});
					continue;
				}

				if (text[i].match(/[a-gilopnr-wy]/) && (i === 0 || !text[i-1].match(/[\w$]/)))
				{
					const firstWord = text.substring(i).match(/\w+\b/);
	
					if (firstWord && firstWord.length > 0 && !firstWord[0].match(/[\d_$]+/)
						&& firstWord[0] === firstWord[0].toLowerCase())
					{
						const found = reservedWords.find(word => word === firstWord[0]);
						if (found) {
							if (found !== 'function' && found !== 'yield') {
								results.push({token:found,sign:found,info:found});
								i += found.length-1;
								continue;
							}
							if (text[i+1] === '*') {
								results.push({token:found+'*',sign:found+'.generator',info:found+'.generator'});
								i += found.length;
								continue;
							}
							if (text[i+1] === ' ' && text[i+2] === '*') {
								results.push({token:found+' *',sign:found+'.generator',info:found+'.generator'});
								i += found.length+1;
								continue;
							}
							results.push({token:found,sign:found,info:found});
							i += found.length-1;
							continue;
						}
					}
				}
			}
			else
			{
				if (closure === text[i] && text[i].match(/["'`]/) && text[i-1] !== '\\')
				{
					results.push({token:text[i],sign:'string.end',info:'string'});
					closure = '';
					continue;
				}

				if (closure === '/' && text[i] === '/')
				{
					results.push({token:'/',sign:'regex.end',info:'regex'});
					closure = '';
					continue;
				}

				if (closure === '\n' && text[i] === '\n')
				{
					results.push({token:'',sign:'comment.single.end',info:'comment.single'});
					closure = '';
					continue;
				}

				if (closure === '*/' && text[i] === '*' && text[i+1] === '/')
				{
					results.push({token:'*/',sign:'comment.block.end',info:'comment.block'});
					closure = '';
					i++;
					continue;
				}

				if (closure === ']' && text[i] === ']') {
					closure = '';
					results.push({token:']',sign:'array.end',info:'array'});
					continue;
				}
			}

			if (text[i].match(/[a-zA-Z0-9]/)) { results.push({token:text[i],sign:text[i],info:''}); }
		}
	}

	return results;
}