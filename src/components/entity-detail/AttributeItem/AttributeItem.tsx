import React from 'react'
import { IconButton, List, withTheme } from 'react-native-paper'
import { Field, Problem } from 'wollok-ts/dist/model'
import { Theme } from '../../../theme'
import { ExpressionDisplay } from '../../expressions/ExpressionDisplay'
import { ATTRIBUTE_ICONS } from '../attribute-icons'
import styles from './styles'

function AttributeItem(props: {
	attribute: Field
	problem?: Problem
	theme: Theme
}) {
	const {
		attribute: { isProperty, isConstant, name, value },
		problem,
		theme,
	} = props

	const icons = [
		{
			toggle: isProperty,
			icon: ATTRIBUTE_ICONS.property.checked,
		},
		{
			toggle: isConstant,
			icon: ATTRIBUTE_ICONS.constant.checked,
		},
	]

	return (
		<List.Item
			title={name}
			left={() =>
				problem &&
				(problem.level === 'error' ? (
					<IconButton icon="alert-circle" color="red" />
				) : (
					<IconButton icon="alert" color="yellow" />
				))
			}
			description={() => value && <ExpressionDisplay expression={value} />}
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
