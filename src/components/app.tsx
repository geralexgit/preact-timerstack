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
				{/* <ProgressBar /> */}
			</main>
			<footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4">
				<div className="container mx-auto max-w-4xl">
					<div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
						<span>Made by Alex Grsmv</span>
						<a 
							href="https://t.me/geralex" 
							target="_blank" 
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center space-x-1"
						>
							<i className="bx bxl-telegram"></i>
							<span>Telegram</span>
						</a>
						<a 
							href="https://github.com/geralexgit" 
							target="_blank" 
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center space-x-1"
						>
							<i className="bx bxl-github"></i>
							<span>GitHub</span>
						</a>
					</div>
				</div>
			</footer>
		</StoreContext.Provider>
	</div>
)

export default App
