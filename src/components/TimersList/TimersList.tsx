import { h, FunctionalComponent } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import Modal from '../Modal/Modal'
import { t } from '../../helpers/i18n'

const TimersList: FunctionalComponent = () => {
	const { timers, status: { currentIndex, isActive }, dispatch } = useStoreon('timers', 'status')
	const [showNewListModal, setShowNewListModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)
	const [editingTimer, setEditingTimer] = useState<{ id: number; name: string; duration: number } | null>(null)
	const [editFormValues, setEditFormValues] = useState<{ name: string; minutes: number; seconds: number }>({
		name: '',
		minutes: 0,
		seconds: 0
	})
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

	const handleEditTimer = (timer: { id: number; name: string; duration: number }) => {
		setEditingTimer(timer)
		setEditFormValues({
			name: timer.name,
			minutes: Math.floor(timer.duration / 60),
			seconds: timer.duration % 60
		})
		setShowEditModal(true)
	}

	const handleEditSubmit = (e: Event) => {
		e.preventDefault()
		if (!editingTimer) return

		const minutes = Math.max(0, Math.floor(Number(editFormValues.minutes) || 0))
		const seconds = Math.max(0, Math.floor(Number(editFormValues.seconds) || 0))
		const duration = minutes * 60 + seconds
		const name = (editFormValues.name as string).trim()

		// Validation
		if (!name) {
			alert('Please enter a timer name')
			return
		}

		if (duration <= 0) {
			alert('Timer duration must be greater than 0 seconds')
			return
		}

		if (duration > 5999) { // 99 minutes 59 seconds
			alert('Timer duration cannot exceed 99 minutes and 59 seconds')
			return
		}

		dispatch('timer/edit', {
			id: editingTimer.id,
			name,
			duration
		})

		setShowEditModal(false)
		setEditingTimer(null)
	}

	const handleEditInput = (e: Event) => {
		const target = e.target as HTMLInputElement
		const { value, dataset: { name } } = target

		let processedValue = value

		// Handle numeric inputs with validation
		if (name === 'minutes' || name === 'seconds') {
			// Remove any non-numeric characters except for empty string
			processedValue = value.replace(/[^0-9]/g, '')

			// Convert to number and apply constraints
			let numValue = processedValue === '' ? 0 : parseInt(processedValue, 10)

			if (name === 'minutes') {
				// Limit minutes to 0-99
				numValue = Math.min(Math.max(0, numValue), 99)
			} else if (name === 'seconds') {
				// Limit seconds to 0-59
				numValue = Math.min(Math.max(0, numValue), 59)
			}

			processedValue = numValue.toString()
		} else if (name === 'name') {
			// Trim whitespace and limit length
			processedValue = value.slice(0, 50) // Limit name to 50 characters
		}

		setEditFormValues({
			...editFormValues,
			[name as string]: processedValue,
		})
	}

	// Check if edit form is valid
	const isEditFormValid = () => {
		const minutes = Math.max(0, Math.floor(Number(editFormValues.minutes) || 0))
		const seconds = Math.max(0, Math.floor(Number(editFormValues.seconds) || 0))
		const duration = minutes * 60 + seconds
		const name = (editFormValues.name as string).trim()

		return name.length > 0 && duration > 0
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
			<div ref={scrollContainerRef} className="max-h-60 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
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
									<div className="flex items-center space-x-1 ml-2">
										<button
											onClick={() => handleEditTimer(timer)}
											className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 rounded transition-colors flex-shrink-0"
											title={t('editTimer')}
										>
											✏️
										</button>
										<button
											onClick={() => removeTimer(timer.id)}
											className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition-colors flex-shrink-0"
											title="Remove timer"
										>
											🗑️
										</button>
									</div>
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

			{/* Edit Timer Modal */}
			<Modal
				isOpen={showEditModal}
				onClose={() => {
					setShowEditModal(false)
					setEditingTimer(null)
				}}
				title={t('editTimerTitle')}
				maxWidth="md"
			>
				<form onSubmit={handleEditSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{t('timerName')}
						</label>
						<input
							type="text"
							value={editFormValues.name}
							data-name="name"
							onInput={handleEditInput}
							placeholder={t('timerNamePlaceholder')}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							required
							autoFocus
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{t('minutes')}
							</label>
							<input
								type="number"
								value={editFormValues.minutes}
								data-name="minutes"
								onInput={handleEditInput}
								max={99}
								min={0}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{t('seconds')}
							</label>
							<input
								type="number"
								value={editFormValues.seconds}
								data-name="seconds"
								onInput={handleEditInput}
								max={59}
								min={0}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
							/>
						</div>
					</div>

					<div className="flex space-x-3 pt-4">
						<button
							type="submit"
							disabled={!isEditFormValid()}
							className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
						>
							<span>✏️</span>
							<span>{t('updateTimer')}</span>
						</button>
						<button
							type="button"
							onClick={() => {
								setShowEditModal(false)
								setEditingTimer(null)
							}}
							className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
						>
							{t('cancel')}
						</button>
					</div>
				</form>
			</Modal>
		</div>
	)
}

export default TimersList
