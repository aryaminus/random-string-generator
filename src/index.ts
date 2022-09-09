function builder(exp: string, count: number) {
	try {
		const _ = new RegExp(exp);
	} catch (e) {
		console.log("Not a regex expression");
		throw e;
	}
	return [];
}

async function main() {
	const strings = builder("/[/", 10);
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