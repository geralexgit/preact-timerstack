import { StoreonModule } from 'storeon'

import { State, Events } from '../storeTypes'

export const storeTimersModule: StoreonModule<State, Events> = (store) => {
	store.on('@init', (state) => ({
		timers: [],
	}))
	store.on('timer/add', (state, event) => ({
		timers: [...state.timers, event],
	}))
	store.on('timer/remove', (state, event) => ({
		timers: state.timers.filter((timer) => timer.id !== event),
	}))
}
