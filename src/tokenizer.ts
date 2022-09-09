function constantTokenizer(expression: string, originalIndex: number) {}

function findQuantifierRange(afterTokenExpression: string) {
	const nextCharacters = ["?", "*", "+", "{"];

	if (
		afterTokenExpression.length === 0 ||
		!nextCharacters.includes(afterTokenExpression[0])
	) {
		return { startingRange: 1, endingRange: 1, operationLength: 0 };
	}

	let startingRange = 1;
	let endingRange = 1;
	let operationLength = 1; // length of string used in quantifier

	let character = afterTokenExpression[0];
	switch (character) {
		case "?": {
			startingRange = 0;
			break;
		}
		case "*": {
			startingRange = 0;
			endingRange = Infinity;
			break;
		}
		case "+": {
			startingRange = 1;
			endingRange = Infinity;
			break;
		}
		case "{": {
			let closingParenthesisIndex = afterTokenExpression.indexOf("]");

			// If } does not exist set operation length as 0 and break the case
			if (closingParenthesisIndex === -1) {
				operationLength = 0;
				break;
			}

			const stringInsideParenthesis = afterTokenExpression.slice(
				1,
				closingParenthesisIndex
			);
			operationLength = stringInsideParenthesis.length + 2;

			let range = stringInsideParenthesis.split(",");

			// If range is higher than 2 values set operation length as 0 and break the case
			if (range.length > 2) {
				operationLength = 0;
				break;
			}

			// If first item is not empty
			if (range[0] !== "") {
				let first = parseInt(range[0]);

				// If first value is Not a Number set operation length as 0 and break the case
				if (first === NaN) {
					operationLength = 0;
					break;
				}

				startingRange = first;
				endingRange = first;
			}

			if (range.length === 2) {
				// If the second item is empty set endingRange as Inf. and break the case
				if (range[1] === "") {
					endingRange = Infinity;
					break;
				}

				let second = parseInt(range[1]);

				if (second === NaN) {
					operationLength = 0;
					startingRange = 1;
				} else {
					endingRange = second;
				}
			}
			break;
		}
	}

	return { startingRange, endingRange, operationLength };
}

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
	let range = findQuantifierRange(stringAfterClosingBracket); // find quantifier

	return {
		type: "BRACKET",
		tokens,
		isElm,
		closingIndex: indexOfClosingBracket,
		...range,
	};
}

export function tokenizer(expression: string) {
	let tokenList = [];
	let openingIndex = 0;

	while (openingIndex < expression.length) {
		let tokenValue: ReturnType<typeof openBracketTokenizer>;

		if (expression[openingIndex] === "[") {
			tokenValue = openBracketTokenizer(expression, openingIndex);
		} else {
			// tokenValue = constantTokenizer(expression, openingIndex);
		}

		tokenList.push(tokenValue.tokens);

		openingIndex = tokenValue.closingIndex + tokenValue.operationLength + 1;
	}

	return tokenList;
}

export default tokenizer;
