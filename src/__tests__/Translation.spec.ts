import { readdirSync } from 'fs'
import { resolve } from 'path'
import { dictionary } from './../utils/translation/translation-types'

describe('translation files', () => {
	it('should contain all translations', async () => {
		await Promise.all(
			readdirSync(resolve('translations')).map(async file => {
				const dic = await import('../../translations/' + file)
				dictionary.forEach(key => {
					expect(
						getByPath(key, dic),
						// eslint-disable-next-line jest/valid-expect
						`Couldn't find the translation for ${key} in the ${file
							.split('.')[0]
							.toUpperCase()} translation`,
					).toBeDefined()
				})
			}),
		)
	})
})

function getByPath(path: string, obj: any) {
	return path
		.split('.')
		.reduce((prev, curr) => (prev ? prev[curr] : undefined), obj)
}
