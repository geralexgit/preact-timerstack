import { h, FunctionalComponent } from 'preact'
import { useStoreon } from 'storeon/preact'

const TimersList: FunctionalComponent = () => {
	const { timers, dispatch } = useStoreon('timers')
	const removeTimer = (id: number) => {
		dispatch('timer/remove', id)
	}
	return (
		<div>
			<table class="mb-8 w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
				<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-6 py-3">
							Name
						</th>
						<th scope="col" class="px-6 py-3">
							Time
						</th>
						<th scope="col" class="px-6 py-3"></th>
					</tr>
				</thead>
				<tbody>
					{timers?.map((timer) => (
						<tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
							<th
								scope="row"
								class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
							>
								{timer.name}
							</th>
							<td class="px-6 py-4">{timer.duration}</td>
							<td class="px-6 py-4 text-right">
								<button
									className="mb-2 me-2 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
									onClick={() => removeTimer(timer.id)}
								>
									delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TimersList
