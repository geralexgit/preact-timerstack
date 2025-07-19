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
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
	}

	return (
		<div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white">
			<h2 className="text-2xl font-bold mb-6 text-center">Current Timer</h2>

			{/* Main Timer Display */}
			<div className="text-center mb-8">
				<div className="text-6xl font-mono font-bold mb-4 tracking-wider">
					{formatTime(timeLeft)}
				</div>
				<div className="text-xl font-medium opacity-90 mb-2">
					{timers[currentIndex]?.name || 'No timer selected'}
				</div>
				<div className="text-sm opacity-75">
					Timer {currentIndex + 1} of {timers.length}
				</div>
			</div>

			{/* Progress Indicators */}
			<div className="space-y-4 mb-8">
				<div>
					<div className="flex justify-between text-sm mb-2">
						<span>Current Timer Progress</span>
						<span>{Math.round(timers[currentIndex]?.progressPrecent || 0)}%</span>
					</div>
					<div className="w-full bg-white/20 rounded-full h-3">
						<div
							className="bg-white rounded-full h-3 transition-all duration-1000 ease-out"
							style={`width: ${timers[currentIndex]?.progressPrecent || 0}%`}
						></div>
					</div>
				</div>

				<div>
					<div className="flex justify-between text-sm mb-2">
						<span>Total Progress</span>
						<span>{Math.round(totalProgressPrecent)}%</span>
					</div>
					<div className="w-full bg-white/20 rounded-full h-3">
						<div
							className="bg-gradient-to-r from-green-400 to-blue-400 rounded-full h-3 transition-all duration-1000 ease-out"
							style={`width: ${totalProgressPrecent}%`}
						></div>
					</div>
				</div>
			</div>

			{/* Control Buttons */}
			<div className="flex justify-center space-x-4">
				{!isActive && (
					<button
						onClick={startTimer}
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center space-x-2 text-lg shadow-lg"
						disabled={timers.length === 0}
					>
						<span>▶️</span>
						<span>Start</span>
					</button>
				)}

				{isActive && (
					<button
						onClick={pauseTimers}
						className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center space-x-2 text-lg shadow-lg"
					>
						<span>⏸️</span>
						<span>Pause</span>
					</button>
				)}

				<button
					onClick={() => dispatch('timer/stopTimers')}
					className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full transition-colors flex items-center space-x-2 text-lg shadow-lg"
				>
					<span>⏹️</span>
					<span>Stop</span>
				</button>
			</div>

			{/* Stats */}
			<div className="mt-8 pt-6 border-t border-white/20">
				<div className="grid grid-cols-2 gap-4 text-center text-sm">
					<div>
						<div className="font-semibold">Total Time</div>
						<div className="opacity-75">{Math.floor(totalProgress / 60)}m {totalProgress % 60}s</div>
					</div>
					<div>
						<div className="font-semibold">Remaining</div>
						<div className="opacity-75">{timers.length - currentIndex} timers</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CountdownTimer
