import React, { useState } from 'react'
import { List, withTheme } from 'react-native-paper'
import { Field } from 'wollok-ts/dist/model'
import { useProject } from '../../../context/ProjectProvider'
import { Theme } from '../../../theme'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import { ExpressionDisplay } from '../../expressions/ExpressionDisplay'
import { ProblemReporterButton } from '../../problems/ProblemReporterButton'
import { CommonOptionsDialog } from '../../ui/Options/CommonOptionsDialog'
import { optionsTitleFromName } from '../../ui/Options/OptionsDialog'
import { ATTRIBUTE_ICONS } from '../attribute-icons'
import AttributeFormModal from '../new-attribute-modal/AttributeFormModal'
import styles from './styles'

function AttributeItem(props: { attribute: Field; theme: Theme }) {
	const { attribute, theme } = props
	const {
		actions: { changeMember, deleteMember },
	} = useProject()

	const { isProperty, isConstant, name, value } = attribute

	const [isEditing, setEditing] = useState(false)
	const [isOptionsShowing, setOptionsShowing] = useState(false)

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

	function onDelete() {
		deleteMember(attribute)
	}

	function onEdit(newAttribute: Field) {
		changeMember(attribute.parent)(attribute, newAttribute)
	}

	return (
		<>
			<List.Item
				title={name}
				onPress={() => setEditing(true)}
				onLongPress={() => setOptionsShowing(true)}
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
			<CommonOptionsDialog
				visible={isOptionsShowing}
				title={optionsTitleFromName(attribute.name)}
				dismiss={() => setOptionsShowing(false)}
				actions={{ delete: onDelete }}
			/>
			<AttributeFormModal
				title={wTranslate('abm.editing')}
				initialAttribute={attribute}
				onSubmit={onEdit}
				visible={isEditing}
				setVisible={setEditing}
				contextFQN={attribute.parent.fullyQualifiedName()}
			/>
		</>
	)
}

export default withTheme(AttributeItem)
