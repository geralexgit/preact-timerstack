import { h, FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import Modal from '../Modal/Modal'

const TimersList: FunctionalComponent = () => {
	const { timers, dispatch } = useStoreon('timers')
	const [showNewListModal, setShowNewListModal] = useState(false)
	
	const removeTimer = (id: number) => {
		dispatch('timer/remove', id)
	}
	
	const handleNewListClick = () => {
		if (timers.length > 0) {
			setShowNewListModal(true)
		} else {
			// If no timers, just clear directly
			handleConfirmNewList()
		}
	}
	
	const handleConfirmNewList = () => {
		dispatch('timer/stopTimers')
		dispatch('timer/clearAll')
		setShowNewListModal(false)
	}
	
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	return (
		<div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
					📋 Timer Queue
				</h2>
				<button
					onClick={handleNewListClick}
					className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
					title="Start fresh with an empty timer list"
				>
					✨ New List
				</button>
			</div>
			{timers?.length === 0 ? (
				<p className="text-gray-500 dark:text-gray-400 text-center py-8">
					No timers added yet. Add your first timer below!
				</p>
			) : (
				<ul className="space-y-3">
					{timers?.map((timer, index) => (
						<li key={timer.id} className="bg-white dark:bg-gray-600 rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
							<div className="flex items-center space-x-3">
								<span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-2 py-1 rounded-full">
									#{index + 1}
								</span>
								<div>
									<h3 className="font-medium text-gray-800 dark:text-white">{timer.name}</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400">{formatTime(timer.duration)}</p>
								</div>
							</div>
							<button 
								onClick={() => removeTimer(timer.id)}
								className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
								title="Remove timer"
							>
								🗑️
							</button>
						</li>
					))}
				</ul>
			)}

			{/* New List Confirmation Modal */}
			<Modal
				isOpen={showNewListModal}
				onClose={() => setShowNewListModal(false)}
				title="Create New Timer List"
				maxWidth="md"
			>
				<div className="space-y-4">
					<div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
						<div className="text-yellow-600 dark:text-yellow-400 text-2xl">
							⚠️
						</div>
						<div>
							<h4 className="font-medium text-yellow-800 dark:text-yellow-200">
								Clear Current Timers?
							</h4>
							<p className="text-sm text-yellow-700 dark:text-yellow-300">
								This will remove all {timers.length} timer{timers.length !== 1 ? 's' : ''} from your current list and stop any running timer.
							</p>
						</div>
					</div>
					
					<div className="text-sm text-gray-600 dark:text-gray-400">
						<p className="mb-2">
							<strong>What will happen:</strong>
						</p>
						<ul className="list-disc list-inside space-y-1 ml-2">
							<li>All current timers will be removed</li>
							<li>Any running timer will be stopped</li>
							<li>You'll start with a fresh, empty timer list</li>
						</ul>
					</div>
					
					<div className="flex space-x-3 pt-4">
						<button
							onClick={handleConfirmNewList}
							className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
						>
							<span>🗑️</span>
							<span>Clear & Start New</span>
						</button>
						<button
							onClick={() => setShowNewListModal(false)}
							className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default TimersList
