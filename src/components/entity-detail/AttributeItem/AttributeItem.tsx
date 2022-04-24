import React from 'react'
import { List, withTheme } from 'react-native-paper'
import { Field } from 'wollok-ts/dist/model'
import { Theme } from '../../../theme'
import { ExpressionDisplay } from '../../expressions/ExpressionDisplay'
import { ProblemReporterButton } from '../../problems/ProblemReporterButton'
import { ATTRIBUTE_ICONS } from '../attribute-icons'
import styles from './styles'

function AttributeItem(props: { attribute: Field; theme: Theme }) {
	const { attribute, theme } = props

	const { isProperty, isConstant, name, value } = attribute

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
			left={() => <ProblemReporterButton node={attribute} />}
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
