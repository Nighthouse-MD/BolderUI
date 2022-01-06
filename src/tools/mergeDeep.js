/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
	return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			mergeDeepByType(target, source, key);
		}
	}
	return mergeDeep(target, ...sources);
}

function mergeDeepByType(target, source, key) {
	if (isObject(source[key])) {
		if (!target[key])
			Object.assign(target, { [key]: {} });
		mergeDeep(target[key], source[key]);
	} else if (Array.isArray(source[key])) {
		mergeArray(target, source, key);
	} else if (typeof (source[key]) === "string") {
		Object.assign(target, { [key]: source[key] });
	} else {
		Object.assign(target, { [key]: source[key] });
	}
}

function mergeArray(target, source, key) {
	if (!target[key]) {
		Object.assign(target, { [key]: [] });
		source[key].forEach(function (element, i) {
			if (isObject(element))
				Object.assign(target[key], { [i]: {} });
			else if (Array.isArray(element))
				Object.assign(target[key], { [i]: [] });
			else if (typeof (element) === "string")
				Object.assign(target[key], { [i]: element });
		});
	}

	source[key].forEach(function (element, i) {
		if (typeof (element) !== "string")
			mergeDeep(target[key][i], element);
	});
}
export default mergeDeep;
