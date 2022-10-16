const split = (array, n) =>
	array.reduce(
		(a, c, i) =>
			i % n === 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]],
		[],
	);

console.log(split([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3));
