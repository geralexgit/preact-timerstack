import { h, FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'

const AddTimer: FunctionalComponent = () => {
	const {
		dispatch,
		status: { isActive },
	} = useStoreon('timers', 'status')
	const [formValues, setFormValues] = useState<
		Record<string, string | number>
	>({
		name: '',
		minutes: 0,
		seconds: 0,
	})

	const onSubmit = (e) => {
		e.preventDefault()
		const id = Date.now()
		const duration =
			Number(formValues.minutes) * 60 + Number(formValues.seconds)
		const name = formValues.name
		if (duration <= 0) {
			alert('timer is empty')
			return
		}
		const updatedValues = {
			id,
			duration,
			name,
		}
		dispatch('timer/add', updatedValues)
		setFormValues({
			name: '',
			minutes: 0,
			seconds: 0,
		})
	}

	const onInput = (e) => {
		const {
			value,
			dataset: { name },
		} = e.target
		setFormValues({
			...formValues,
			[`${name}`]: value,
		})
	}

	return (
		<div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
			<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
				➕ Add New Timer
			</h2>
			<form onSubmit={onSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Timer Name
					</label>
					<input
						type="text"
						value={formValues?.name}
						data-name="name"
						onInput={onInput}
						placeholder="e.g., Focus Session, Break Time"
						className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						required
					/>
				</div>
				
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Minutes
						</label>
						<input
							type="number"
							value={formValues?.minutes}
							defaultValue="0"
							data-name="minutes"
							onInput={onInput}
							max={99}
							min={0}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Seconds
						</label>
						<input
							type="number"
							value={formValues?.seconds}
							data-name="seconds"
							defaultValue="0"
							onInput={onInput}
							max={59}
							min={0}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
						/>
					</div>
				</div>
				
				<button 
					type="submit" 
					disabled={isActive}
					className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
				>
					<span>➕</span>
					<span>{isActive ? 'Timer Running...' : 'Add Timer'}</span>
				</button>
			</form>
		</div>
	)
}

export default AddTimer
