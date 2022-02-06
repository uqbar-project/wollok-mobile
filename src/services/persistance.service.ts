import {
	DocumentDirectoryPath,
	readDir,
	readFile,
	writeFile,
} from 'react-native-fs'
import { Environment, fromJSON } from 'wollok-ts/dist/model'

export function saveProject(
	projectName: string,
	project: Environment,
): Promise<void> {
	return writeFile(projectFile(projectName), projectToJSON(project), 'utf8')
}

export async function loadProject(projectName: string): Promise<Environment> {
	const content = await readFile(projectFile(projectName))
	const fromJson = fromJSON<Environment>(JSON.parse(content))
	return fromJson
}

export async function savedProjects(): Promise<string[]> {
	const files = await readDir(DocumentDirectoryPath)
	return files.map(item => item.name.replace('.json', ''))
}

function projectToJSON(wre: Environment) {
	return JSON.stringify(
		wre,
		(key, value) => (key.startsWith('_') ? undefined : value),
		2,
	)
}

function projectFile(projectName: string): string {
	return `${DocumentDirectoryPath}/${projectName}.json`
}
