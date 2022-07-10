// LIST
export function last<T>(someList: T[]): T | undefined {
	return someList[someList.length - 1]
}

export function replace<T>(item: T, newItem: T) {
	return (current: T) => (current === item ? newItem : current)
}

// ASYNC
/** This function's goal is to not block animations, however it blocks the thread */
export function runAsync(f: () => void) {
	setTimeout(f, 0)
}

// LOG
export function log(obj: any) {
	console.log(JSON.stringify(obj, undefined, 2))
}

export function sortWithoutEffect<T>(
	array: ReadonlyArray<T>,
	sortBy: (a: T, b: T) => number,
) {
	const aux = [...array]
	return aux.sort(sortBy)
}

export function localCompareByProperty<T extends { [key: string]: any }>(
	property: keyof T,
) {
	return function (a: T, b: T) {
		return b[property].localeCompare(a[property])
	}
}
