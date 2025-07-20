// Web Audio API synthesizer for playing piano chords
export const playCompletionChord = () => {
    try {
        // Create audio context
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

        // Piano chord frequencies (C Major chord: C4, E4, G4, C5)
        const frequencies = [261.63, 329.63, 392.00, 523.25]

        // Create and play each note in the chord
        frequencies.forEach((frequency, index) => {
            // Create oscillator for each note
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            // Connect oscillator to gain to speakers
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            // Configure oscillator (piano-like sound)
            oscillator.type = 'triangle' // Softer than square, warmer than sine
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

            // Configure envelope (attack, decay, sustain, release)
            const now = audioContext.currentTime
            const attackTime = 0.1
            const decayTime = 0.3
            const sustainLevel = 0.3
            const releaseTime = 1.0

            // Volume envelope for piano-like sound
            gainNode.gain.setValueAtTime(0, now)
            gainNode.gain.linearRampToValueAtTime(0.3, now + attackTime) // Attack
            gainNode.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime) // Decay
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + attackTime + decayTime + releaseTime) // Release

            // Start and stop the oscillator
            oscillator.start(now)
            oscillator.stop(now + attackTime + decayTime + releaseTime)
        })

        // Clean up audio context after playing
        setTimeout(() => {
            audioContext.close()
        }, 2000)

    } catch (error) {
        console.warn('Audio synthesis not supported:', error)
        // Fallback to a simple beep if Web Audio API fails
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

            oscillator.start()
            oscillator.stop(audioContext.currentTime + 0.5)

            setTimeout(() => audioContext.close(), 1000)
        } catch (fallbackError) {
            console.warn('Audio not supported')
        }
    }
}

// Alternative chord progressions for variety
export const playSuccessChord = () => {
    try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

        // F Major chord (F4, A4, C5) - sounds more triumphant
        const frequencies = [349.23, 440.00, 523.25]

        frequencies.forEach((frequency) => {
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.type = 'triangle'
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

            const now = audioContext.currentTime
            gainNode.gain.setValueAtTime(0, now)
            gainNode.gain.linearRampToValueAtTime(0.25, now + 0.1)
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.2)

            oscillator.start(now)
            oscillator.stop(now + 1.2)
        })

        setTimeout(() => audioContext.close(), 2000)
    } catch (error) {
        console.warn('Audio synthesis not supported:', error)
    }
}