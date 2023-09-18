import { createStoreon } from 'storeon'
import { persistState } from '@storeon/localstorage'
import { storeTimersModule } from './storeTimersModule/storeTimersModule'
import { State, Events } from './storeTypes'
import { storeonDevtools } from 'storeon/devtools'

export const store = createStoreon<State, Events>([
	storeTimersModule,
	// persistState(['timers', 'status']),
	process.env.NODE_ENV !== 'production' && storeonDevtools,
])
