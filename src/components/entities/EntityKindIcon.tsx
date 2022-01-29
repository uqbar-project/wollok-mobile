import React from 'react'
import { Kind } from 'wollok-ts/dist/model'
import IconImage from '../ui/IconImage'

export function EntityKindIcon(props: { kind: Kind }) {
	return <IconImage icon={getImageFromType(props.kind)} />
}

function getImageFromType(aKind: Kind) {
	switch (aKind) {
		case 'Class':
			return require('../../assets/class.png')
		case 'Singleton':
			return require('../../assets/wko.png')
		case 'Mixin':
			return require('../../assets/mixin.png')
	}
}
