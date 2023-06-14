import LoadingOrError from 'components/LoadingOrError'
import Webbridge from 'pages/Web'
import type { ReactElement } from 'react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Gallery = lazy(async () => import('pages/Gallery'))

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Routes>
					<Route path='/' element={<Gallery />} />
					<Route path='/webbridge' element={<Webbridge />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}
