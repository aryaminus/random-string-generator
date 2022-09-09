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
			case "CHARACTER":
				map[item.value.charCodeAt(0)] = 1;
			case "RANGE":
				for (
					let i = item.from.value.charCodeAt(0);
					i <= item.to.value.charCodeAt(0);
					i++
				) {
					map[i] = 1;
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
	generatedString: string,
	token: ReturnType<typeof openBracketTokenizer>
) {
	const repeat = getRandomValueBetween(
		token.startingRange,
		token.endingRange
	);

	let includedElements = getElements(token);

	for (let i = 0; i < repeat; i++) {
		if (token.isElement) {
			generatedString += String.fromCharCode(
				includedElements[
					getRandomValueBetween(0, includedElements.length - 1)
				]
			);
		} else {
			generatedString += buildString(
				token,
				getRandomValueBetween(0, token.valueList.length - 1)
			);
		}
	}

	return generatedString;
}

export function parser(tokens: ReturnType<typeof tokenizer>) {
	let generatedString = "";

	for (let token of tokens) {
		generatedString = generator(generatedString, token);
	}

	return generatedString;
}

export default parser;
