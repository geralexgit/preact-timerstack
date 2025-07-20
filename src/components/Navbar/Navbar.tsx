import { h, FunctionalComponent, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { useStoreon } from 'storeon/preact'
import SavedTimerLists from '../SavedTimerLists/SavedTimerLists'
import SoundSettings from '../SoundSettings/SoundSettings'
import { t } from '../../helpers/i18n'

const Navbar: FunctionalComponent = () => {
	const [showSavedLists, setShowSavedLists] = useState(false)
	const [showSoundSettings, setShowSoundSettings] = useState(false)
	const { status: { soundEnabled }, dispatch } = useStoreon('status')

	return (
		<Fragment>
			<nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
				<div className="container mx-auto px-3 sm:px-4 max-w-4xl">
					<div className="flex items-center justify-between h-16">
						{/* Logo/Title */}
						<div className="flex items-center space-x-3">
							<div className="text-2xl">⏱️</div>
							<h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
								{t('appTitle')}
							</h1>
						</div>

						{/* Navigation Items */}
						<div className="flex items-center space-x-2 sm:space-x-4">
							<button
								onClick={() => setShowSoundSettings(true)}
								className={`${
									soundEnabled 
										? 'bg-green-500 hover:bg-green-600' 
										: 'bg-gray-500 hover:bg-gray-600'
								} text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2`}
								title={t('soundSettings')}
							>
								<span>{soundEnabled ? '🔊' : '🔇'}</span>
								<span className="hidden sm:inline">{t('soundSettings')}</span>
							</button>

							<button
								onClick={() => setShowSavedLists(true)}
								className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
							>
								<span>💾</span>
								<span className="hidden sm:inline">{t('savedLists')}</span>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Sound Settings Modal */}
			{showSoundSettings && (
				<SoundSettings onClose={() => setShowSoundSettings(false)} />
			)}

			{/* Saved Timer Lists Modal */}
			{showSavedLists && (
				<SavedTimerLists onClose={() => setShowSavedLists(false)} />
			)}
		</Fragment>
	)
}

export default Navbar