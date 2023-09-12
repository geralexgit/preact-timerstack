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
		<form onSubmit={onSubmit}>
			<input
				type="text"
				value={formValues?.name}
				data-name="name"
				onInput={onInput}
				required
			/>
			<input
				type="number"
				value={formValues?.minutes}
				defaultValue="0"
				data-name="minutes"
				onInput={onInput}
				max={99}
			/>
			<input
				type="number"
				value={formValues?.seconds}
				data-name="seconds"
				defaultValue="0"
				onInput={onInput}
				max={60}
			/>
			<button type="submit" disabled={isActive}>
				Add
			</button>
		</form>
	)
}

export default AddTimer
