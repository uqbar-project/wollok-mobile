import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import { I18nManager } from 'react-native'
import * as RNLocalize from 'react-native-localize'
import { InternationalDictionary } from './translation-types'

const translationGetters: { [locale: string]: any } = {
	// lazy requires (metro bundler does not support symlinks)
	es: () => require('../../../translations/es.json'),
	en: () => require('../../../translations/en.json'),
}

export const wTranslate =
	memoize<(key: InternationalDictionary, config?: i18n.TranslateOptions) => string>( // prettier-ignore
		(key, config) => i18n.t(key, config),
		(key, config) => (config ? key + JSON.stringify(config) : key),
	)

export function setI18nConfig() {
	// fallback if no available language fits
	const fallback = { languageTag: 'en', isRTL: false }

	const { languageTag, isRTL } =
		RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
		fallback

	// clear translation cache
	wTranslate.cache.clear!()
	// update layout direction
	I18nManager.forceRTL(isRTL)
	// set i18n-js config
	i18n.translations = { [languageTag]: translationGetters[languageTag]() }
	i18n.locale = languageTag
}
