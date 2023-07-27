export interface Timer {
	id: number
	name: string
	duration: number
}

export interface State {
	timers: Timer[]
}

export interface Events {
	AddTimer: Timer
	RemoveTimer: number
}
