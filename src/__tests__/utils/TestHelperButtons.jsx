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

    function nextBody() {
        execution.resume(is('Body'))
        updateState(execution.stepOver())
    }

    function nextNative() {
        updateState(execution.resume(n => n.is('Method') && n.isNative()))
    }

    return (<>
        <Button testID="FINISH" onPress={finish}>
            FINISH
        </Button>

        <Button testID="NEXT FRAME" onPress={nextBody}>
            NEXT FRAME
        </Button>

        <Button testID="NATIVE" onPress={nextNative}>
        NATIVE
        </Button>
    </>)
}