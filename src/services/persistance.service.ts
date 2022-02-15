import {
	DocumentDirectoryPath,
	readDir,
	ReadDirItem,
	readFile,
	writeFile,
} from 'react-native-fs'
import { Environment, fromJSON } from 'wollok-ts/dist/model'

export function saveProject(
	projectName: string,
	project: Environment,
): Promise<void> {
	return writeFile(projectFilePath(projectName), projectToJSON(project), 'utf8')
}

export async function loadProject(projectName: string): Promise<Environment> {
	const content = await readFile(projectFilePath(projectName))
	const fromJson = fromJSON<Environment>(JSON.parse(content))
	return fromJson
}

export async function savedProjects(): Promise<string[]> {
	function getFileDateValue(file: ReadDirItem) {
		return file.mtime?.valueOf() || 0
	}
	const files = await readDir(DocumentDirectoryPath)
	return files
		.sort((a, b) => getFileDateValue(b) - getFileDateValue(a))
		.map(item => item.name.replace('.json', ''))
}

function projectToJSON(wre: Environment) {
	return JSON.stringify(
		wre,
		(key, value) => (key.startsWith('_') ? undefined : value),
		2,
	)
}

function projectFilePath(projectName: string): string {
	return `${DocumentDirectoryPath}/${projectName}.json`
}
