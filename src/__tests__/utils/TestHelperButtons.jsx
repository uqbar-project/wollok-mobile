import React from 'react'
import { Button } from 'react-native-paper'
import { is } from 'wollok-ts'
import { useExecutionContext } from '../../context/ExecutionContextProvider'

export function TestHelperButtons() {
    const {
        execution,
        actions: { updateState },
    } = useExecutionContext()

    function finish() {
        updateState(execution.finish())
    }

    function stepToNextBody() {
        execution.resume(is('Body'))
        updateState(execution.stepOver())
    }

    return (<>
        <Button testID="FINISH" onPress={finish}>
            FINISH
        </Button>

        <Button testID="NEXT FRAME" onPress={stepToNextBody}>
            NEXT FRAME
        </Button>
    </>)
}