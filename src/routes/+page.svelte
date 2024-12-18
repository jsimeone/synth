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
                        class="{running ? 'bg-red-400' : 'bg-violet-400'} px-3 py-2 mt-2 rounded-sm"
                        onclick={toggleState}
                >{running ? "pause" : "begin"}</button>
                <p class="flex justify-center items-center text-gray-500 ml-5 pt-2">toggle generation</p>
            </div>
            <div class="flex">
                {#each waveShapes as shape}
                    <button
                            class="{currentWaveShape === shape ? 'bg-pink-400' : 'bg-blue-300'} px-3 py-2 mt-2 rounded-sm mr-2"
                            onclick={toggleWaveShape(shape)}
                    >{shape}</button>
                {/each}
                <p class="flex justify-center items-center text-gray-500 ml-3 pt-2">wave shape</p>
            </div>
        </div>
    </div>

    <div>
        <VolumeFrequencyBall generator={toneGenerator}>
            <div class="circle bg-violet-900 outline-4 outline outline-violet-400"></div>
        </VolumeFrequencyBall>
        <HighLowPassBall generator={toneGenerator}>
            <div class="circle bg-green-900 outline-4 outline outline-green-400"></div>
        </HighLowPassBall>
        <ReverbBall generator={toneGenerator}>
            <div class="circle bg-pink-900 outline-4 outline outline-pink-400"></div>
        </ReverbBall>
        <LFOBall generator={toneGenerator}>
            <div class="circle bg-yellow-900 outline-4 outline outline-yellow-400"></div>
        </LFOBall>
    </div>


    <!--        <Draggable>-->
    <!--            <div class="circle bg-cyan-900"></div>-->
    <!--        </Draggable>-->
</div>

<style>
    .circle {
        border-radius: 50%;
        height: 10vh;
        width: 10vh;
    }
</style>
