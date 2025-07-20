import { h, FunctionalComponent } from 'preact'
import styles from './ProgressBar.module.css'
import { useStoreon } from 'storeon/preact'

const ProgressBar: FunctionalComponent = () => {
	const {
		timers,
		status: {
			currentIndex,
			isActive,
			timeLeft,
			totalProgressPrecent,
			totalProgress,
		},
		dispatch,
	} = useStoreon('timers', 'status')

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 shadow-lg">
			<div className="container mx-auto max-w-4xl px-2 sm:px-0">
				<div className="flex items-center justify-between mb-3">
					<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Overall Progress
					</span>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						{Math.round(totalProgressPrecent)}% Complete
					</span>
				</div>

				{/* Overall Progress Bar */}
				<div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2 overflow-hidden">
					{/* Current Timer Progress (lighter) */}
					<div
						className="absolute top-0 left-0 h-full bg-blue-300 dark:bg-blue-600 transition-all duration-1000 ease-out rounded-full"
						style={`width: ${timers[currentIndex]?.progressPrecent || 0}%`}
					></div>

					{/* Total Progress (darker overlay) */}
					<div
						className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out rounded-full"
						style={`width: ${totalProgressPrecent}%`}
					></div>

					{/* Animated pulse when active */}
					{isActive && (
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full"></div>
					)}
				</div>

				{/* Progress Labels */}
				<div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
					<span>
						{timers[currentIndex]?.name || 'No active timer'}
					</span>
					<span>
						{timers.length > 0 ? `${currentIndex + 1}/${timers.length} timers` : '0 timers'}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ProgressBar
