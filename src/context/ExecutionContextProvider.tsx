import React, { createContext, useEffect, useState } from 'react'
import { InnerValue, RuntimeValue } from 'wollok-ts'
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
	eval: { toStringOf: (obj: RuntimeValue) => InnerValue }
} | null>(null)

export function ExecutionContextProvider(
	props: ParentComponentProp<{
		container: CodeContainer
	}>,
) {
	const { container, children } = props
	const {
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
		const instancedInterpreter = newInterpreter()
		const executionDirector = instancedInterpreter.exec(container)
		executionDirector.resume(n => n === container.body)
		const baseState = executionDirector.stepOver() // Enter into the body
		setInterpreter(instancedInterpreter)
		setExecution(executionDirector)
		setState(baseState)
	}, [container, newInterpreter])

	function updateState(newState: ExecutionState<void>) {
		setInterpreter(interpreter)
		setExecution(execution)
		setState(newState)
	}

	function toStringOf(obj: RuntimeValue) {
		const stringValue = interpreter
			.fork()
			.do(function* () {
				return obj && (yield* this.send('toString', obj))
			})
			.finish()

		return stringValue.error
			? 'ERROR!'
			: stringValue.result?.innerValue ?? 'null'
	}

	if (state == null) {
		return null
	}

	const initialContext = {
		interpreter,
		execution,
		state,
		actions: { updateState },
		eval: { toStringOf },
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
