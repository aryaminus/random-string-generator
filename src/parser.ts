import tokenizer, { openBracketTokenizer } from "./tokenizer";

import { getRandomValueBetween } from "./utils";

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

function generator(token: ReturnType<typeof openBracketTokenizer>) {
	let generatedString = "";

	const repeat = getRandomValueBetween(
		token.startingRange,
		token.endingRange
	);

	for (let i = 0; i < repeat; i++) {
		const index = getRandomValueBetween(0, token.valueList.length - 1);
		generatedString += buildString(token, index);
	}

	return generatedString;
}

export function parser(tokens: ReturnType<typeof tokenizer>) {
	for (let token of tokens) {
		return generator(token);
	}
}

export default parser;
