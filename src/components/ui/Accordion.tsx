import React, { ComponentProps, useState } from 'react'
import { List, List as ListComponent } from 'react-native-paper'

type AccordionProps = ComponentProps<typeof List.Accordion> & {
	initialExpanded?: boolean
}

function Accordion({ initialExpanded, ...props }: AccordionProps) {
	const [expanded, setExpanded] = useState(initialExpanded || false)

	return (
		<ListComponent.Accordion
			expanded={expanded}
			onPress={() => switchExpanded()}
			{...props}
		/>
	)

	function switchExpanded() {
		setExpanded(!expanded)
	}
}

export default Accordion
