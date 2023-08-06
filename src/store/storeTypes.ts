export interface Timer {
	id: number
	name: string
	duration: number
	progress: number
	progressPrecent: number
	isFinished: boolean
}

export interface IStatus {
	currentIndex: number
	timeLeft: number
	totalTimeLeft: number
	isActive: boolean
	totalTime: number
	totalProgress: number
	totalProgressPrecent: number
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
	'timer/setIsActive': boolean
	'timer/isFinished': number // id
	'timer/stopTimers': void
	'timer/incrementTotalProgress': void
	'timer/updateTotalTime': void
	'timer/resetTotalProgress': void
}
