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
		<div className="space-y-4 sm:space-y-8">
			{/* Main Timer Interface */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
				<div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
					<AddTimer />
					<TimersList />
				</div>
				<div className="order-1 lg:order-2">
					<CountdownTimer />
				</div>
			</div>
		</div>
	)
}

export default Home
