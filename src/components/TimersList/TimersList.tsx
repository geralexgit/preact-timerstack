import { h, FunctionalComponent } from 'preact'
import { useStoreon } from 'storeon/preact'

const TimersList: FunctionalComponent = () => {
	const { timers, dispatch } = useStoreon('timers')
	const removeTimer = (id: number) => {
		dispatch('timer/remove', id)
	}
	
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins}:${secs.toString().padStart(2, '0')}`
	}

	return (
		<div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
			<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
				📋 Timer Queue
			</h2>
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
		</div>
	)
}

export default TimersList
