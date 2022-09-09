function getCharactersWithBracket(expression: string, originalIndex: number) {
	const closingIndex = expression.indexOf("]");
	const exactExpression = expression.slice(originalIndex, closingIndex + 1);

	return { openingIndex: originalIndex, closingIndex, exactExpression };
}

function openBracketTokenizer(expression: string, originalIndex: number) {
	const charactersWithBracket = getCharactersWithBracket(
		expression,
		originalIndex
	);
}

function constantTokenizer(expression: string, originalIndex: number) {}

export function tokenizer(expression: string) {
	let tokenList = [];
	let i = 0;

	while (i < expression.length) {
		let tokenValue;

		if (expression[i] === "[") {
			tokenValue = openBracketTokenizer(expression, i);
		} else {
			tokenValue = constantTokenizer(expression, i);
		}

		tokenList.push(tokenValue.tokens);

		i = tokenValue.newIndex + 1;
	}

	return tokenList;
}

export default tokenizer;
