import React from 'react'
import { View } from 'react-native'
import { Text, ToggleButton } from 'react-native-paper'
import { Kind } from 'wollok-ts/dist/model'
import { wTranslate } from '../../../utils/translation-helpers'
import { stylesheet } from './styles'

type VisualKind = { kind: Kind; description: string }

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
			{entityKinds.map((aKind: VisualKind) => {
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

function translateDescription(kind: VisualKind): VisualKind {
	return {
		...kind,
		description: wTranslate(kind.description, {
			scope: 'entities.kinds',
		}).toUpperCase(),
	}
}

const entityKinds: VisualKind[] = [
	{ kind: 'Singleton' as Kind, description: 'object' },
	{ kind: 'Class' as Kind, description: 'class' },
	{ kind: 'Mixin' as Kind, description: 'mixin' },
].map(translateDescription)
