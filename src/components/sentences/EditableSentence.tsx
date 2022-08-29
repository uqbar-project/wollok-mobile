import { Sentence } from 'wollok-ts/dist/model'
import { GestureResponderHandlers, StyleSheet, View } from 'react-native'
import { ReadonlySentence } from './VisualSentence'
import { IconButton } from 'react-native-paper'
import React, { ComponentProps, FC, useState } from 'react'
import { CommonOptionsDialog } from '../ui/Options/CommonOptionsDialog'
import { wTranslate } from '../../utils/translation/translation-helpers'
import { TouchableOpacity } from 'react-native-gesture-handler'

type EditableSentenceProps = {
	sentence: Sentence
	panHandlers: GestureResponderHandlers
	hidden: boolean
	onLayout: ComponentProps<typeof View>['onLayout']
	onDelete: () => void
}

export const EditableSentence: FC<EditableSentenceProps> = ({
	sentence,
	panHandlers,
	hidden,
	onLayout,
	onDelete,
}) => {
	const [showOptions, setShowOptions] = useState(false)

	return (
		<View
			onLayout={onLayout}
			style={[
				styles.sentenceRow,
				// eslint-disable-next-line react-native/no-inline-styles
				{
					opacity: hidden ? 0 : 1,
				},
			]}>
			<TouchableOpacity
				style={styles.sentenceItem}
				onLongPress={() => setShowOptions(true)}>
				<ReadonlySentence style={styles.sentence} sentence={sentence} />

				<CommonOptionsDialog
					visible={showOptions}
					dismiss={() => setShowOptions(false)}
					title={wTranslate('abm.options', {
						name: wTranslate('sentence.sentence'),
					})}
					actions={{
						delete: onDelete,
					}}
				/>
			</TouchableOpacity>
			<View {...panHandlers}>
				<IconButton icon="drag-vertical" color="#fff" />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	sentenceItem: { minWidth: '90%', maxWidth: '90%' },
	sentence: { width: '100%' },
	sentenceRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: 80,
		padding: 16,
		backgroundColor: '#404040',
	},
})
