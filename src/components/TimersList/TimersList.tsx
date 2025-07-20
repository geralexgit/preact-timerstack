import { h, FunctionalComponent } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import Modal from '../Modal/Modal'
import { t } from '../../helpers/i18n'

const TimersList: FunctionalComponent = () => {
	const { timers, status: { currentIndex, isActive }, dispatch } = useStoreon('timers', 'status')
	const [showNewListModal, setShowNewListModal] = useState(false)
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const activeTimerRef = useRef<HTMLLIElement>(null)

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

	// Auto-scroll to active timer when currentIndex changes
	useEffect(() => {
		if (activeTimerRef.current && scrollContainerRef.current) {
			const activeElement = activeTimerRef.current
			const container = scrollContainerRef.current

			// Get the position of the active timer relative to the container
			const containerRect = container.getBoundingClientRect()
			const activeRect = activeElement.getBoundingClientRect()

			// Check if the active timer is visible in the container
			const isVisible = (
				activeRect.top >= containerRect.top &&
				activeRect.bottom <= containerRect.bottom
			)

			// If not visible, scroll to make it visible
			if (!isVisible) {
				const containerScrollTop = container.scrollTop
				const activeOffsetTop = activeElement.offsetTop
				const containerHeight = container.clientHeight
				const activeHeight = activeElement.clientHeight

				// Calculate the scroll position to center the active timer
				const scrollTo = activeOffsetTop - (containerHeight / 2) + (activeHeight / 2)

				container.scrollTo({
					top: Math.max(0, scrollTo),
					behavior: 'smooth'
				})
			}
		}
	}, [currentIndex, isActive])

	return (
		<div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 sm:p-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
				<h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
					📋 {t('timerQueue')}
				</h2>
				<div className="flex gap-2 self-start sm:self-auto">
					<button
						onClick={handleNewListClick}
						className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
						title="Start fresh with an empty timer list"
					>
						✨ {t('newList')}
					</button>
				</div>
			</div>
			<div ref={scrollContainerRef} className="max-h-45 overflow-y-auto overflow-x-hidden">
				{timers?.length === 0 ? (
					<p className="text-gray-500 dark:text-gray-400 text-center py-8">
						{t('noTimersAdded')}
					</p>
				) : (
					<ul className="space-y-2 pr-2">
						{timers?.map((timer, index) => {
							const isCurrentTimer = index === currentIndex
							const isActiveTimer = isCurrentTimer && isActive

							return (
								<li
									key={timer.id}
									ref={isCurrentTimer ? activeTimerRef : null}
									className={`${isCurrentTimer
										? isActiveTimer
											? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700'
											: 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700'
										: 'bg-white dark:bg-gray-600 border-2 border-transparent'
										} rounded-lg px-3 py-2 flex items-center justify-between shadow-sm hover:shadow-md transition-all`}
								>
									<div className="flex items-center space-x-3 min-w-0 flex-1">
										<span className={`${isCurrentTimer
											? isActiveTimer
												? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
												: 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
											: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
											} text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 flex items-center space-x-1`}>
											{isActiveTimer && <span className="animate-pulse">▶️</span>}
											<span>#{index + 1}</span>
										</span>
										<div className="min-w-0 flex-1">
											<span className={`font-medium truncate mr-2 ${isCurrentTimer
												? isActiveTimer
													? 'text-green-800 dark:text-green-200'
													: 'text-blue-800 dark:text-blue-200'
												: 'text-gray-800 dark:text-white'
												}`}>
												{timer.name}
											</span>
											<span className={`text-sm ${isCurrentTimer
												? isActiveTimer
													? 'text-green-600 dark:text-green-300'
													: 'text-blue-600 dark:text-blue-300'
												: 'text-gray-500 dark:text-gray-400'
												}`}>
												({formatTime(timer.duration)})
											</span>
										</div>
									</div>
									<button
										onClick={() => removeTimer(timer.id)}
										className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition-colors flex-shrink-0 ml-2"
										title="Remove timer"
									>
										🗑️
									</button>
								</li>
							)
						})}
					</ul>
				)}
			</div>

			{/* New List Confirmation Modal */}
			<Modal
				isOpen={showNewListModal}
				onClose={() => setShowNewListModal(false)}
				title={t('clearCurrentTimers')}
				maxWidth="md"
			>
				<div className="space-y-4">
					<div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
						<div className="text-yellow-600 dark:text-yellow-400 text-2xl">
							⚠️
						</div>
						<div>
							<h4 className="font-medium text-yellow-800 dark:text-yellow-200">
								{t('clearCurrentTimers')}
							</h4>
							<p className="text-sm text-yellow-700 dark:text-yellow-300">
								This will remove all {timers.length} {timers.length !== 1 ? t('timers') : t('timer')} from your current list and stop any running timer.
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
