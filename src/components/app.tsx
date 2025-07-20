import { h } from 'preact'
// import { Route, Router } from 'preact-router'
import { StoreContext } from 'storeon/preact'
import { store } from '../store/storeIndex'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/index'
import ProgressBar from './ProgressBar/ProgressBar'
import Navbar from './Navbar/Navbar'

const App = () => (
	<div id="app" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
		<StoreContext.Provider value={store}>
			<Navbar />
			<main className="container">
				<div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 mb-16 sm:mb-6">
					<Home />
				</div>
				<ProgressBar />
			</main>
		</StoreContext.Provider>
	</div>
)

export default App
