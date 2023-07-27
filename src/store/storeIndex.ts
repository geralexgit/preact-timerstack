import { createStoreon } from 'storeon'
import { storeTimersModule } from './storeTimersModule/storeTimersModule'
import { State, Events } from './storeTypes'
import { storeonDevtools } from 'storeon/devtools'

export const store = createStoreon<State, Events>([
	storeTimersModule,
	process.env.NODE_ENV !== 'production' && storeonDevtools,
])
