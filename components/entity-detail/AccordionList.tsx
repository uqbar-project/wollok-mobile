import React from 'react'
import { View } from 'react-native'
import { Divider, List, withTheme } from 'react-native-paper'
import { Theme } from '../../theme'

type Props = {
	title: string
	items: { description: string }[]
	theme: Theme
}
const AccordionList = (props: Props) => {
	const dividerStyle = {
		marginHorizontal: 10,
		backgroundColor: props.theme.colors.card,
	}

	return (
		<List.Accordion title={props.title}>
			{props.items.map(a => {
				return (
					<View key={a.description}>
						<List.Item title={a.description} />
						<Divider style={dividerStyle} />
					</View>
				)
			})}
		</List.Accordion>
	)
}

export default withTheme(AccordionList)
