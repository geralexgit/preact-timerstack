import { h, FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'

const CountdownTimer: FunctionalComponent = () => {
	const {
		timers,
		status: { currentIndex },
		dispatch,
	} = useStoreon('timers', 'status')
	// const [activeTimerIndex, setActiveTimerIndex] = useState(0)
	const [timeLeft, setTimeLeft] = useState(
		timers[currentIndex]?.duration || 0
	)
	const [isTimerRunning, setIsTimerRunning] = useState(false)

	const resetTimers = () => {
		setIsTimerRunning(false)
		dispatch('timer/updateIndex', 0)
		setTimeLeft(timers[0]?.duration || 0)
	}
	const startTimer = () => {
		setIsTimerRunning(true)
	}
	const pauseTimers = () => {
		setIsTimerRunning(false)
	}

	useEffect(() => {
		let intervalId: number
		if (isTimerRunning) {
			intervalId = window.setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
			}, 1000)
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [isTimerRunning, currentIndex])

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
			{!isTimerRunning && (
				<button onClick={startTimer}>Start Timer</button>
			)}
			{isTimerRunning && (
				<button onClick={resetTimers}>Stop Timers</button>
			)}
			{isTimerRunning && (
				<button onClick={pauseTimers}>Pause Timers</button>
			)}
		</div>
	)
}

export default CountdownTimer
