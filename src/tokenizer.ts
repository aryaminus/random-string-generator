function bracketTokenizer(expression: string, originalIndex: number) {}

function constantTokenizer(expression: string, originalIndex: number) {}

export function tokenizer(expression: string) {
	let tokenList = [];
	let i = 0;

	while (i < expression.length) {
		let tokenValue;

		if (expression[i] === "[") {
			tokenValue = bracketTokenizer(expression, i);
		} else {
			tokenValue = constantTokenizer(expression, i);
		}

		tokenList.push(tokenValue.tokens);

		i = tokenValue.newIndex + 1;
	}

	return tokenList;
}

export default tokenizer;
