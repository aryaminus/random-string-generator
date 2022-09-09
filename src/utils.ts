/**
 * Return random number between and including two values
 */
export const getRandomValueBetween = (min: number, max: number) => {
	return Math.floor(
		Math.random() * (max === Infinity ? 20 : max - min + 1) + min
	);
};
