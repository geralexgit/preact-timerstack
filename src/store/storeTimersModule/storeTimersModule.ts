import { StoreonModule } from 'storeon'

import { State, Events } from '../storeTypes'

export const storeTimersModule: StoreonModule<State, Events> = (store) => {
	store.on('@init', () => ({
		timers: [
			{
				id: 1,
				name: 'timer 1',
				duration: 3,
				isFinished: false,
				progress: 0,
				progressPrecent: 0,
			},
			{
				id: 2,
				name: 'timer 2',
				duration: 5,
				isFinished: false,
				progress: 0,
				progressPrecent: 0,
			},
		],
		status: {
			currentIndex: 0,
			timeLeft: 0,
			totalTime: 0,
			totalTimeLeft: 0,
			totalProgress: 0,
			totalProgressPrecent: 0,
			isActive: false,
			soundEnabled: true,
		},
	}))
	store.on('timer/add', (state, payload) => {
		const updatedTimers = [
			...state.timers,
			{ ...payload, isFinished: false, progress: 0 },
		]

		// Recalculate total time after adding timer
		const totalTime = updatedTimers.reduce(
			(accumulator, timer) => accumulator + timer.duration,
			0
		)

		// Recalculate total progress percentage
		const totalProgressPrecent = totalTime > 0 ? Math.round(
			(Number(state.status.totalProgress) / Number(totalTime)) * 100
		) : 0

		// Build new status with updated totals
		let newStatus = {
			...state.status,
			totalTime,
			totalProgressPrecent
		}

		// If this is the first timer and no timer is active, set it as current
		if (state.timers.length === 0) {
			newStatus = {
				...newStatus,
				currentIndex: 0,
				timeLeft: payload.duration
			}
		}

		return {
			timers: updatedTimers,
			status: newStatus
		}
	})
	store.on('timer/remove', (state, payload) => {
		const updatedTimers = state.timers.filter((timer) => timer.id !== payload)

		// Recalculate total time after removing timer
		const totalTime = updatedTimers.reduce(
			(accumulator, timer) => accumulator + timer.duration,
			0
		)

		// Reset current index if it's out of bounds
		let newCurrentIndex = state.status.currentIndex
		if (newCurrentIndex >= updatedTimers.length) {
			newCurrentIndex = Math.max(0, updatedTimers.length - 1)
		}

		// Set new time left based on current timer
		const newTimeLeft = updatedTimers.length > 0 ? updatedTimers[newCurrentIndex]?.duration || 0 : 0

		// Recalculate total progress percentage
		const totalProgressPrecent = totalTime > 0 ? Math.round(
			(Number(state.status.totalProgress) / Number(totalTime)) * 100
		) : 0

		return {
			timers: updatedTimers,
			status: {
				...state.status,
				totalTime,
				currentIndex: newCurrentIndex,
				timeLeft: state.status.isActive ? state.status.timeLeft : newTimeLeft,
				totalProgressPrecent
			}
		}
	})

	store.on('timer/edit', (state, payload) => {
		const { id, name, duration } = payload
		const updatedTimers = state.timers.map((timer) => {
			if (timer.id === id) {
				return {
					...timer,
					name,
					duration,
					// Reset progress if duration changed
					progress: timer.duration !== duration ? 0 : timer.progress,
					progressPrecent: timer.duration !== duration ? 0 : timer.progressPrecent
				}
			}
			return timer
		})
		
		// Recalculate total time after editing timer
		const totalTime = updatedTimers.reduce(
			(accumulator, timer) => accumulator + timer.duration,
			0
		)
		
		// Update current timer's time left if it's the one being edited
		let newTimeLeft = state.status.timeLeft
		const currentTimer = updatedTimers[state.status.currentIndex]
		if (currentTimer && currentTimer.id === id && !state.status.isActive) {
			newTimeLeft = currentTimer.duration
		}
		
		// Recalculate total progress percentage
		const totalProgressPrecent = totalTime > 0 ? Math.round(
			(Number(state.status.totalProgress) / Number(totalTime)) * 100
		) : 0
		
		return {
			timers: updatedTimers,
			status: {
				...state.status,
				totalTime,
				timeLeft: newTimeLeft,
				totalProgressPrecent
			}
		}
	})

	store.on('timer/stopTimers', (state) => {
		store.dispatch('timer/setIsActive', false)
		store.dispatch('timer/updateIndex', 0)
		store.dispatch('timer/setTime', state.timers[0].duration)
		store.dispatch('timer/resetTotalProgress')
		const updatedTimers = state.timers.map((timer) => ({
			...timer,
			isFinished: false,
			progress: 0,
			progressPrecent: 0,
		}))
		return {
			timers: updatedTimers,
		}
	})
	store.on('timer/incrementProgress', (state, id) => {
		const updatedTimers = state.timers.map((timer) => {
			if (timer.id === id) {
				timer.progress++
				timer.progressPrecent = Math.round(
					(timer.progress / timer.duration) * 100
				)
			}
			return timer
		})
		return {
			timers: updatedTimers,
		}
	})

	store.on('timer/isFinished', (state, id) => {
		const updatedTimers = state.timers.map((timer) => {
			if (timer.id === id) {
				timer.isFinished = true
			}
			return timer
		})
		return {
			timers: updatedTimers,
		}
	})
	store.on('timer/updateIndex', (state, payload) => ({
		status: { ...state.status, currentIndex: payload },
	}))
	store.on('timer/setIsActive', (state, payload) => {
		// store.dispatch('timer/updateTotalTime')
		return {
			status: { ...state.status, isActive: payload },
		}
	})
	store.on('timer/updateTotalTime', (state) => {
		const totalTime = state.timers.reduce(
			(accumulator, timer) => accumulator + timer.duration,
			0
		)
		return {
			status: {
				...state.status,
				totalTime,
			},
		}
	})
	store.on('timer/decrementTime', (state) => ({
		status: { ...state.status, timeLeft: state.status.timeLeft - 1 },
	}))
	store.on('timer/incrementTotalProgress', (state) => {
		if (state.status.totalTime) {
			const totalProgress = state.status.totalProgress + 1
			const totalProgressPrecent = Math.round(
				(Number(totalProgress) / Number(state.status.totalTime)) * 100
			)
			return {
				status: {
					...state.status,
					totalProgress,
					totalProgressPrecent,
				},
			}
		}
	})
	store.on('timer/setTime', (state, payload) => ({
		status: { ...state.status, timeLeft: payload },
	}))
	store.on('timer/resetTotalProgress', (state) => {
		return {
			status: {
				...state.status,
				totalTimeLeft: 0,
				totalProgress: 0,
				totalProgressPrecent: 0,
			},
		}
	})

	// Save/Load Timer Lists
	store.on('timer/saveList', (state, payload) => {
		const timerList = {
			id: Date.now().toString(),
			name: payload.name,
			timers: state.timers.map(timer => ({
				id: timer.id,
				name: timer.name,
				duration: timer.duration
			})),
			createdAt: Date.now()
		}

		// Get existing saved lists from localStorage
		const savedLists = JSON.parse(localStorage.getItem('savedTimerLists') || '[]')
		savedLists.push(timerList)
		localStorage.setItem('savedTimerLists', JSON.stringify(savedLists))

		return state
	})

	store.on('timer/loadList', (state, payload) => {
		// Convert saved timers to full timer objects
		const loadedTimers = payload.timers.map(timer => ({
			...timer,
			progress: 0,
			progressPrecent: 0,
			isFinished: false
		}))

		// Reset status for new timers
		const newStatus = {
			...state.status,
			currentIndex: 0,
			timeLeft: loadedTimers.length > 0 ? loadedTimers[0].duration : 0,
			isActive: false,
			totalProgress: 0,
			totalProgressPrecent: 0,
		}

		return {
			timers: loadedTimers,
			status: newStatus
		}
	})

	store.on('timer/deleteList', (state, listId) => {
		const savedLists = JSON.parse(localStorage.getItem('savedTimerLists') || '[]')
		const filteredLists = savedLists.filter(list => list.id !== listId)
		localStorage.setItem('savedTimerLists', JSON.stringify(filteredLists))

		return state
	})

	store.on('timer/clearAll', (state) => {
		return {
			timers: [],
			status: {
				...state.status,
				currentIndex: 0,
				timeLeft: 0,
				isActive: false,
				totalProgress: 0,
				totalProgressPrecent: 0,
			}
		}
	})

	store.on('timer/toggleSound', (state) => {
		return {
			status: {
				...state.status,
				soundEnabled: !state.status.soundEnabled
			}
		}
	})

	store.on('timer/skipTimer', (state) => {
		const { currentIndex, isActive, soundEnabled } = state.status
		
		// Only skip if there's an active timer
		if (!isActive || currentIndex >= state.timers.length) {
			return state
		}
		
		// Mark current timer as finished
		const updatedTimers = state.timers.map((timer, index) => {
			if (index === currentIndex) {
				return {
					...timer,
					isFinished: true,
					progress: timer.duration,
					progressPrecent: 100
				}
			}
			return timer
		})
		
		// Move to next timer or stop if this was the last one
		if (currentIndex < state.timers.length - 1) {
			const nextTimer = updatedTimers[currentIndex + 1]
			
			// Announce next timer if sound is enabled
			if (soundEnabled) {
				// Import and call voice message function
				import('../../helpers/voiseMsg').then(({ voiseMsg }) => {
					voiseMsg(nextTimer.name)
				})
			}
			
			return {
				timers: updatedTimers,
				status: {
					...state.status,
					currentIndex: currentIndex + 1,
					timeLeft: nextTimer.duration
				}
			}
		} else {
			// This was the last timer, stop the sequence
			return {
				timers: updatedTimers,
				status: {
					...state.status,
					isActive: false
				}
			}
		}
	})


}
