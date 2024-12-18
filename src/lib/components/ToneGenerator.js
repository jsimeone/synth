import * as Tone from "tone";

class ToneGenerator {
    constructor() {
        this.oscillator = new Tone.Oscillator({
            frequency: 400,
            type: "sine",
        });

        this.lowpassFilter = new Tone.Filter({
            frequency: 500,
            type: "lowpass",
            rolloff: -12,
        });

        this.highpassFilter = new Tone.Filter({
            frequency: 1000,
            type: "highpass",
            rolloff: -12,
        });

        this.reverb = new Tone.Reverb({
            decay: 2,
            preDelay: 0.1,
            wet: 0.2,
        });

        // FLANGER stuff
        this.delay = new Tone.FeedbackDelay({
            delayTime: 0.005, // Initial very short delay (5ms)
            feedback: 0.5 // Feedback to create resonance
        });

        this.lfo = new Tone.LFO({
            frequency: 0.5, // Modulation rate (Hz)
            min: 0.001, // Minimum delay time
            max: 0.02   // Maximum delay time
        });

        this.running = false;
        this.connectNodes();
    }

    connectNodes() {
        this.oscillator.connect(this.lowpassFilter);
        this.lowpassFilter.connect(this.highpassFilter);
        this.highpassFilter.connect(this.reverb);
        this.reverb.toDestination();

        // this.reverb.connect(this.lfo);
        // this.lfo.connect(this.delay.delayTime);
        // this.delay.toDestination();
    }

    start() {
        this.oscillator.start();
        this.running = true;
    }

    stop() {
        this.oscillator.stop();
        this.running = false;
    }

    setWaveShape(shape) {
        this.oscillator.type = shape;
    }

    setPassFrequencies(lowpassFrequency, highpassFrequency) {
        const boundFrequency = (freq) => Math.min(Math.max(freq, 20), 20000);
        this.lowpassFilter.frequency.value = boundFrequency(lowpassFrequency);
        this.highpassFilter.frequency.value = boundFrequency(highpassFrequency);
    }

    setFrequencyAndVolume(freq, volume) {
        this.oscillator.volume.rampTo(volume, 0.1);
        this.oscillator.frequency.rampTo(freq, 0.1);
    }

    setReverb(decayTime, wetMix) {
        this.reverb.decay = Math.max(decayTime, 0.01);
        this.reverb.wet.value = Math.min(Math.max(wetMix, 0.01), 1);
    }

    setLFO(freq, feedback) {
        this.lfo.frequency.value = freq;
        this.delay.feedback.value = feedback;
    }
}

export default ToneGenerator;