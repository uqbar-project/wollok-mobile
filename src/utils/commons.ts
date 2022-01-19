export function last<T>(someList: T[]): T | undefined {
	return someList[someList.length - 1]
}
