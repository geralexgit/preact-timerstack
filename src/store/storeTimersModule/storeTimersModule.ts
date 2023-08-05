import { StoreonModule } from 'storeon'

import { State, Events } from '../storeTypes'

export const storeTimersModule: StoreonModule<State, Events> = (store) => {
	store.on('@init', (state) => ({
		timers: [
			{
				id: 1,
				name: 'timer 1',
				duration: 3,
				isFinished: false,
				progress: 0,
			},
			{
				id: 2,
				name: 'timer 2',
				duration: 5,
				isFinished: false,
				progress: 0,
			},
		],
		status: {
			currentIndex: 0,
			timeLeft: 0,
			totalTimeLeft: 0,
			isActive: false,
		},
	}))
	store.on('timer/add', (state, payload) => ({
		timers: [
			...state.timers,
			{ ...payload, isFinished: false, progress: 0 },
		],
	}))
	store.on('timer/remove', (state, payload) => ({
		timers: state.timers.filter((timer) => timer.id !== payload),
	}))
	store.on('timer/stopTimers', (state) => {
		store.dispatch('timer/isActive', false)
		store.dispatch('timer/updateIndex', 0)
		store.dispatch('timer/setTime', state.timers[0].duration)
		const updatedTimers = state.timers.map((timer) => ({
			...timer,
			isFinished: false,
			progress: 0,
		}))
		return {
			timers: updatedTimers,
		}
	})

	store.on('timer/incrementProgress', (state, id) => {
		const updatedTimers = state.timers.map((timer) => {
			if (timer.id === id) {
				timer.progress + 1
			}
			return timer
		})
		return {
			timers: updatedTimers,
		}
	})
	store.on('timer/incrementProgress', (state, id) => {
		const updatedTimers = state.timers.map((timer) => {
			if (timer.id === id) {
				timer.progress++
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
	store.on('timer/isActive', (state, payload) => ({
		status: { ...state.status, isActive: payload },
	}))
	store.on('timer/decrementTime', (state) => ({
		status: { ...state.status, timeLeft: state.status.timeLeft - 1 },
	}))
	store.on('timer/setTime', (state, payload) => ({
		status: { ...state.status, timeLeft: payload },
	}))
}
