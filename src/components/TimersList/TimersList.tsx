import { h, FunctionalComponent } from 'preact'
import { Timer } from 'src/store/storeTypes'
import { useStoreon } from 'storeon/preact'

const TimersList: FunctionalComponent<{
	listName: string
	timers: Timer[]
}> = (props) => {
	const { listName, timers } = props
	const { dispatch } = useStoreon('timers')
	const removeTimer = (id: number) => {
		dispatch('timer/remove', id)
	}

	return (
		<div>
			<ul>
				{timers[listName]?.map((timer) => (
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
