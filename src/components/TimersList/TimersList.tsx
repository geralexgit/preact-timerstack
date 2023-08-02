import { h, FunctionalComponent } from 'preact'
import { useStoreon } from 'storeon/preact'

const TimersList: FunctionalComponent = () => {
	const { timers, dispatch } = useStoreon('timers')
	const removeTimer = (id: number) => {
		dispatch('timer/remove', id)
	}
	return (
		<div>
			<ul>
				{timers?.map((timer) => (
					<li>
						{timer.name} {timer.duration}{' '}
						<button onClick={() => removeTimer(timer.id)}>
							❌
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TimersList
