import { reservedWords, signs } from './sintax';
import { signsMisc } from '../../utils/constants';
import { ISign } from '../../utils/interfaces';

export function getResults(text: string): ISign[]
{
	const textLength: number = text.length;
	const results: ISign[] = [];
	let closure: string = '';
	let i: number = 0;
	
	/*
	if (text[0] === '#' && text[1] === '!')
	{
		results.push(signs.commentHashbang);
		closure = '\n';
		i = 2;
	}
	*/

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
			if (text[i] === '"')
			{
				results.push(signs.stringQuotationBegin);
				closure = '"';
				continue;
			}
			if (text[i] === '\'')
			{
				results.push(signs.stringApostropheBegin);
				closure = '\'';
				continue;
			}
			/*
			if (text[i] === '`')
			{
				results.push(signs.stringTemplateBegin);
				closure = '`';
				continue;
			}
			*/

			if (text[i] === '/')
			{
				/*
				if (text[i+1] === '/')
				{
					results.push(signs.commentLine);
					closure = '\n';
					i++;
					continue;
				}
				
				if (text[i+1] === '*')
				{
					results.push(signs.commentBlockBegin);
					closure = '*_/';
					i++;
					continue;
				}
				*/
				results.push(signs.divisionOrRegex);
				continue;
			}

			if (text[i] === '{')
			{
				results.push(signs.blockOrObjectBegin);
				continue;
			}

			if (text[i] === '}')
			{
				results.push(signs.blockOrObjectEnd);
				continue;
			}

			if (text[i] === '(')
			{
				results.push(signs.groupBegin);
				continue;
			}

			if (text[i] === ')')
			{
				results.push(signs.groupEnd);
				continue;
			}

			if (text[i] === ',')
			{
				results.push(signs.comma);
				continue;
			}

			if (text[i] === ';')
			{
				results.push(signs.semicolon);
				continue;
			}

			if (text[i] === '[')
			{
				results.push(signs.arrayBegin);
				continue;
			}

			if (text[i] === ']')
			{
				results.push(signs.arrayEnd);
				continue;
			}

			if (text[i] === '+')
			{
				if (text[i+1] === '+')
				{
					results.push(signs.increment);
					i++;
					continue;
				}
				results.push(signs.plusOrConcat);
				continue;
			}

			if (text[i] === '-')
			{
				if (text[i+1] === '-')
				{
					results.push(signs.decrement);
					i++;
					continue;
				}
				results.push(signs.minus);
				continue;
			}

			if (text[i] === '*')
			{
				if (text[i+1] === '*')
				{
					results.push(signs.power);
					i++;
					continue;
				}
				results.push(signs.times);
				continue;
			}

			if (text[i] === '%')
			{
				results.push(signs.modulus);
				continue;
			}

			if (text[i] === '=')
			{
				if (text[i+1] === '=')
				{
					if (text[i+2] === '=')
					{
						results.push(signs.equalStrict);
						i += 2;
						continue;
					}
					results.push(signs.equal);
					i++;
					continue;
				}
				/*
				if (text[i+1] === '>')
				{
					results.push(signs.functionArrow);
					i++;
					continue;
				}
				*/
				results.push(signs.assignment);
				continue;
			}

			if (text[i] === '!')
			{
				if (text[i+1] === '=')
				{
					if (text[i+2] === '=')
					{
						results.push(signs.differentStrict);
						i += 2;
						continue;
					}
					results.push(signs.different);
					i++;
					continue;
				}
				results.push(signs.not);
				continue;
			}

			if (text[i] === '&')
			{
				if (text[i+1] === '&')
				{
					results.push(signs.and);
					i++;
					continue;
				}
				//results.push(signs.bitwiseAnd);
				//continue;
			}

			if (text[i] === '|')
			{
				if (text[i+1] === '|')
				{
					results.push(signs.or);
					i++;
					continue;
				}
				//results.push(signs.bitwiseOr);
				//continue;
			}

			/*
			if (text[i] === '~')
			{
				results.push(signs.bitwiseNot);
				continue;
			}

			if (text[i] === '^')
			{
				results.push(signs.bitwiseXor);
				continue;
			}
			*/

			if (text[i] === '>')
			{
				/*
				if (text[i+1] === '>')
				{
					if (text[i+2] === '>')
					{
						results.push(signs.bitwiseShiftUnsigned);
						i += 2;
						continue;
					}
					results.push(signs.bitwiseShiftRight);
					i++;
					continue;
				}
				*/
				if (text[i+1] === '=')
				{
					results.push(signs.greaterEqual);
					i++;
					continue;
				}
				results.push(signs.greater);
				continue;
			}

			if (text[i] === '<')
			{
				/*
				if (text[i+1] === '<')
				{
					results.push(signs.bitwiseShiftLeft);
					i++;
					continue;
				}
				*/
				if (text[i+1] === '=')
				{
					results.push(signs.lesserEqual);
					i++;
					continue;
				}
				results.push(signs.lesser);
				continue;
			}

			/*
			if (text[i] === '?')
			{
				if (text[i+1] === '?')
				{
					results.push(signs.nullCoalesc);
					i++;
					continue;
				}
				if (text[i+1] === '.')
				{
					results.push(signs.chainOptional);
					i++;
					continue;
				}
				results.push(signs.ternaryIf);
				continue;
			}

			if (text[i] === ':')
			{
				results.push(signs.ternaryElseOrPropertyValue);
				continue;
			}

			if (text[i] === '.')
			{
				if (text[i+1] === '.' && text[i+2] === '.')
				{
					results.push(signs.spreadOrRest);
					continue;
				}
				results.push(signs.chain);
				continue;
			}
			*/

			if (text[i].match(/[a-gilonr-wy]/) && (i === 0 || !text[i-1].match(/[\w$]/)))
			{
				const firstWord = text.substring(i).match(/\w+\b/);

				if (firstWord && firstWord.length > 0 && !firstWord[0].match(/[\d_$]+/)
					&& firstWord[0] === firstWord[0].toLowerCase())
				{
					const found = reservedWords.find(word => word === firstWord[0]);
					if (found)
					{
						i += found.length-1;
						if (found !== 'function' && found !== 'yield')
						{
							results.push(signs[found]);
							continue;
						}
						if (text[i+1] === '*')
						{
							results.push(signs[found + 'Generator']);
							i++;
							continue;
						}
						if (text[i+1] === ' ' && text[i+2] === '*')
						{
							results.push(signs[found + 'Generator']);
							i += 2;
							continue;
						}
						results.push(signs[found]);
						continue;
					}
				}
			}
		}
		else
		{
			if (closure === '"' && text[i] === '"')
			{
				results.push(signs.stringQuotationEnd);
				closure = '';
				continue;
			}

			if (closure === '\'' && text[i] === '\'')
			{
				results.push(signs.stringApostropheEnd);
				closure = '';
				continue;
			}

			/*
			if (closure === '`' && text[i] === '`')
			{
				results.push(signs.stringTemplateEnd);
				closure = '';
				continue;
			}

			if (closure === '*_/' && text[i] === '*' && text[i+1] === '/')
			{
				results.push(signs.commentBlockEnd);
				closure = '';
				i++;
				continue;
			}
			*/
		}

		// TODO: punctuation in signsMisc
		if (text[i].toLowerCase().match(/[a-zç]/)) { results.push(signsMisc[text[i]]); }
		else if (text[i].match(/\d/)) { results.push(signsMisc['n'+text[i]]); }
	}

	return results;
}
