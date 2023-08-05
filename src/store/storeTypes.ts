export interface Timer {
	id: number
	name: string
	duration: number
	progress: number
	isFinished: boolean
}

export interface IStatus {
	currentIndex: number
	timeLeft: number
	totalTimeLeft: number
	isActive: boolean
}

export interface State {
	timers: Timer[]
	status: IStatus
}

export interface Events {
	'timer/add': Timer
	'timer/remove': number
	'timer/updateIndex': number
	'timer/decrementTime': void
	'timer/incrementProgress': number
	'timer/setTime': number
	'timer/updateTotalTimer': number
	'timer/isActive': boolean
	'timer/isFinished': number // id
	'timer/stopTimers': void
}
