export interface Timer {
	id: number
	name: string
	duration: number
}

export interface IStatus {
	currentIndex: number
	timeLeft: number
	totalTimeLeft: number
	isTimerRunning: boolean
}

export interface State {
	timers: Timer[]
	status: IStatus
}

export interface Events {
	'timer/add': Timer
	'timer/remove': number
	'timer/updateIndex': number
	'timer/updateTimer': number
	'timer/updateTotalTimer': number
}
