import tokenizer, { openBracketTokenizer } from "./tokenizer";

import { getRandomValueBetween } from "./utils";

function getElements(token: ReturnType<typeof openBracketTokenizer>) {
	let map = {};
	let includedElements: number[] = [];

	if (!token.isElement) {
		return includedElements;
	}

	for (let item of token.valueList) {
		switch (item.type) {
			case "CHARACTER": {
				map[item.value.charCodeAt(0)] = 1;
				break;
			}
			case "RANGE": {
				for (
					let i = item.from.value.charCodeAt(0);
					i <= item.to.value.charCodeAt(0);
					i++
				) {
					map[i] = 1;
				}
				break;
			}
		}
	}

	for (let i = 32; i <= 126; i++) {
		if (map[i] === undefined) {
			includedElements.push(i);
		}
	}

	return includedElements;
}

function buildString(
	token: ReturnType<typeof openBracketTokenizer>,
	index: number
) {
	const currentValueList = token.valueList[index];
	let generatedCharacter = "";

	if (currentValueList.type === "CHARACTER") {
		generatedCharacter += currentValueList.value;
	}

	if (currentValueList.type === "RANGE") {
		generatedCharacter += String.fromCharCode(
			getRandomValueBetween(
				currentValueList.from.value.charCodeAt(0),
				currentValueList.to.value.charCodeAt(0)
			)
		);
	}

	return generatedCharacter;
}

function generator(
	currentString: string,
	token: ReturnType<typeof openBracketTokenizer>
) {
	const repeat = getRandomValueBetween(
		token.startingRange,
		token.endingRange
	);

	let includedElements = getElements(token);

	for (let i = 0; i < repeat; i++) {
		if (token.isElement) {
			currentString += String.fromCharCode(
				includedElements[
					getRandomValueBetween(0, includedElements.length - 1)
				]
			);
		} else {
			currentString += buildString(
				token,
				getRandomValueBetween(0, token.valueList.length - 1)
			);
		}
	}

	return currentString;
}

export function parser(tokens: ReturnType<typeof tokenizer>) {
	return tokens.reduce(
		(previousValue, currentValue) => generator(previousValue, currentValue),
		""
	);
}

export default parser;
