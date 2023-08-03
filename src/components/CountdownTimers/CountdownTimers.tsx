import { h, FunctionalComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'

const CountdownTimer: FunctionalComponent = () => {
	const {
		timers,
		status: { currentIndex, isActive, timeLeft },
		dispatch,
	} = useStoreon('timers', 'status')

	const resetTimers = () => {
		dispatch('timer/isActive', false)
		dispatch('timer/updateIndex', 0)
		dispatch('timer/setTime', timers[0]?.duration || 0)
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
				dispatch('timer/decrementTime')
			}, 1000)
		}
		return () => {
			clearInterval(intervalId)
		}
	}, [isActive, currentIndex])

	useEffect(() => {
		if (timeLeft === 0) {
			if (currentIndex < timers.length - 1) {
				dispatch('timer/setTime', timers[currentIndex + 1].duration)
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
