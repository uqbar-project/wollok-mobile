import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { List } from 'wollok-ts/dist/extensions'
import { Node, Sentence } from 'wollok-ts/dist/model'
import VisualSentence from './VisualSentence'

type SentencesViewProps = {
	sentences: List<Sentence>
	highlightedNode?: Node
}
function SentencesView({ sentences, highlightedNode }: SentencesViewProps) {
	return (
		<ScrollView style={styles.sentences}>
			{sentences.map((sentence, i) => (
				<VisualSentence
					key={i}
					sentence={sentence}
					highlightedNode={highlightedNode}
				/>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	sentences: {
		paddingLeft: 15,
		marginBottom: 15,
	},
})

export default SentencesView
