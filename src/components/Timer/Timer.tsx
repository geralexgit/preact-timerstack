import { h, FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'

interface Timer {
	name: string
	duration: number
}

interface CountdownTimerProps {
	timers: Timer[]
}

const CountdownTimer: FunctionalComponent<CountdownTimerProps> = ({
	timers,
}) => {
	const [activeTimerIndex, setActiveTimerIndex] = useState(0)
	const [timeLeft, setTimeLeft] = useState(timers[activeTimerIndex].duration)
	const [isTimerRunning, setIsTimerRunning] = useState(false)

	const startTimer = () => {
		setIsTimerRunning(true)
	}

	const resetTimers = () => {
		setActiveTimerIndex(0)
		setIsTimerRunning(false)
		setTimeLeft(timers[0].duration)
	}

	useEffect(() => {
		let intervalId: number
		if (isTimerRunning) {
			intervalId = window.setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
			}, 1000)
		} else {
			resetTimers()
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [isTimerRunning, activeTimerIndex])

	useEffect(() => {
		if (timeLeft === 0) {
			if (activeTimerIndex < timers.length - 1) {
				setActiveTimerIndex((prevIndex) => prevIndex + 1)
				setTimeLeft(timers[activeTimerIndex].duration)
			} else {
			}
		} else if (timeLeft <= 0) {
			resetTimers()
		}
	}, [timeLeft, timers, activeTimerIndex])

	const currentTimer = timers[activeTimerIndex]

	return (
		<div>
			<div>Time Left: {timeLeft} seconds</div>
			<div>Current Timer: {currentTimer.name}</div>
			{!isTimerRunning && (
				<button onClick={startTimer}>Start Timer</button>
			)}
			{isTimerRunning && (
				<button onClick={resetTimers}>Stop Timer</button>
			)}
		</div>
	)
}

export default CountdownTimer
