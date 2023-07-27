import { h } from 'preact'
import style from './style.css'
import CountdownTimer from '../../components/CountdownTimers/CountdownTimers'

interface Timer {
	name: string
	duration: number
}
const Home = () => {
	const timers: Timer[] = [
		{ name: 'Timer 1', duration: 5 },
		{ name: 'Timer 2', duration: 6 },
		{ name: 'Timer 3', duration: 7 },
	]
	return (
		<div class={style.home}>
			<CountdownTimer timers={timers} />
		</div>
	)
}

export default Home
