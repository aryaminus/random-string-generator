function constantTokenizer(expression: string, originalIndex: number) {}

function characterTokenizer(charactersList: RegExpMatchArray) {
	return charactersList.map((c) => {
		if (c.length == 1) {
			return {
				type: "CHARACTER",
				value: c,
			};
		} else {
			return {
				type: "RANGE",
				from: {
					type: "CHARACTER",
					value: c[0],
				},
				to: {
					type: "CHARACTER",
					value: c[c.length],
				},
			};
		}
	});
}

function openBracketTokenizer(
	expression: string,
	indexOfOpeningBracket: number
) {
	let isElm = false;

	// Get characters inside bracket and create matched array
	let indexOfClosingBracket = expression.indexOf("]");
	let charactersList = expression
		.slice(indexOfOpeningBracket + 1, indexOfClosingBracket)
		.match(/(.-.|.)/g);

	// Check for Elm, mark it and remove from charactersList
	if (
		charactersList.length &&
		charactersList[0] === "^" &&
		expression[1] !== "\\"
	) {
		isElm = true;
		charactersList = charactersList.slice(1, charactersList.length);
	}

	// Build token for values
	const tokens = characterTokenizer(charactersList);

	// Find Quantifier Range
	const stringAfterClosingBracket = expression.slice(
		indexOfClosingBracket + 1,
		expression.length
	);
}

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
