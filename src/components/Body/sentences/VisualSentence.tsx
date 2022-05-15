import React from 'react'
import { Text } from 'react-native-paper'
import { Sentence } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import { Row } from '../../ui/Row'
import { Assignment } from './Assignment'
import { Return } from './Return'
import { Send } from './Send'
import { Variable } from './Variable'

export function VisualSentence({ sentence }: { sentence: Sentence }) {
	switch (sentence.kind) {
		case 'Send':
			return <Send send={sentence} />
		case 'Assignment':
			return <Assignment assignment={sentence} />
		case 'Return':
			return <Return returnSentence={sentence} />
		case 'Variable':
			return <Variable variable={sentence} />
		default:
			return (
				<Row>
					<Text>{`${wTranslate('sentence.unsupportedSentence')}: ${
						sentence.kind
					}`}</Text>
				</Row>
			)
	}
}
