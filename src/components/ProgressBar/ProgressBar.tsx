import { h, FunctionalComponent } from 'preact'
import { useStoreon } from 'storeon/preact'

const ProgressBar: FunctionalComponent = () => {
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
	// if (!totalProgressPrecent) {
	// 	return null
	// }
	return (
		<div className="absolute left-0 right-0 top-0 h-8">
			{/* <div
				className="block h-1/2 bg-emerald-400 transition-all duration-700"
				style={`width: ${timers[currentIndex]?.progressPrecent}%`}
			></div> */}
			<div class="w-full rounded-full bg-gray-200 dark:bg-gray-700">
				<div
					class="rounded-full bg-emerald-400 p-0.5 text-center text-xs font-medium leading-none text-blue-100 transition-all duration-700"
					style={`width: ${timers[currentIndex]?.progressPrecent}%`}
				>
					{timers[currentIndex]?.progressPrecent}%
				</div>
			</div>
			{/* <div
				className="block h-1/2 bg-violet-500 transition-all duration-700"
				style={`width: ${totalProgressPrecent}%`}
			></div> */}
			<div class="w-full rounded-full bg-gray-200 dark:bg-gray-700">
				<div
					class="rounded-full bg-violet-500 p-0.5 text-center text-xs font-medium leading-none text-blue-100 transition-all duration-700"
					style={`width: ${totalProgressPrecent}%`}
				>
					{totalProgressPrecent}%
				</div>
			</div>
		</div>
	)
}

export default ProgressBar
