import React from 'react'
import {
	Animated,
	FlatList,
	PanResponder,
	PanResponderInstance,
	StyleSheet,
	View,
} from 'react-native'
import { IconButton } from 'react-native-paper'
import { List } from 'wollok-ts/dist/extensions'
import { Sentence } from 'wollok-ts/dist/model'
import { ReadonlySentence } from './VisualSentence'

type SentencesViewProps = {
	sentences: List<Sentence>
	onSentencesChanged: (sentences: List<Sentence>) => void
}

// function SentencesEditor({ sentences }: SentencesViewProps) {
// 	return (
// 		<DraggableFlatList<Sentence>
// 			data={[...sentences]}
// 			renderItem={({ item, drag }) => (
// 				<DraggableSentence drag={drag} sentence={item} />
// 			)}
// 			keyExtractor={(_, index) => index.toString()}
// 		/>
// 	)
// }

// const styles = StyleSheet.create({
// 	sentences: {
// 		paddingLeft: 15,
// 		marginBottom: 15,
// 	},
// })

class SentencesEditorDrag extends React.Component<SentencesViewProps> {
	state
	_panResponder: PanResponderInstance
	point = new Animated.ValueXY()
	currentY = 0
	scrollOffset = 0
	flatlistTopOffset = 0
	rowHeight = 0
	currentIdx = -1
	active = false

	get offsetY() {
		return this.currentY - this.flatlistTopOffset
	}

	constructor(props: SentencesViewProps) {
		super(props)

		this.state = {
			dragging: false,
			draggingIdx: -1,
			data: [...props.sentences],
		}

		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (_evt, _gestureState) => true,
			onStartShouldSetPanResponderCapture: (_evt, _gestureState) => true,
			onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
			onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,

			onPanResponderGrant: (_evt, gestureState) => {
				// The gesture has started. Show visual feedback so the user knows
				// what is happening!
				// gestureState.d{x,y} will be set to zero now
				this.currentY = gestureState.y0 - this.rowHeight / 2
				this.currentIdx = this.yToIndex(this.offsetY)
				Animated.event([{ y: this.point.y }], { useNativeDriver: false })({
					y: this.currentY,
				})
				this.active = true
				this.setState({ dragging: true, draggingIdx: this.currentIdx }, () => {
					this.animateList()
				})
			},
			onPanResponderMove: (_evt, gestureState) => {
				this.currentY = gestureState.moveY - this.rowHeight / 2
				Animated.event([{ y: this.point.y }], { useNativeDriver: false })({
					y: gestureState.moveY - this.rowHeight / 2,
				})
				// The most recent move distance is gestureState.move{X,Y}
				// The accumulated gesture distance since becoming responder is
				// gestureState.d{x,y}
			},
			onPanResponderTerminationRequest: (_evt, _gestureState) => false,
			onPanResponderRelease: (_evt, _gestureState) => {
				// The user has released all touches while this view is the
				// responder. This typically means a gesture has succeeded
				this.reset()
				this.props.onSentencesChanged(this.state.data)
			},
			onPanResponderTerminate: (_evt, _gestureState) => {
				// Another component has become the responder, so this gesture
				// should be cancelled
				this.reset()
			},
			onShouldBlockNativeResponder: (_evt, _gestureState) => {
				// Returns whether this component should block native components from becoming the JS
				// responder. Returns true by default. Is currently only supported on android.
				return true
			},
		})
	}

	animateList = () => {
		if (!this.active) {
			return
		}

		requestAnimationFrame(() => {
			// check y value see if we need to reorder
			const newIdx = this.yToIndex(this.offsetY)
			if (this.currentIdx !== newIdx) {
				this.setState({
					data: immutableMove(this.state.data, this.currentIdx, newIdx),
					draggingIdx: newIdx,
				})
				this.currentIdx = newIdx
			}

			this.animateList()
		})
	}

	yToIndex = (y: number) => {
		const value = Math.floor((this.scrollOffset + y) / this.rowHeight)

		if (value < 0) {
			return 0
		}

		if (value > this.state.data.length - 1) {
			return this.state.data.length - 1
		}

		return value
	}

	reset = () => {
		this.active = false
		this.setState({ dragging: false, draggingIdx: -1 })
	}

	render() {
		const { data, dragging, draggingIdx } = this.state

		const renderItem = (
			{ item, index }: { item: Sentence; index: number },
			noPanResponder = false,
		) => (
			<View
				onLayout={e => {
					this.rowHeight = e.nativeEvent.layout.height
				}}
				style={[
					styles.sentenceRow,
					// eslint-disable-next-line react-native/no-inline-styles
					{
						opacity: draggingIdx === index ? 0 : 1,
					},
				]}>
				<ReadonlySentence style={styles.sentenceItem} sentence={item} />
				<View {...(noPanResponder ? {} : this._panResponder.panHandlers)}>
					<IconButton icon="drag-vertical" color="#fff" />
				</View>
			</View>
		)

		return (
			<View style={styles.container}>
				{dragging && (
					<Animated.View
						style={[
							styles.floatingListItem,
							{
								top: this.point.getLayout().top,
							},
						]}>
						{renderItem({ item: data[draggingIdx], index: -1 }, true)}
					</Animated.View>
				)}
				<FlatList
					scrollEnabled={!dragging}
					style={styles.list}
					data={data}
					renderItem={renderItem}
					onScroll={e => {
						this.scrollOffset = e.nativeEvent.contentOffset.y
					}}
					onLayout={e => {
						// hardcoding height due to layout being wrong (0 instead of 90)
						this.point.setOffset({ x: 0, y: -90 })
						this.flatlistTopOffset = e.nativeEvent.layout.y + 90
					}}
					scrollEventThrottle={16}
					keyExtractor={item => '' + item.id}
				/>
			</View>
		)
	}
}

function immutableMove<T extends any[]>(arr: T, from: number, to: number): T {
	return arr.reduce((prev, current, idx, self) => {
		if (from === to) {
			prev.push(current)
		}
		if (idx === from) {
			return prev
		}
		if (from < to) {
			prev.push(current)
		}
		if (idx === to) {
			prev.push(self[from])
		}
		if (from > to) {
			prev.push(current)
		}
		return prev
	}, [])
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	sentenceRow: {
		height: 80,
		padding: 16,
		backgroundColor: '#404040',
		flexDirection: 'row',
	},
	sentenceItem: { width: '90%' },
	list: { width: '100%', backgroundColor: '#696969' },
	floatingListItem: {
		position: 'absolute',
		backgroundColor: 'black',
		zIndex: 2,
		width: '100%',
	},
})

export default SentencesEditorDrag
