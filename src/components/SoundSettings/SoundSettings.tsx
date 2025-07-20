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
	const { status: { soundEnabled, soundType }, dispatch } = useStoreon('status')

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

	return (
		<Modal
			isOpen={true}
			onClose={onClose}
			title={t('soundSettings')}
			maxWidth="md"
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
						className={`${
							soundEnabled 
								? 'bg-green-500 hover:bg-green-600' 
								: 'bg-gray-400 hover:bg-gray-500'
						} text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2`}
					>
						<span>{soundEnabled ? '🔊' : '🔇'}</span>
						<span>{soundEnabled ? t('on') : t('off')}</span>
					</button>
				</div>

				{/* Sound Type Selection */}
				{soundEnabled && (
					<div className="space-y-4">
						<div>
							<h4 className="font-medium text-gray-900 dark:text-white mb-2">
								{t('chooseSoundType')}
							</h4>
							<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
								{t('soundTypeDescription')}
							</p>
						</div>
						
						<div className="space-y-3">
							<label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
								<input
									type="radio"
									name="soundType"
									value="voice"
									checked={soundType === 'voice'}
									onChange={() => handleSoundTypeChange('voice')}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<span className="text-lg">🗣️</span>
											<div>
												<div className="font-medium text-gray-900 dark:text-gray-300">
													{t('voiceAnnouncement')}
												</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">
													{t('voiceDescription')}
												</div>
											</div>
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) voiseMsg('Timer completed')
											}}
											className="text-sm text-blue-500 hover:text-blue-700 underline px-2 py-1"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</div>
							</label>

							<label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
								<input
									type="radio"
									name="soundType"
									value="chord1"
									checked={soundType === 'chord1'}
									onChange={() => handleSoundTypeChange('chord1')}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<span className="text-lg">🎹</span>
											<div>
												<div className="font-medium text-gray-900 dark:text-gray-300">
													{t('pianoChord')} (C Major)
												</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">
													{t('pianoChordDescription')}
												</div>
											</div>
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) playCompletionChord()
											}}
											className="text-sm text-blue-500 hover:text-blue-700 underline px-2 py-1"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</div>
							</label>

							<label className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
								<input
									type="radio"
									name="soundType"
									value="chord2"
									checked={soundType === 'chord2'}
									onChange={() => handleSoundTypeChange('chord2')}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<span className="text-lg">🎵</span>
											<div>
												<div className="font-medium text-gray-900 dark:text-gray-300">
													{t('alternativeChord')} (G Major)
												</div>
												<div className="text-sm text-gray-600 dark:text-gray-400">
													{t('alternativeChordDescription')}
												</div>
											</div>
										</div>
										<button
											onClick={(e) => {
												e.preventDefault()
												if (soundEnabled) playAlternativeChord()
											}}
											className="text-sm text-blue-500 hover:text-blue-700 underline px-2 py-1"
											disabled={!soundEnabled}
										>
											{t('preview')}
										</button>
									</div>
								</div>
							</label>
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