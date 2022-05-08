import React from 'react'
import { List, withTheme } from 'react-native-paper'
import { Describe } from 'wollok-ts/dist/model'
import {
	useNodeNavigation,
	withNodeNavigation,
} from '../../context/NodeNavigation'
import { Theme } from '../../theme'
import { stylesheet } from '../entities/Entity/styles'
import IconImage from '../ui/IconImage'
const icon = require('../../assets/describe.png')

type Props = {
	describe: Describe
	theme: Theme
}

// TODO: Merge with Entity component
function DescribeItem({ describe, theme }: Props) {
	const styles = stylesheet(theme)
	const { goToNode } = useNodeNavigation()
	const goToEntityDetails = () => goToNode(describe)

	return (
		<List.Item
			onPress={goToEntityDetails}
			key={describe.name}
			style={styles.item}
			titleStyle={styles.itemTitle}
			title={describe.name}
			left={() => <IconImage icon={icon} />}
		/>
	)
}

export default withTheme(withNodeNavigation(DescribeItem))
