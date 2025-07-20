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
	soundEnabled: boolean
}

export interface State {
	timers: Timer[]
	status: IStatus
}

export interface TimerList {
	id: string
	name: string
	timers: Omit<Timer, 'progress' | 'progressPrecent' | 'isFinished'>[]
	createdAt: number
}

export interface Events {
	'timer/add': Timer
	'timer/remove': number
	'timer/edit': { id: number; name: string; duration: number }
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
	'timer/saveList': { name: string }
	'timer/loadList': TimerList
	'timer/deleteList': string
	'timer/clearAll': void
	'timer/toggleSound': void
	'timer/skipTimer': void
}
