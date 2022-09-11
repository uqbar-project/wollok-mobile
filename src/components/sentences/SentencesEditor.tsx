import React from 'react'
import {
	Animated,
	FlatList,
	PanResponder,
	PanResponderInstance,
	StyleSheet,
	View,
} from 'react-native'
import { List } from 'wollok-ts/dist/extensions'
import { Sentence } from 'wollok-ts/dist/model'
import { EditableSentence } from './EditableSentence'

type SentencesViewProps = {
	sentences: List<Sentence>
	onSentencesChanged: (sentences: List<Sentence>) => void
}

type SentencesViewState = {
	dragging: boolean
	draggingIdx: number
	sentences: Sentence[]
}

class SentencesEditorDrag extends React.Component<
	SentencesViewProps,
	SentencesViewState
> {
	state: SentencesViewState
	_panResponder: PanResponderInstance
	point = new Animated.ValueXY()
	currentY = 0
	scrollOffset = 0
	flatlistTopOffset = 0
	rowHeight = 0
	currentIdx = -1
	active = false
	private myFlatListView: View | null

	get offsetY() {
		return this.currentY - this.flatlistTopOffset
	}

	constructor(props: SentencesViewProps) {
		super(props)

		this.myFlatListView = null

		this.state = {
			dragging: false,
			draggingIdx: -1,
			sentences: [...props.sentences],
		}

		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (_evt, _gestureState) => true,
			onStartShouldSetPanResponderCapture: (_evt, _gestureState) => true,
			onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
			onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => true,

			onPanResponderGrant: (_evt, gestureState) => {
				// The gesture has started.
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
				// The most recent move
				this.currentY = gestureState.moveY - this.rowHeight / 2
				Animated.event([{ y: this.point.y }], { useNativeDriver: false })({
					y: gestureState.moveY - this.rowHeight / 2,
				})
			},
			onPanResponderTerminationRequest: (_evt, _gestureState) => false,
			onPanResponderRelease: (_evt, _gestureState) => {
				// The user has released all touches while this view is the responder. This typically means a gesture has succeeded
				this.reset()
				this.props.onSentencesChanged(this.state.sentences)
			},
			onPanResponderTerminate: (_evt, _gestureState) => {
				// Another component has become the responder, so this gesture should be cancelled
				this.reset()
			},
			onShouldBlockNativeResponder: (_evt, _gestureState) => {
				return true
			},
		})
	}

	removeSentence = (index: number) => {
		const newSentences = [...this.state.sentences]
		newSentences.splice(index, 1)
		this.props.onSentencesChanged(newSentences)
	}

	componentDidUpdate(prevProps: Readonly<SentencesViewProps>) {
		if (prevProps.sentences !== this.props.sentences) {
			// eslint-disable-next-line react/no-did-update-set-state
			this.setState({ sentences: [...this.props.sentences] })
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.myFlatListView?.measure((_fx, _fy, _width, _height, _px, pageY) => {
				this.flatlistTopOffset = pageY
				this.point.setOffset({ x: 0, y: -pageY })
			})
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
					sentences: immutableMove(
						this.state.sentences,
						this.currentIdx,
						newIdx,
					),
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

		if (value > this.state.sentences.length - 1) {
			return this.state.sentences.length - 1
		}

		return value
	}

	reset = () => {
		this.active = false
		this.setState({ dragging: false, draggingIdx: -1 })
	}

	render() {
		const { sentences, dragging, draggingIdx } = this.state

		const renderItem = (
			{ item, index }: { item: Sentence; index: number },
			noPanResponder = false,
		) => (
			<EditableSentence
				sentence={item}
				panHandlers={noPanResponder ? {} : this._panResponder.panHandlers}
				hidden={draggingIdx === index}
				onDelete={() => this.removeSentence(index)}
				onLayout={e => {
					this.rowHeight = e.nativeEvent.layout.height
				}}
			/>
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
						{renderItem({ item: sentences[draggingIdx], index: -1 }, true)}
					</Animated.View>
				)}
				<View
					style={styles.list}
					collapsable={false}
					ref={ref => {
						this.myFlatListView = ref
					}}>
					<FlatList
						scrollEnabled={!dragging}
						style={styles.list}
						data={sentences}
						renderItem={renderItem}
						onScroll={e => {
							this.scrollOffset = e.nativeEvent.contentOffset.y
						}}
						collapsable={false}
						scrollEventThrottle={16}
						keyExtractor={(_item, index) => '' + index}
					/>
				</View>
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
	list: { width: '100%', backgroundColor: '#696969', height: '100%' },
	floatingListItem: {
		position: 'absolute',
		backgroundColor: 'black',
		zIndex: 2,
		width: '100%',
	},
})

export default SentencesEditorDrag
