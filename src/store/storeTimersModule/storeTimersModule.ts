import { StoreonModule } from 'storeon'

import { State, Events } from '../storeTypes'

export const storeTimersModule: StoreonModule<State, Events> = (store) => {
	store.on('@init', (state) => ({
		timers: [{ id: 1, name: 'string', duration: 10 }],
	}))
	store.on('AddTimer', (state, event) => ({
		timers: [...state.timers, event],
	}))
	store.on('RemoveTimer', (state, event) => ({
		timers: state.timers.filter((timer) => timer.id === event),
	}))
}
