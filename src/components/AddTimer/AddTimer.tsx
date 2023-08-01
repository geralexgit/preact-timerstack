import { h, FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'

const AddTimer = () => {
	const { dispatch } = useStoreon('timers')
	const [formValues, setFormValues] =
		useState<Record<string, string | number>>()

	const onSubmit = (e) => {
		e.preventDefault()
		const id = Date.now()
		const duration =
			Number(formValues.minutes) * 60 + Number(formValues.seconds)
		const name = formValues.name
		const updatedValues = {
			id,
			duration,
			name,
		}
		dispatch('timer/add', updatedValues)
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
			/>
			<input
				type="number"
				value={formValues?.minutes}
				data-name="minutes"
				onInput={onInput}
				max={99}
			/>
			<input
				type="number"
				value={formValues?.seconds}
				data-name="seconds"
				onInput={onInput}
				max={60}
			/>
			<button type="submit">Submit</button>
		</form>
	)
}

export default AddTimer
