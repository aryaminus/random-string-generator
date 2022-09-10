import * as readline from "readline";

import parser from "./parser";
import tokenizer from "./tokenizer";

function builder(exp: string, count: number) {
	// Check Regex validity
	try {
		const _ = new RegExp(exp);
		console.log("\x1b[33m%s\x1b[0m", "[CHECK]", `"${exp}" expression is valid\n`);
	} catch (e) {
		console.error(
			"\x1b[31m%s\x1b[0m",
			"[ERROR]",
			`"${exp}" expression is invalid\n`
		);
		throw e;
	}

	// Extract string and remove leading / and trailing /
	let expression = exp.slice(1, exp.length - 1);

	// Start Tokenizing
	const tokens = tokenizer(expression);

	const arrayList = [];
	// Start Parsing the tokens
	for (let i = 0; i < count; i++) {
		arrayList.push(parser(tokens));
	}

	return arrayList;
}

async function handler(exp: string, count: number) {
	console.log(
		"\x1b[36m%s\x1b[0m",
		"\n[START]",
		`Generating ${count} values for "${exp}" expression\n`
	);

	const arrayList = builder(exp, count);

	console.log("\x1b[32m%s\x1b[0m", "[DONE]", `Generated Table:\n`);
	console.table(arrayList);
}

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function main(argv = process.argv) {
	let [, , exp, count] = argv;

	if (!exp) {
		exp = await new Promise((resolve) => {
			rl.question("Please enter an expression:", resolve);
		});
	}

	if (!count) {
		count = await new Promise((resolve) => {
			rl.question("Please enter a count:", resolve);
		});
	}

	handler(exp, +count ? +count : 10)
		.then(() => {
			process.exit(0);
		})
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}

main();
