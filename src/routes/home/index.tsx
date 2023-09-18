import { h } from 'preact'
import { useStoreon } from 'storeon/preact'
import { Route } from 'preact-router'
import Match from 'preact-router/match'
import { Link } from 'preact-router/match'
import style from './style.css'
import CountdownTimer from '../../components/CountdownTimers/CountdownTimers'
import TimersList from '../../components/TimersList/TimersList'
import AddTimer from '../../components/AddTimer/AddTimer'

const Home = () => {
	const { timers } = useStoreon('timers')
	const timerLists = Object.keys(timers)
	return (
		<div class={style.home}>
			{timerLists.map((key) => (
				<Link href={key}>{key}</Link>
			))}
			{timerLists.map((key) => (
				<Route key={key} component={TimersList} path={`/${key}`} />
			))}
			{/* <TimersList key={key} listName={key} timers={timers} /> */}
			<AddTimer />
			<CountdownTimer />
		</div>
	)
}

export default Home
