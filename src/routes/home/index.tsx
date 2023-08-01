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
		<div class={style.home}>
			<TimersList />
			<AddTimer />
			<CountdownTimer />
		</div>
	)
}

export default Home
