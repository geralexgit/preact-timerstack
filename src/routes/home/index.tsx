import { h } from 'preact'
import style from './style.css'
import CountdownTimer from '../../components/CountdownTimers/CountdownTimers'
import TimersList from '../../components/TimersList/TimersList'
import AddTimer from '../../components/AddTimer/AddTimer'
import SavedTimerLists from '../../components/SavedTimerLists/SavedTimerLists'

interface Timer {
	name: string
	duration: number
}
const Home = () => {
	return (
		<div className="space-y-8">
			{/* Saved Timer Lists - Full Width */}
			<SavedTimerLists />
			
			{/* Main Timer Interface */}
			<div className="grid lg:grid-cols-2 gap-8">
				<div className="space-y-6">
					<TimersList />
					<AddTimer />
				</div>
				<div>
					<CountdownTimer />
				</div>
			</div>
		</div>
	)
}

export default Home
