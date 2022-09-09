import tokenizer from "./tokenizer";

export function parser(expression: ReturnType<typeof tokenizer>) {
	return expression;
}

export default parser;
