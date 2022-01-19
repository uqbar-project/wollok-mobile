import React from 'react'
import { List, withTheme } from 'react-native-paper'
import { Attribute } from '../../../models/attribute'
import { Theme } from '../../../theme'
import { ExpressionDisplay } from '../../expressions/ExpressionDisplay'
import { ATTRIBUTE_ICONS } from '../attribute-icons'
import styles from './styles'

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
				initialValue && <ExpressionDisplay expression={initialValue} />
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
