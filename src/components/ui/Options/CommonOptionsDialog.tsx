import React from 'react'
import { wTranslate } from '../../../utils/translation/translation-helpers'
import { PartialRecord } from '../../../utils/type-helpers'
import { Option, OptionsDialog } from './OptionsDialog'

type CommonOptionsDialogProps = Omit<
	Parameters<typeof OptionsDialog>[0],
	'options'
> & { actions: PartialRecord<typeof commonOptions[number], () => void> }

const commonOptions = ['rename', 'edit', 'delete'] as const

export const CommonOptionsDialog = ({
	actions,
	...rest
}: CommonOptionsDialogProps) => {
	const options: Option[] = []
	commonOptions.forEach(option => {
		if (actions[option]) {
			options.push({
				title: wTranslate(`abm.${option}`),
				action: actions[option]!,
			})
		}
	})

	return <OptionsDialog {...rest} options={options} />
}
