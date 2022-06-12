import React from 'react'
import { View } from 'react-native'
import { Text, ToggleButton } from 'react-native-paper'
import { Kind } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import { stylesheet } from './styles'

export function SelectKind(props: {
	kind: Kind
	setKind: (value: Kind) => void
}) {
	function toggleButtonColorByKind(aKind: Kind) {
		return props.kind === aKind ? 'grey' : undefined
	}

	return (
		<ToggleButton.Row
			style={stylesheet.toggleButtonRow}
			onValueChange={value => props.setKind(value as Kind)}
			value={props.kind}>
			{entityKinds.map(aKind => {
				return (
					<ToggleButton
						key={aKind.kind}
						style={[
							stylesheet.toggleButton,
							{ backgroundColor: toggleButtonColorByKind(aKind.kind) },
						]}
						icon={() => (
							<View>
								<Text>{aKind.description}</Text>
							</View>
						)}
						value={aKind.kind}
					/>
				)
			})}
		</ToggleButton.Row>
	)
}

function translateDescription(kind: typeof kinds[number]): {
	kind: Kind
	description: string
} {
	return {
		...kind,
		description: wTranslate(`entities.kinds.${kind.description}`).toUpperCase(),
	}
}

const kinds = [
	{ kind: 'Singleton' as Kind, description: 'object' },
	{ kind: 'Class' as Kind, description: 'class' },
	{ kind: 'Mixin' as Kind, description: 'mixin' },
] as const

const entityKinds = kinds.map(translateDescription)
