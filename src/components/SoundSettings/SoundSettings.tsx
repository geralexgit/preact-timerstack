import { h, FunctionalComponent } from 'preact'
import { useStoreon } from 'storeon/preact'
import { playCompletionChord, playAlternativeChord } from '../../helpers/audioSynth'
import { voiseMsg } from '../../helpers/voiseMsg'
import { t } from '../../helpers/i18n'
import Modal from '../Modal/Modal'

interface SoundSettingsProps {
	onClose: () => void
}

const SoundSettings: FunctionalComponent<SoundSettingsProps> = ({ onClose }) => {
	const { status: { soundEnabled, soundType, completionSoundType }, dispatch } = useStoreon('status')

	const handleSoundTypeChange = (newType: 'voice' | 'chord1' | 'chord2') => {
		dispatch('timer/setSoundType', newType)

		// Play a preview of the selected sound
		if (soundEnabled) {
			switch (newType) {
				case 'voice':
					voiseMsg('Timer completed')
					break
				case 'chord1':
					playCompletionChord()
					break
				case 'chord2':
					playAlternativeChord()
					break
			}
		}
	}

	const handleCompletionSoundTypeChange = (newType: 'voice' | 'chord1' | 'chord2') => {
		dispatch('timer/setCompletionSoundType', newType)

		// Play a preview of the selected sound
		if (soundEnabled) {
			switch (newType) {
				case 'voice':
					voiseMsg('All timers completed')
					break
				case 'chord1':
					playCompletionChord()
					break
				case 'chord2':
					playAlternativeChord()
					break
			}
		}
	}

	return (
		<Modal
			isOpen={true}
			onClose={onClose}
			title={t('soundSettings')}
			maxWidth="2xl"
		>
			<div className="space-y-6">
				{/* Sound Enable/Disable */}
				<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
					<div>
						<h4 className="font-medium text-gray-900 dark:text-white">
							{t('enableSound')}
						</h4>
						<p className="text-sm text-gray-600 dark:text-gray-300">
							{t('enableSoundDescription')}
						</p>
					</div>
					<button
						onClick={() => dispatch('timer/toggleSound')}
						className={`${soundEnabled
								? 'bg-green-500 hover:bg-green-600'
								: 'bg-gray-400 hover:bg-gray-500'
							} text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2`}
					>
						<span>{soundEnabled ? '🔊' : '🔇'}</span>
						<span>{soundEnabled ? t('on') : t('off')}</span>
					</button>
				</div>

				{/* Sound Type Selection - Two Column Layout */}
				{soundEnabled && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Individual Timer Sound */}
						<div className="space-y-4">
							<div>
								<h4 className="font-medium text-gray-900 dark:text-white mb-2">
									{t('individualTimerSound')}
								</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
									{t('individualTimerSoundDescription')}
								</p>
							</div>

							<div className="space-y-3">
								<label className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
									<input
										type="radio"
										name="soundType"
										value="voice"
										checked={soundType === 'voice'}
										onChange={() => handleSoundTypeChange('voice')}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center space-x-2 mb-2">
											<span className="text-lg">🗣️</span>
											<div className="font-medium text-gray-900 dark:text-gray-300">
												{t('voiceAnnouncement')}
											</div>
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
											{t('voiceDescription')}
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) voiseMsg('Timer completed')
											}}
											className="text-xs text-blue-500 hover:text-blue-700 underline"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</label>

								<label className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
									<input
										type="radio"
										name="soundType"
										value="chord1"
										checked={soundType === 'chord1'}
										onChange={() => handleSoundTypeChange('chord1')}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center space-x-2 mb-2">
											<span className="text-lg">🎹</span>
											<div className="font-medium text-gray-900 dark:text-gray-300">
												{t('pianoChord')} (C Major)
											</div>
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
											{t('pianoChordDescription')}
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) playCompletionChord()
											}}
											className="text-xs text-blue-500 hover:text-blue-700 underline"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</label>

								<label className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
									<input
										type="radio"
										name="soundType"
										value="chord2"
										checked={soundType === 'chord2'}
										onChange={() => handleSoundTypeChange('chord2')}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center space-x-2 mb-2">
											<span className="text-lg">🎵</span>
											<div className="font-medium text-gray-900 dark:text-gray-300">
												{t('alternativeChord')} (G Major)
											</div>
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
											{t('alternativeChordDescription')}
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) playAlternativeChord()
											}}
											className="text-xs text-blue-500 hover:text-blue-700 underline"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</label>
							</div>
						</div>

						{/* All Timers Completion Sound */}
						<div className="space-y-4">
							<div>
								<h4 className="font-medium text-gray-900 dark:text-white mb-2">
									{t('allTimersCompletionSound')}
								</h4>
								<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
									{t('allTimersCompletionSoundDescription')}
								</p>
							</div>

							<div className="space-y-3">
								<label className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
									<input
										type="radio"
										name="completionSoundType"
										value="voice"
										checked={completionSoundType === 'voice'}
										onChange={() => handleCompletionSoundTypeChange('voice')}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center space-x-2 mb-2">
											<span className="text-lg">🗣️</span>
											<div className="font-medium text-gray-900 dark:text-gray-300">
												{t('voiceAnnouncement')}
											</div>
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
											{t('voiceCompletionDescription')}
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) voiseMsg('All timers completed')
											}}
											className="text-xs text-blue-500 hover:text-blue-700 underline"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</label>

								<label className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
									<input
										type="radio"
										name="completionSoundType"
										value="chord1"
										checked={completionSoundType === 'chord1'}
										onChange={() => handleCompletionSoundTypeChange('chord1')}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center space-x-2 mb-2">
											<span className="text-lg">🎹</span>
											<div className="font-medium text-gray-900 dark:text-gray-300">
												{t('pianoChord')} (C Major)
											</div>
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
											{t('pianoChordDescription')}
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) playCompletionChord()
											}}
											className="text-xs text-blue-500 hover:text-blue-700 underline"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</label>

								<label className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
									<input
										type="radio"
										name="completionSoundType"
										value="chord2"
										checked={completionSoundType === 'chord2'}
										onChange={() => handleCompletionSoundTypeChange('chord2')}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center space-x-2 mb-2">
											<span className="text-lg">🎵</span>
											<div className="font-medium text-gray-900 dark:text-gray-300">
												{t('alternativeChord')} (G Major)
											</div>
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
											{t('alternativeChordDescription')}
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) playAlternativeChord()
											}}
											className="text-xs text-blue-500 hover:text-blue-700 underline"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</label>
							</div>
						</div>
					</div>
				)}

				{/* Close Button */}
				<div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
					<button
						onClick={onClose}
						className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
					>
						{t('done')}
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default SoundSettings