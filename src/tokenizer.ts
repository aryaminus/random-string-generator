import findQuantifierRange from "./quantifier";

function constantTokenizer(expression: string, openingIndex: number) {
	let charactersList = expression.match(/(.-.|.)/g);

	// Build token for values
	const tokens = characterTokenizer(charactersList);

	// Find Quantifier Range
	const stringAfterConstant = expression.slice(
		openingIndex + 1,
		expression.length
	);
	let range = findQuantifierRange(stringAfterConstant);

	return {
		tokens,
		isElm: expression[openingIndex] === ".",
		openingIndex,
		closingIndex: openingIndex,
		...range,
	};
}

function characterTokenizer(charactersList: RegExpMatchArray) {
	return charactersList.map((c) => {
		if (c.length == 1) {
			return {
				type: "CHARACTER",
				value: c === "." ? "\n" : c,
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

	// Get the index of closing bracket by adding length of string before opening bracket to length of string till closing bracket
	let indexOfClosingBracket =
		expression.slice(0, indexOfOpeningBracket).length +
		expression.slice(indexOfOpeningBracket, expression.length).indexOf("]");

	// Get characters inside bracket and create matched array
	let charactersList = expression
		.slice(indexOfOpeningBracket + 1, indexOfClosingBracket)
		.match(/(.-.|.)/g);

	// Check for Elm, mark it and remove from charactersList
	if (
		charactersList.length !== 0 &&
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
	let range = findQuantifierRange(stringAfterClosingBracket);

	return {
		tokens,
		isElm,
		openingIndex: indexOfOpeningBracket,
		closingIndex: indexOfClosingBracket,
		...range,
	};
}

export function tokenizer(expression: string) {
	let tokenList: ReturnType<typeof openBracketTokenizer>[] = [];
	let currentIndex = 0;

	while (currentIndex < expression.length) {
		let tokenValue: ReturnType<typeof openBracketTokenizer>;

		if (expression[currentIndex] === "[") {
			tokenValue = openBracketTokenizer(expression, currentIndex);
		} else {
			tokenValue = constantTokenizer(expression, currentIndex);
		}

		tokenList.push(tokenValue);

		currentIndex = tokenValue.closingIndex + tokenValue.operationLength + 1;
	}

	return tokenList;
}

export default tokenizer;
