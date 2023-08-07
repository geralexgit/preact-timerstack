import { h, FunctionalComponent } from 'preact'
import styles from './ProgressBar.module.css'
import { useStoreon } from 'storeon/preact'

const ProgressBar: FunctionalComponent = () => {
	const {
		timers,
		status: {
			currentIndex,
			isActive,
			timeLeft,
			totalProgressPrecent,
			totalProgress,
		},
		dispatch,
	} = useStoreon('timers', 'status')
	return (
		<div className={styles.ProgressBar}>
			<div
				className={styles.Progress}
				style={`width: ${timers[currentIndex]?.progressPrecent}%`}
			></div>
			<div
				className={`${styles.Progress} ${styles.TotalProgress}`}
				style={`width: ${totalProgressPrecent}%`}
			></div>
		</div>
	)
}

export default ProgressBar
