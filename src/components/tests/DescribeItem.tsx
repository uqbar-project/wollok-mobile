import React, { useState } from 'react'
import { withTheme } from 'react-native-paper'
import { Describe } from 'wollok-ts/dist/model'
import {
	useNodeNavigation,
	withNodeNavigation,
} from '../../context/NodeNavigation'
import { Theme } from '../../theme'
import { wTranslate } from '../../utils/translation/translation-helpers'
import { TextFormModal } from '../ui/FormModal/TextFormModal'
import IconImage from '../ui/IconImage'
import { NamedListItem } from '../ui/NamedListItem'
import { CommonOptionsDialog } from '../ui/Options/CommonOptionsDialog'
import { optionsTitleFromName } from '../ui/Options/OptionsDialog'
const icon = require('../../assets/describe.png')

type Props = {
	describe: Describe
	theme: Theme
}

// TODO: Merge with Entity component
function DescribeItem({ describe }: Props) {
	const { goToNode } = useNodeNavigation()
	const [showOptions, setShowOptions] = useState(false)
	const [showRename, setShowRename] = useState(false)
	const goToEntityDetails = () => goToNode(describe)

	function onDeleteDescribe() {}

	function onRenameDescribe() {}

	return (
		<>
			<NamedListItem
				onPress={goToEntityDetails}
				key={describe.name}
				namedItem={describe}
				left={() => <IconImage icon={icon} />}
			/>
			<CommonOptionsDialog
				title={optionsTitleFromName(describe.name)}
				visible={showOptions}
				dismiss={() => setShowOptions(false)}
				actions={{
					delete: onDeleteDescribe,
					rename: () => setShowRename(true),
				}}
			/>
			<TextFormModal
				title={wTranslate('abm.rename')}
				onSubmit={onRenameDescribe}
				setVisible={setShowRename}
				visible={showRename}
				currentText={describe.name}
			/>
		</>
	)
}

export default withTheme(withNodeNavigation(DescribeItem))
