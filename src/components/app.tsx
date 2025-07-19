import { h } from 'preact'
// import { Route, Router } from 'preact-router'
import { StoreContext } from 'storeon/preact'
import { store } from '../store/storeIndex'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/index'
import ProgressBar from './ProgressBar/ProgressBar'

const App = () => (
	<div id="app" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
		<StoreContext.Provider value={store}>
			<main className="container mx-auto px-1 sm:px-4 py-2 sm:py-8 max-w-4xl">
				<div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl shadow-xl p-2 sm:p-6 mb-20 sm:mb-6">
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8 text-center">
						⏱️ Timer Stack
					</h1>
					<Home />
				</div>
				{/* <ProgressBar /> */}
			</main>
		</StoreContext.Provider>
	</div>
)

export default App
