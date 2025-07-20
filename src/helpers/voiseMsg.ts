import { getLanguage } from './i18n'

// Function to detect if text contains Cyrillic characters (Russian)
const detectTextLanguage = (text: string): 'ru' | 'en' => {
	// Check for Cyrillic characters (Russian alphabet)
	const cyrillicPattern = /[\u0400-\u04FF]/

	if (cyrillicPattern.test(text)) {
		return 'ru'
	}

	// Default to English if no Cyrillic characters found
	return 'en'
}

// Function to get the best voice for a specific language
const getVoiceForLanguage = (lang: 'ru' | 'en') => {
	const voices = speechSynthesis.getVoices()

	if (lang === 'ru') {
		// Try to find Russian voice
		return voices.find(voice =>
			voice.lang.startsWith('ru') && voice.localService
		) || voices.find(voice =>
			voice.lang.startsWith('ru')
		) || null
	} else {
		// Try to find English voice
		return voices.find(voice =>
			voice.lang.startsWith('en') && voice.localService
		) || voices.find(voice =>
			voice.lang.startsWith('en')
		) || null
	}
}

export const voiseMsg = (msg: string) => {
	const utterance = new SpeechSynthesisUtterance(msg)

	// Detect the language of the specific timer name
	const detectedLang = detectTextLanguage(msg)

	// Configure speech settings for better clarity
	utterance.pitch = 1.0       // Normal pitch
	utterance.volume = 0.8      // Fixed volume level

	// Set language-specific voice and speech rate based on timer name content
	const preferredVoice = getVoiceForLanguage(detectedLang)

	if (detectedLang === 'ru') {
		utterance.lang = 'ru-RU'
		utterance.rate = 1        // Normal speech rate for Russian
	} else {
		utterance.lang = 'en-US'
		utterance.rate = 0.8        // Slower speech rate for English
	}

	// Apply the preferred voice if found
	if (preferredVoice) {
		utterance.voice = preferredVoice
	}

	speechSynthesis.speak(utterance)
}

// Function to get available voices for debugging
export const getAvailableVoices = () => {
	const voices = speechSynthesis.getVoices()
	console.log('Available voices:', voices.map(voice => ({
		name: voice.name,
		lang: voice.lang,
		localService: voice.localService
	})))
	return voices
}
