import * as Tone from "tone";

class ToneGenerator {
    constructor() {
        this.oscillator = new Tone.Oscillator({
            frequency: 400,
            type: "sawtooth",
        });

        this.lowpassFilter = new Tone.Filter({
           frequency: 1000,
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

        this.masterFader = new Tone.Volume(-10);

        this.running = false;

        this.oscillator
            .connect(this.lowpassFilter)
            .connect(this.reverb)
            .connect(this.masterFader)
            .toDestination();
    }

    start() {
        Tone.start();
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
        this.lowpassFilter.frequency.value = lowpassFrequency;
        this.highpassFilter.frequency.value = highpassFrequency;
    }

    setFrequencyAndVolume(freq, volume) {
        this.masterFader.volume.value = volume;
        this.oscillator.frequency.value = freq;
    }

    setReverb(decayTime, wetMix) {
        this.reverb.decay = decayTime;
        this.reverb.wet.value = wetMix;
    }
}

export default ToneGenerator;