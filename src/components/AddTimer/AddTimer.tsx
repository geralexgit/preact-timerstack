import { h, FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'

const labelClasses =
	'block mb-2 text-sm font-medium text-gray-900 dark:text-white'

const inputClasses =
	'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full'

const buttonClasses =
	'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-full text-sm text-center me-2 mb-2'

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
		<form onSubmit={onSubmit}>
			<div className="grid grid-cols-4 gap-2 align-bottom">
				<label className={labelClasses} htmlFor="name">
					Name
					<input
						type="text"
						value={formValues?.name}
						data-name="name"
						onInput={onInput}
						required
						className={inputClasses}
						placeholder="Name"
					/>
				</label>
				<label className={labelClasses} htmlFor="minutes">
					Minutes
					<input
						type="number"
						value={formValues?.minutes}
						defaultValue="0"
						data-name="minutes"
						onInput={onInput}
						max={99}
						className={inputClasses}
						placeholder="minutes"
					/>
				</label>
				<label className={labelClasses} htmlFor="seconds">
					Seconds
					<input
						type="number"
						value={formValues?.seconds}
						data-name="seconds"
						defaultValue="0"
						onInput={onInput}
						max={60}
						className={inputClasses}
					/>
				</label>
				<button
					type="submit"
					className={buttonClasses}
					disabled={isActive}
				>
					+
				</button>
			</div>
		</form>
	)
}

export default AddTimer
