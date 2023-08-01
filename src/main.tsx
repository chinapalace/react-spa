import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from 'App'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import packageData from '../package.json'
import './index.css'

registerSW()

console.log(`%c v${packageData.version}`, `font-weight: 700; color: #555;`)

const MAX_RETRIES = 1
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Number.POSITIVE_INFINITY,
			retry: MAX_RETRIES
		}
	}
})

const container = document.querySelector('#root')
if (container) {
	const root = createRoot(container)
	root.render(
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	)
}
