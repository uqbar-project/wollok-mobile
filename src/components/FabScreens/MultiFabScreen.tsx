import React, { useState } from 'react'
import { FAB, Portal, Provider, withTheme } from 'react-native-paper'
import { Theme } from '../../theme'
import { ParentComponentProp } from '../../utils/type-helpers'

type Action = React.ComponentProps<typeof FAB.Group>['actions'][number]

function MultiFabScreen(
	props: ParentComponentProp<{
		theme: Theme
		actions: Action[]
	}>,
) {
	const [open, setOpen] = useState(false)
	const theme = props.theme

	return (
		<Provider theme={theme}>
			<Portal>
				{props.children}
				<FAB.Group
					icon="plus"
					fabStyle={{ backgroundColor: theme.colors.primary }}
					actions={props.actions.map(addStyleToAction)}
					open={open}
					visible={true}
					onStateChange={({ open: newOpenState }) => setOpen(newOpenState)}
				/>
			</Portal>
		</Provider>
	)

	function addStyleToAction(action: Action): Action {
		return {
			...action,
			style: {
				backgroundColor: theme.colors.primary,
			},
		}
	}
}

export default withTheme(MultiFabScreen)
