import { h, FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import SavedTimerLists from '../SavedTimerLists/SavedTimerLists'

const Navbar: FunctionalComponent = () => {
	const [showSavedLists, setShowSavedLists] = useState(false)
	const { status: { soundEnabled }, dispatch } = useStoreon('status')

	return (
		<>
			<nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
				<div className="container mx-auto px-3 sm:px-4 max-w-4xl">
					<div className="flex items-center justify-between h-16">
						{/* Logo/Title */}
						<div className="flex items-center space-x-3">
							<div className="text-2xl">⏱️</div>
							<h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
								Timer Stack
							</h1>
						</div>

						{/* Navigation Items */}
						<div className="flex items-center space-x-2 sm:space-x-4">
							<button
								onClick={() => dispatch('timer/toggleSound')}
								className={`${soundEnabled
									? 'bg-red-500 hover:bg-red-600'
									: 'bg-green-500 hover:bg-green-600'
									} text-white p-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center`}
								title={soundEnabled ? 'Sound On - Click to disable' : 'Sound Off - Click to enable'}
							>
								{soundEnabled ? (
									<span className="text-lg">🔊</span>
								) : (
									<span className="text-lg">🔇</span>
								)}
							</button>

							<button
								onClick={() => setShowSavedLists(true)}
								className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
							>
								<span>💾</span>
								<span className="hidden sm:inline">Saved Lists</span>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Saved Timer Lists Modal */}
			{showSavedLists && (
				<SavedTimerLists onClose={() => setShowSavedLists(false)} />
			)}
		</>
	)
}

export default Navbar