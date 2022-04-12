import React from 'react'
import { Text } from 'react-native-paper'
import { Sentence } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../../utils/translation-helpers'
import { Row } from '../../Row'
import { Assignment } from './Assignment'
import { Return } from './Return'
import { Send } from './Send'
import { Variable } from './Variable'
export function getVisualSentence(
	sentence: Sentence,
	index: number,
): JSX.Element {
	switch (sentence.kind) {
		case 'Send':
			return <Send send={sentence} key={index} />
		case 'Assignment':
			return <Assignment assignment={sentence} key={index} />
		case 'Return':
			return <Return returnSentence={sentence} key={index} />
		case 'Variable':
			return <Variable variable={sentence} key={index} />
		default:
			return (
				<Row key={index}>
					<Text>{`${wTranslate('sentence.unsupportedSentence')}: ${
						sentence.kind
					}`}</Text>
				</Row>
			)
	}
}
