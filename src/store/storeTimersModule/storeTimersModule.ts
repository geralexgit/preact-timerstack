import { StoreonModule } from 'storeon'

import { State, Events } from '../storeTypes'

export const storeTimersModule: StoreonModule<State, Events> = (store) => {
	store.on('@init', () => ({
		timersLists: {
			listId1: {
				listName: 'list 1',
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
			},

			listId2: {
				listName: 'list 2',
				timers: [
					{
						id: 4,
						name: 'timer 4',
						duration: 3,
						isFinished: false,
						progress: 0,
						progressPrecent: 0,
					},
					{
						id: 5,
						name: 'timer 5',
						duration: 5,
						isFinished: false,
						progress: 0,
						progressPrecent: 0,
					},
				],
			},
		},

		status: {
			currentIndex: 0,
			timeLeft: 0,
			totalTime: 0,
			totalTimeLeft: 0,
			totalProgress: 0,
			totalProgressPrecent: 0,
			isActive: false,
		},
	}))
	store.on('timer/add', (state, payload) => {
		const { listName, id, duration, name } = payload
		return {
			timers: [
				...state.timers,
				{ ...payload, isFinished: false, progress: 0 },
			],
		}
	})
	store.on('timer/remove', (state, payload) => {
		return {
			timers: state.timers.filter((timer) => timer.id !== payload),
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
}
