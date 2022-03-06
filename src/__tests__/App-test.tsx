import React from 'react'
import renderer, { act } from 'react-test-renderer'
import App from '../App'

it('renders correctly', async () => {
	// Render App fire async FS operations -> act is needed
	await act(async () => {
		renderer.create(<App />)
	})
})
