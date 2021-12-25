export type AttributeIcon = {
	checked: string
	unchecked: string
}

export const ATTRIBUTE_ICONS: Record<'constant' | 'property', AttributeIcon> = {
	constant: {
		checked: 'lock',
		unchecked: 'lock-open-outline',
	},
	property: {
		checked: 'swap-horizontal-circle',
		unchecked: 'swap-horizontal-circle-outline',
	},
}
