export const voiseMsg = (msg: string) => {
	const utterance = new SpeechSynthesisUtterance(msg)
	speechSynthesis.speak(utterance)
}
