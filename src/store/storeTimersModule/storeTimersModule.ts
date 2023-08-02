import { StoreonModule } from 'storeon'

import { State, Events } from '../storeTypes'

export const storeTimersModule: StoreonModule<State, Events> = (store) => {
	store.on('@init', (state) => ({
		timers: [
			{ id: 1, name: 'timer 1', duration: 3 },
			{ id: 2, name: 'timer 2', duration: 5 },
		],
		status: {
			currentIndex: 0,
			timeLeft: 0,
			totalTimeLeft: 0,
			isActive: false,
		},
	}))
	store.on('timer/add', (state, payload) => ({
		timers: [...state.timers, payload],
	}))
	store.on('timer/remove', (state, payload) => ({
		timers: state.timers.filter((timer) => timer.id !== payload),
	}))
	store.on('timer/updateIndex', (state, payload) => ({
		status: { ...state.status, currentIndex: payload },
	}))
	store.on('timer/isActive', (state, payload) => ({
		status: { ...state.status, isActive: payload },
	}))
}
