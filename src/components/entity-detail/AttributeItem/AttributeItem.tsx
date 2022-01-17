import React from 'react'
import { View } from 'react-native'
import styles from './styles'
import { List, withTheme } from 'react-native-paper'
import { Attribute } from '../../../models/attribute'
import { Theme } from '../../../theme'
import { ExpressionDisplay } from '../../expressions/ExpressionDisplay'
import { ATTRIBUTE_ICONS } from '../attribute-icons'

function AttributeItem(props: { attribute: Attribute; theme: Theme }) {
	const {
		attribute: { property, constant, description, initialValue },
		theme,
	} = props

	const icons = [
		{
			toggle: property,
			icon: ATTRIBUTE_ICONS.property.checked,
		},
		{
			toggle: constant,
			icon: ATTRIBUTE_ICONS.constant.checked,
		},
	]

	return (
		<List.Item
			title={description}
			description={() =>
				initialValue && (
					<View style={styles.expressionItemDescription}>
						<List.Icon style={styles.iconExpression} icon="chevron-right" />
						<ExpressionDisplay expression={initialValue} />
					</View>
				)
			}
			right={() =>
				icons
					.filter(i => i.toggle)
					.map((icon, i) => (
						<List.Icon
							key={i}
							icon={icon.icon}
							color={theme.colors.text}
							style={styles.lockIcon}
						/>
					))
			}
		/>
	)
}

export default withTheme(AttributeItem)
