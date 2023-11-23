import * as vscode from "vscode";
import { reservedWords } from './reservedWords';

export function getSigns(editor: vscode.TextEditor) : string[]
{
	let signs = [];

	if (vscode.languages.getDiagnostics(editor.document.uri).length > 0) {
		signs.push('oi');
	}

	for (let selection of editor.selections)
	{
		const range = new vscode.Range(selection.start, selection.end);
		const text = editor.document.getText(range).trim().replace(/[\t\v\f ]+/g, ' ');
		const textLength = text.length;
		let i = 0, closure = '';

		// Comentário hashbang
		if (selection === editor.selections[0]
			&& selection.start.isEqual(new vscode.Position(0, 0))
			&& text[0] === '#' && text[1] === '!')
		{
			closure = '\n';
			signs.push('comment.hashbang');
			i = 2;
		}

		for (i; i < textLength; i++)
		{
			// Espaço em branco
			if (text[i] === ' ') { continue; }

			// Nova linha
			if (text[i].match(/[\r\n]/))
			{
				if (closure === '\n') { closure = ''; }
				continue;
			}

			// Não estando em um bloco especial
			if (closure === '')
			{
				// String
				if (text[i].match(/["'`]/))
				{
					closure = text[i];
					signs.push('string.start');
					continue;
				}

				if (text[i] === '/')
				{
					// Comentário em linha única
					if (text[i+1] === '/')
					{
						closure = '\n';
						signs.push('comment.single.start');
						i++;
						continue;
					}
					// Comentário em bloco
					if (text[i+1] === '*')
					{
						closure = '*/';
						signs.push('comment.start');
						i++;
						continue;
					}
					// Expressão Regular
					closure = '/';
					signs.push('regex.start');
					continue;
				}

				// Vetor
				if (text[i] === '[')
				{
					closure = ']';
					signs.push('array.start');
					continue;
				}

				// Incremento
				if (text[i] === '+' && text[i+1] === '+') {
					signs.push('increment');
					i++;
					continue;
				}

				// Decremento
				if (text[i] === '-' && text[i+1] === '-') {
					signs.push('decrement');
					i++;
					continue;
				}

				if (text[i] === '?') {
					if (text[i+1] === '?') {
						// Atribuição em coalescência nula
						if (text[i+2] === '=') {
							signs.push('assign.nullcoalesc');
							i += 2;
							continue;
						}
						// Coalescência nula
						signs.push('nullcoalesc');
						i++;
						continue;
					}
					// Cadeia opcional
					if (text[i+1] === '.') {
						signs.push('chain.optional');
						i++;
						continue;
					}
					// If ternário
					signs.push('ternary.if');
					continue;
				}

				// Else ternário
				if (text[i] === ':') {
					signs.push('ternary.else');
					continue;
				}

				// Cadeia
				if (text[i] === '.') {
					signs.push('chain');
					continue;
				}

				if (text[i] === '!') {
					if (text[i+1] === '=') {
						// Estritamente diferente
						if (text[i+2] === '=') {
							signs.push('different.strict');
							i += 2;
							continue;
						}
						// Diferente
						signs.push('different');
						i++;
						continue;
					}
					// Operador lógico NOT
					signs.push('logical.not');
					continue;
				}

				if (text[i] === '&') {
					// Operador lógico AND
					if (text[i+1] === '&') {
						signs.push('logical.and');
						i++;
						continue;
					}
					// Bitwise AND
					signs.push('bitwise.and');
					continue;
				}

				if (text[i] === '|') {
					// Operador lógico OR
					if (text[i+1] === '|') {
						signs.push('logical.or');
						i++;
						continue;
					}
					// Bitwise OR
					signs.push('bitwise.or');
					continue;
				}

				// Bitwise XOR
				if (text[i] === '^') {
					signs.push('bitwise.xor');
					continue;
				}

				if (text[i] === '*') {
					// Potência
					if (text[i+1] === '*') {
						signs.push('math.power');
						i++;
						continue;
					}
					// Multiplicação
					signs.push('math.times');
					continue;
				}

				if (text[i] === '=') {
					if (text[i+1] === '=') {
						if (text[i+2] === '=') {
							// Estritamente igual
							signs.push('equals.strict');
							i += 2;
							continue;
						}
						// Igual
						signs.push('equals');
						i++;
						continue;
					}
					if (text[i+1] === '>') {
						// Função Seta
						signs.push('function.arrow');
						i++;
						continue;
					}
					// Atribuição
					signs.push('assignment');
					continue;
				}

				if (text[i] === '>') {
					// Maior ou igual
					if (text[i+1] === '=') {
						signs.push('greater.equal');
						i++;
						continue;
					}
					if (text[i+1] === '>') {
						// Troca bitwise à direita sem sinal
						if (text[i+1] === '>') {
							signs.push('bitwise.shift.unsigned');
							i += 2;
							continue;
						}
						// Troca bitwise à direita
						signs.push('bitwise.shift.right');
						i++;
						continue;
					}
					// Maior
					signs.push('greater');
					continue;
				}

				if (text[i] === '<') {
					// Menor ou igual
					if (text[i+1] === '=') {
						signs.push('lesser.equal');
						i++;
						continue;
					}
					// Troca bitwise à esquerda
					if (text[i+1] === '<') {
						signs.push('bitwise.shift.left');
						i++;
						continue;
					}
					// Menor
					signs.push('lesser');
					continue;
				}

				// Palavras reservadas
				if (text[i].match(/[a-gilopnr-wy]/) && (i === 0 || !text[i-1].match(/[\w$]/)))
				{
					const firstWord = text.substring(i).match(/\w+\b/);
	
					if (firstWord && firstWord.length > 0 && !firstWord[0].match(/[\d_$]+/)
						&& firstWord[0] === firstWord[0].toLowerCase())
					{
						const found = reservedWords.find(word => word === firstWord[0]);
						if (found) {
							if (found !== 'function' && found !== 'yield') {
								signs.push(found);
								i += found.length-1;
								continue;
							}
							// Gerador function ou yield
							if (text[i+1] === '*') {
								signs.push(found + '.generator');
								i += found.length;
								continue;
							}
							// Gerador function ou yield
							if (text[i+1] === ' ' && text[i+2] === '*') {
								signs.push(found + '.generator');
								i += found.length+1;
								continue;
							}
							// Function ou yield
							signs.push(found);
							i += found.length-1;
							continue;
						}
					}
				}
			}
			else
			{
				// String (fechamento)
				if (closure === text[i] && text[i].match(/["'`]/)
					&& text[i-1] !== '\\')
				{
					closure = '';
					signs.push('string.end');
					continue;
				}

				// Expressão Regular (fechamento)
				if (closure === '/' && text[i] === '/')
				{
					closure = '';
					signs.push('regex.end');
					continue;
				}

				// Comentário em linha única (fechamento)
				if (closure === '\n' && text[i] === '\n')
				{
					closure = '';
					signs.push('comment.single.end');
					continue;
				}

				// Comentário em bloco (fechamento)
				if (closure === '*/' && text[i] === '*' && text[i+1] === '/')
				{
					closure = '';
					signs.push('comment.end');
					i++;
					continue;
				}

				// Vetor (fechamento)
				if (closure === ']' && text[i] === ']') {
					closure = '';
					signs.push('array.end');
					continue;
				}
			}

			// Sendo caractere alfanumérico
			if (text[i].match(/[a-zA-Z0-9]/)) { signs.push(text[i]); }
		}
	}

	if (!signs.length) { signs.push('oi'); }

	return signs;
}