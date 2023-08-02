import { h, FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'

const CountdownTimer: FunctionalComponent = () => {
	const {
		timers,
		status: { currentIndex, isActive },
		dispatch,
	} = useStoreon('timers', 'status')
	const [timeLeft, setTimeLeft] = useState(
		timers[currentIndex]?.duration || 0
	)

	const resetTimers = () => {
		dispatch('timer/isActive', false)
		dispatch('timer/updateIndex', 0)
		setTimeLeft(timers[0]?.duration || 0)
	}
	const startTimer = () => {
		dispatch('timer/isActive', true)
	}
	const pauseTimers = () => {
		dispatch('timer/isActive', false)
	}

	useEffect(() => {
		let intervalId: number
		if (isActive) {
			intervalId = window.setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
			}, 1000)
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [isActive, currentIndex])

	useEffect(() => {
		if (timeLeft === 0) {
			if (currentIndex < timers.length - 1) {
				setTimeLeft(timers[currentIndex + 1].duration)
				dispatch('timer/updateIndex', currentIndex + 1)
			} else {
				resetTimers()
			}
		}
	}, [timeLeft, timers])

	return (
		<div>
			<div>Time Left: {timeLeft} seconds</div>
			<div>Current Timer: {timers[currentIndex]?.name}</div>
			{!isActive && <button onClick={startTimer}>Start Timer</button>}
			{isActive && <button onClick={resetTimers}>Stop Timers</button>}
			{isActive && <button onClick={pauseTimers}>Pause Timers</button>}
		</div>
	)
}

export default CountdownTimer
