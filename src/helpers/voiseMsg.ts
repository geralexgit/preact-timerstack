export const voiseMsg = (msg: string) => {
	const utterance = new SpeechSynthesisUtterance(msg)

	// Configure speech settings for better clarity
	utterance.rate = 0.6        // Slower speech rate (default is 1)
	utterance.pitch = 1.0       // Normal pitch
	utterance.volume = 0.8      // Fixed volume level

	// Optional: Set a specific voice if available
	const voices = speechSynthesis.getVoices()
	const preferredVoice = voices.find(voice =>
		voice.lang.startsWith('en') && voice.localService
	)
	if (preferredVoice) {
		utterance.voice = preferredVoice
	}

	speechSynthesis.speak(utterance)
}
