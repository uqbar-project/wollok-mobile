import RNFetchBlob from 'react-native-fetch-blob'
import {
	DocumentDirectoryPath,
	readDir,
	ReadDirItem,
	writeFile,
} from 'react-native-fs'
import { Environment, fromJSON } from 'wollok-ts/dist/model'
import { projectToJSON } from '../utils/wollok-helpers'

export function saveProject(projectName: string, project: Environment) {
	return new Promise(async resolve => {
		const path = projectFilePath(projectName)
		await writeFile(path, '')
		RNFetchBlob.fs.writeStream(path, 'utf8').then(stream => {
			resolve(stream.write(projectToJSON(project)))
		})
	})
}

export async function loadProject(projectName: string): Promise<Environment> {
	return new Promise(resolve => {
		RNFetchBlob.fs
			.readStream(projectFilePath(projectName), 'utf8', 4096, -1)
			.then(stream => {
				let content = ''
				stream.open()
				stream.onData(chunk => {
					content += chunk
				})
				stream.onEnd(() => resolve(fromJSON<Environment>(JSON.parse(content))))
			})
	})
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

function projectFilePath(projectName: string): string {
	return `${DocumentDirectoryPath}/${projectName}.json`
}
