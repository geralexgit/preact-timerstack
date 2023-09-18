import { h, FunctionalComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import { voiseMsg } from '../../helpers/voiseMsg'

const CountdownTimer: FunctionalComponent = () => {
	const {
		timers,
		status: {
			currentIndex,
			isActive,
			timeLeft,
			totalProgressPrecent,
			totalProgress,
		},
		dispatch,
	} = useStoreon('timers', 'status')

	const startTimer = () => {
		if (timers[timers.length - 1].isFinished) {
			dispatch('timer/stopTimers')
		}
		dispatch('timer/updateTotalTime')
		dispatch('timer/setIsActive', true)
		voiseMsg(timers[currentIndex].name)
	}
	const pauseTimers = () => {
		dispatch('timer/setIsActive', false)
	}

	useEffect(() => {
		let intervalId: number
		if (isActive) {
			intervalId = window.setInterval(() => {
				dispatch('timer/decrementTime')
				dispatch('timer/incrementProgress', timers[currentIndex].id)
				dispatch('timer/incrementTotalProgress')
			}, 1000)
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [isActive, currentIndex])

	useEffect(() => {
		if (timeLeft === 0 && isActive) {
			if (currentIndex < timers.length - 1) {
				dispatch('timer/isFinished', timers[currentIndex].id)
				dispatch('timer/setTime', timers[currentIndex + 1].duration)
				dispatch('timer/updateIndex', currentIndex + 1)
				voiseMsg(timers[currentIndex + 1].name)
			} else {
				dispatch('timer/isFinished', timers[currentIndex].id)
				dispatch('timer/stopTimers')
			}
		}
	}, [timeLeft, timers])

	useEffect(() => {
		dispatch('timer/updateTotalTime')
	}, [timers])

	useEffect(() => {
		if (!isActive && timeLeft === 0) {
			dispatch('timer/stopTimers')
		}
	}, [])

	return (
		<div>
			<div>Time Left: {timeLeft} seconds</div>
			<div>Current Timer: {timers[currentIndex]?.name}</div>
			<div>Progress: {timers[currentIndex]?.progressPrecent}</div>
			<div>Total progress sec: {totalProgress}</div>
			<div>Total progress %: {totalProgressPrecent}</div>
			{!isActive && <button onClick={startTimer}>▶️</button>}
			{isActive && <button onClick={pauseTimers}>⏸︎</button>}
			<button onClick={() => dispatch('timer/stopTimers')}>⏹</button>
		</div>
	)
}

export default CountdownTimer
