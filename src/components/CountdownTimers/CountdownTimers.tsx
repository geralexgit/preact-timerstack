import { h, FunctionalComponent } from 'preact'
import { useEffect } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import { voiseMsg } from '../../helpers/voiseMsg'
import { playCompletionChord, playAlternativeChord } from '../../helpers/audioSynth'
import { t } from '../../helpers/i18n'

const CountdownTimer: FunctionalComponent = () => {
	const {
		timers,
		status: {
			currentIndex,
			isActive,
			timeLeft,
			totalProgressPrecent,
			totalProgress,
			soundEnabled,
			soundType,
			completionSoundType,
		},
		dispatch,
	} = useStoreon('timers', 'status')

	const startTimer = () => {
		if (timers[timers.length - 1].isFinished) {
			dispatch('timer/stopTimers')
		}
		dispatch('timer/updateTotalTime')
		dispatch('timer/setIsActive', true)
		if (soundEnabled) {
			// Play sound based on selected type for timer start
			switch (soundType) {
				case 'voice':
					voiseMsg(timers[currentIndex].name)
					break
				case 'chord1':
					playCompletionChord()
					break
				case 'chord2':
					playAlternativeChord()
					break
			}
		}
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
				if (soundEnabled) {
					// Play sound based on selected type for individual timer completion
					switch (soundType) {
						case 'voice':
							voiseMsg(timers[currentIndex + 1].name)
							break
						case 'chord1':
							playCompletionChord()
							break
						case 'chord2':
							playAlternativeChord()
							break
					}
				}
			} else {
				dispatch('timer/isFinished', timers[currentIndex].id)
				dispatch('timer/stopTimers')
				// Play completion sound for all timers finished using separate completion sound type
				if (soundEnabled) {
					switch (completionSoundType) {
						case 'voice':
							voiseMsg('All timers completed')
							break
						case 'chord1':
							playCompletionChord()
							break
						case 'chord2':
							playAlternativeChord()
							break
					}
				}
			}
		}
	}, [timeLeft, timers, soundEnabled, soundType, completionSoundType])

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
		<div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 sm:p-8 text-white">
			<h2 className="text-2xl font-bold mb-6 text-center">{t('currentTimer')}</h2>

			{/* Main Timer Display */}
			<div className="text-center mb-8">
				<div className="text-5xl sm:text-6xl font-mono font-bold mb-4 tracking-wider">
					{formatTime(timeLeft)}
				</div>
				<div className="text-xl font-medium opacity-90 mb-3 px-2">
					{timers[currentIndex]?.name || t('noTimerSelected')}
				</div>
				<div className="text-sm opacity-75 mb-2">
					{t('timer')} {currentIndex + 1} of {timers.length}
				</div>
				<div className="text-sm opacity-90">
					<span className="font-bold">{t('queueDuration')}</span> {formatTime(timers.reduce((total, timer) => total + timer.duration, 0))}
				</div>
			</div>

			{/* Progress Indicators */}
			<div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
				<div>
					<div className="flex justify-between text-xs sm:text-sm mb-2">
						<span>{t('currentTimerProgress')}</span>
						<div className="text-right">
							<div>{Math.round(timers[currentIndex]?.progressPrecent || 0)}%</div>
							<div className="text-xs opacity-75">
								{formatTime(timers[currentIndex]?.progress || 0)} / {formatTime(timers[currentIndex]?.duration || 0)}
							</div>
						</div>
					</div>
					<div className="w-full bg-white/20 rounded-full h-2 sm:h-3">
						<div
							className="bg-white rounded-full h-2 sm:h-3 transition-all duration-1000 ease-out"
							style={`width: ${timers[currentIndex]?.progressPrecent || 0}%`}
						></div>
					</div>
				</div>

				<div>
					<div className="flex justify-between text-xs sm:text-sm mb-2">
						<span>{t('totalProgress')}</span>
						<div className="text-right">
							<div>{Math.round(totalProgressPrecent)}%</div>
							<div className="text-xs opacity-75">
								{formatTime(totalProgress)} / {formatTime(timers.reduce((total, timer) => total + timer.duration, 0))}
							</div>
						</div>
					</div>
					<div className="w-full bg-white/20 rounded-full h-2 sm:h-3">
						<div
							className="bg-gradient-to-r from-green-400 to-blue-400 rounded-full h-2 sm:h-3 transition-all duration-1000 ease-out"
							style={`width: ${totalProgressPrecent}%`}
						></div>
					</div>
				</div>
			</div>

			{/* Control Buttons */}
			<div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 sm:space-x-0">
				{!isActive ? (
					<button
						onClick={startTimer}
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-colors flex items-center justify-center space-x-2 text-base sm:text-lg shadow-lg"
						disabled={timers.length === 0}
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
						</svg>
						<span>{t('start')}</span>
					</button>
				) : (
					<button
						onClick={pauseTimers}
						className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-colors flex items-center justify-center space-x-2 text-base sm:text-lg shadow-lg"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
						<span>{t('pause')}</span>
					</button>
				)}
				
				<button
					onClick={() => dispatch('timer/skipTimer')}
					className={`${
						!isActive || currentIndex >= timers.length - 1 || timers.length === 0
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-orange-500 hover:bg-orange-600'
					} text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-colors flex items-center justify-center space-x-2 text-base sm:text-lg shadow-lg`}
					disabled={!isActive || currentIndex >= timers.length - 1 || timers.length === 0}
					title={
						timers.length === 0 
							? t('noTimersAvailable')
							: !isActive 
								? t('startTimerToSkip')
								: currentIndex >= timers.length - 1 
									? t('lastTimer')
									: t('skipToNext')
					}
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
					</svg>
					<span>{t('skip')}</span>
				</button>

				<button
					onClick={() => dispatch('timer/stopTimers')}
					className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-colors flex items-center justify-center space-x-2 text-base sm:text-lg shadow-lg"
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
					</svg>
					<span>{t('stop')}</span>
				</button>
			</div>

			{/* Stats */}
			<div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
				<div className="grid grid-cols-2 gap-4 text-center text-xs sm:text-sm">
					<div>
						<div className="font-semibold">{t('totalTime')}</div>
						<div className="opacity-75">{Math.floor(totalProgress / 60)}m {totalProgress % 60}s</div>
					</div>
					<div>
						<div className="font-semibold">{t('remaining')}</div>
						<div className="opacity-75">{timers.length - currentIndex} {timers.length - currentIndex !== 1 ? t('timers') : t('timer')}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CountdownTimer
