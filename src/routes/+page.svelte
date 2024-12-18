<script>
    import ToneGenerator from "$lib/components/ToneGenerator.js";
    import VolumeFrequencyBall from "$lib/components/VolumeFrequencyBall.svelte";
    import HighLowPassBall from "$lib/components/HighLowPassBall.svelte";
    import ReverbBall from "$lib/components/ReverbBall.svelte";
    import LFOBall from "$lib/components/LFOBall.svelte";

    let toneGenerator = null;
    let running = false;

    function toggleState() {
        if (toneGenerator === null) {
            toneGenerator = new ToneGenerator();
            toggleState();
        } else {
            if (toneGenerator.running) {
                toneGenerator.stop();
                running = false;
            } else {
                toneGenerator.start();
                running = true;
            }
        }
    }

    let currentWaveShape = "sine";
    let waveShapes = ["sine", "sawtooth", "triangle"];

    function toggleWaveShape(newType) {
        toneGenerator.setWaveShape(newType);
        currentWaveShape = newType;
    }
</script>

<div class="max-h-screen">
    <div class="inline-flex m-20 mt-50">
        <div>
            <h1 class="font-bold text-5xl text-slate-900">web synth</h1>
            <p class="text-slate-600 text-xl mt-2">music 270 final project with Professor Ryan Carter</p>
            <div class="flex">
                <button
                        class="bg-gradient-to-r {running ? 'from-red-500 to-red-400' : 'from-violet-500 to-violet-400'} hover:opacity-90 px-3 py-2 transition-all duration-300 mt-2 rounded-sm"
                        onclick={toggleState}
                >{running ? "pause" : "begin"}</button>
                <p class="flex justify-center items-center text-gray-500 ml-5 pt-2">toggle generation</p>
            </div>
            <div class="flex">
                {#each waveShapes as shape}
                    <button
                            class="bg-gradient-to-r {currentWaveShape === shape ? ' from-pink-500 to-pink-400' : 'from-blue-500 to-blue-300'} hover:opacity-90 transition-all duration-300 px-3 py-2 mt-2 rounded-sm mr-2"
                            onclick={() => toggleWaveShape(shape)}
                    >{shape}</button>
                {/each}
                <p class="flex justify-center items-center text-gray-500 ml-3 pt-2">wave shape</p>
            </div>
        </div>
    </div>

    <div>
        <VolumeFrequencyBall generator={toneGenerator}>
            <div class="hover:opacity-90 circle volume outline-4 outline outline-violet-400"></div>
        </VolumeFrequencyBall>
        <HighLowPassBall generator={toneGenerator}>
            <div class="hover:opacity-90 circle pass outline-4 outline outline-green-400"></div>
        </HighLowPassBall>
        <ReverbBall generator={toneGenerator}>
            <div class="hover:opacity-90 circle reverb outline-4 outline outline-pink-400"></div>
        </ReverbBall>
        <LFOBall generator={toneGenerator}>
            <div class="hover:opacity-90 circle lfo outline-4 outline outline-yellow-400"></div>
        </LFOBall>
    </div>
</div>

<style>
    .circle {
        width: 125px;
        height: 125px;
        border-radius: 50%;
        box-shadow: 20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;
        transition: all 0.3s ease;
    }

    .circle.volume {
        background: linear-gradient(145deg, #5000f1, #c19cfb);
    }

    .circle.reverb {
        background: linear-gradient(145deg, #b3009b, #f080ff);
    }

    .circle.lfo {
        background: linear-gradient(145deg, #b59000, #ffe9a1);
    }

    .circle.pass {
        background: linear-gradient(145deg, #008339, #71ff7d);
    }

    /* Hover effect */
    .circle:hover {
        transform: scale(1.05);
        box-shadow: 25px 25px 75px #bebebe,
        -25px -25px 75px #ffffff;
    }
</style>
