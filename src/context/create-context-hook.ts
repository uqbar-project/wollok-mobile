import { useContext } from 'react'

/**
 *
 * @param Context A React context
 * @param logInfo Set this parameter for better logging
 * @returns context hook
 */
export function createContextHook<T>(
	Context: React.Context<T>,
	logInfo?: { hookName: string; contextName: string },
): () => NonNullable<T> {
	return () => {
		const context = useContext(Context)
		if (context === null) {
			throw new Error(
				`${logInfo?.hookName ?? 'Context hooks'} must be used within a ${
					logInfo?.contextName ?? 'context provider'
				}`,
			)
		}
		return context!
	}
}
