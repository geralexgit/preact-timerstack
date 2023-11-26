import { h } from 'preact'
import style from './style.css'
import CountdownTimer from '../../components/CountdownTimers/CountdownTimers'
import TimersList from '../../components/TimersList/TimersList'
import AddTimer from '../../components/AddTimer/AddTimer'

interface Timer {
	name: string
	duration: number
}
const Home = () => {
	return (
		<div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
			<TimersList />
			<AddTimer />
			<CountdownTimer />
		</div>
	)
}

export default Home
