import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Kind } from '../../models/entity'

export function EntityKindIcon(props: { kind: Kind }) {
	return <Image source={getImageFromType(props.kind)} style={styles.icon} />
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

const styles = StyleSheet.create({
	icon: {
		alignSelf: 'center',
	},
})
