import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { List } from 'react-native-paper'
import { Method } from 'wollok-ts/dist/model'
import { useProject } from '../../context/ProjectProvider'
import { EditorScreenNavigationProp } from '../../pages/Editor'
import { wTranslate } from '../../utils/translation/translation-helpers'
import { methodFQN, methodLabel } from '../../utils/wollok-helpers'
import { ProblemReporterButton } from '../problems/ProblemReporterButton'
import { CommonOptionsDialog } from '../ui/Options/CommonOptionsDialog'
import { optionsTitleFromName } from '../ui/Options/OptionsDialog'
import MethodFormModal from './new-method-modal/MethodFormModal'

export function MethodItem({ item: method }: { item: Method }) {
	const navigator = useNavigation<EditorScreenNavigationProp>()

	const {
		actions: { changeMember, deleteMember },
	} = useProject()

	const [isOptionsVisible, setOptionsDialogVisible] = useState(false)

	const [methodModalVisible, setMethodModalVisible] = useState(false)

	function gotoMethod() {
		navigator.navigate('Editor', {
			fqn: methodFQN(method),
		})
	}

	function onDelete() {
		deleteMember(method)
	}

	function onEdit(newMethod: Method) {
		changeMember(method.parent)(method, newMethod)
	}

	return (
		<>
			<List.Item
				key={method.name}
				title={methodLabel(method)}
				left={() => <ProblemReporterButton node={method} />}
				onPress={gotoMethod}
				onLongPress={() => setOptionsDialogVisible(true)}
			/>
			<CommonOptionsDialog
				title={optionsTitleFromName(method.name)}
				actions={{ delete: onDelete, edit: () => setMethodModalVisible(true) }}
				visible={isOptionsVisible}
				dismiss={() => setOptionsDialogVisible(false)}
			/>
			<MethodFormModal
				title={wTranslate('abm.editing')}
				initialMethod={method}
				visible={methodModalVisible}
				onSubmit={onEdit}
				setVisible={setMethodModalVisible}
			/>
		</>
	)
}
