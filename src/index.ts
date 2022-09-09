import parser from "./parser";
import tokenizer from "./tokenizer";

function builder(exp: RegExp | string, count: number) {
	// Check Regex validity
	try {
		const _ = new RegExp(exp);
		console.log("A valid regex expression");
	} catch (e) {
		console.log("Not a valid regex expression");
		throw e;
	}

	// Extract string and remove leading / and trailing /
	let expression = exp.toString();
	expression = exp.toString().slice(1, expression.length - 1);

	// Start Tokenizing
	const tokens = tokenizer(expression);

	const arrayList = [];
	// Start Parsing the tokens
	for (let i = 0; i < count; i++) {
		arrayList.push(parser(tokens));
	}

	return arrayList;
}

async function main() {
	const strings = builder(/[-+]?[0-9]{1,16}[.][0-9]{1,6}/, 10);
	console.log(strings);
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});