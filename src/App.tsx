import {
	loadWebbridge,
	useVariables,
	WebbridgeProvider
} from '@tapcart/webbridge-react'
import LoadingOrError from 'components/LoadingOrError'
import Webbridge from 'pages/Web'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Gallery = lazy(async () => import('pages/Gallery'))

export default function App(): ReactElement {
	const webbridgeClient = loadWebbridge({ test: false })
	const variables = useVariables()
	console.log('first', variables)
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<WebbridgeProvider webbridgeClient={webbridgeClient}>
					<Routes>
						<Route path='/' element={<Gallery />} />
						<Route path='/webbridge' element={<Webbridge />} />
					</Routes>
				</WebbridgeProvider>
			</Suspense>
		</BrowserRouter>
	)
}
