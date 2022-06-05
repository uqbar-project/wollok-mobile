import React, { createContext, useEffect, useState } from 'react'
import {
	DirectedInterpreter,
	ExecutionDirector,
	ExecutionState,
} from 'wollok-ts/dist/interpreter/interpreter'
import { ParentComponentProp } from '../utils/type-helpers'
import { CodeContainer } from '../utils/wollok-helpers'
import { createContextHook } from './create-context-hook'
import { useProject } from './ProjectProvider'

export const ExecutionContext = createContext<{
	interpreter: DirectedInterpreter
	execution: ExecutionDirector<void>
	state: ExecutionState<void>
	actions: { updateState: (newState: ExecutionState<void>) => void }
} | null>(null)

export function ExecutionContextProvider(
	props: ParentComponentProp<{
		container: CodeContainer
	}>,
) {
	const { container, children } = props
	const {
		project,
		actions: { newInterpreter },
	} = useProject()
	const [interpreter, setInterpreter] = useState<DirectedInterpreter>(
		null as any,
	)
	const [execution, setExecution] = useState<ExecutionDirector<void>>(
		null as any,
	)
	const [state, setState] = useState<ExecutionState<void>>(null as any)

	// Manipulate the interpreter has side effect.
	// This component has states, so it can be re-redered
	// we need to perform this only once
	useEffect(() => {
		const interpreter = newInterpreter()
		const executionDirector = interpreter.exec(container)
		const baseState = executionDirector.resume(n => n === container.body)
		setInterpreter(interpreter)
		setExecution(executionDirector)
		setState(baseState)
	}, [container, newInterpreter, project])

	function updateState(newState: ExecutionState<void>) {
		setInterpreter(interpreter)
		setExecution(execution)
		setState(newState)
	}

	if (state == null) {
		return null
	}

	const initialContext = {
		interpreter,
		execution,
		state,
		actions: { updateState },
	}

	return (
		<ExecutionContext.Provider value={initialContext}>
			{children}
		</ExecutionContext.Provider>
	)
}

export const useExecutionContext = createContextHook(ExecutionContext, {
	contextName: 'ExecutionContextProvider',
	hookName: 'useExecutionContext',
})
