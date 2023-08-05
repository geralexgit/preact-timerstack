import { h, FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import { voiseMsg } from '../../helpers/voiseMsg'

const CountdownTimer: FunctionalComponent = () => {
	const {
		timers,
		status: { currentIndex, isActive, timeLeft },
		dispatch,
	} = useStoreon('timers', 'status')

	const [progress, setProgress] = useState(
		Math.round(
			(timers[currentIndex]?.progress / timers[currentIndex]?.duration) *
				100
		)
	)

	const resetTimers = () => {
		dispatch('timer/stopTimers')
		setProgress(0)
	}
	const startTimer = () => {
		dispatch('timer/isActive', true)
		voiseMsg(timers[currentIndex].name)
	}
	const pauseTimers = () => {
		dispatch('timer/isActive', false)
	}

	useEffect(() => {
		let intervalId: number
		if (isActive) {
			intervalId = window.setInterval(() => {
				dispatch('timer/decrementTime')
				dispatch('timer/incrementProgress', timers[currentIndex].id)
				setProgress(
					Math.round(
						(timers[currentIndex]?.progress /
							timers[currentIndex]?.duration) *
							100
					)
				)
			}, 1000)
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [isActive, currentIndex])

	useEffect(() => {
		if (timeLeft === 0 && isActive) {
			if (currentIndex < timers.length - 1) {
				dispatch('timer/setTime', timers[currentIndex + 1].duration)
				dispatch('timer/updateIndex', currentIndex + 1)
				voiseMsg(timers[currentIndex + 1].name)
			} else {
				resetTimers()
			}
		}
	}, [timeLeft, timers])

	useEffect(() => {
		if (!isActive && timeLeft === 0) {
			resetTimers()
		}
	}, [])
	return (
		<div>
			<div>Time Left: {timeLeft} seconds</div>
			<div>Current Timer: {timers[currentIndex]?.name}</div>
			<div>Progress: {progress}</div>
			{!isActive && <button onClick={startTimer}>Start Timer</button>}
			{isActive && <button onClick={pauseTimers}>Pause Timers</button>}
			<button onClick={resetTimers}>Stop Timers</button>
		</div>
	)
}

export default CountdownTimer
