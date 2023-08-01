import { h, FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'

const CountdownTimer: FunctionalComponent = () => {
	const { timers } = useStoreon('timers')

	const [activeTimerIndex, setActiveTimerIndex] = useState(0)
	const [timeLeft, setTimeLeft] = useState(
		timers[activeTimerIndex]?.duration || 0
	)
	const [isTimerRunning, setIsTimerRunning] = useState(false)

	const startTimer = () => {
		setIsTimerRunning(true)
	}

	const resetTimers = () => {
		setIsTimerRunning(false)
		setActiveTimerIndex(0)
		setTimeLeft(timers[0]?.duration || 0)
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
	}, [isTimerRunning, activeTimerIndex])

	useEffect(() => {
		if (timeLeft === 0) {
			if (activeTimerIndex < timers.length - 1) {
				setActiveTimerIndex((prevIndex) => prevIndex + 1)
				setTimeLeft(timers[activeTimerIndex].duration + 1)
			} else {
				resetTimers()
			}
		}
	}, [timeLeft, timers, activeTimerIndex])

	const currentTimer = timers[activeTimerIndex]

	return (
		<div>
			<div>Time Left: {timeLeft} seconds</div>
			<div>Current Timer: {currentTimer?.name}</div>
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
