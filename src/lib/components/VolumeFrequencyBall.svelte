<script>
    let { generator, children } = $props();

    let left = $state(300);
    let top = $state(500);

    let moving = false;

    function onMouseDown() {
        moving = true;
    }

    function onMouseMove(event) {
        if (moving) {
            left += event.movementX;
            top += event.movementY;
        }
    }

    function onMouseUp() {
        moving = false;
    }

    // Tone stuff
    $effect(() => {
        if (generator !== null) {
            generator.setFrequencyAndVolume(left, (-top / 25) + 0.1);
        }
    });
</script>

<style>
    .draggable {
        user-select: none;
        cursor: move;
        position: absolute;
    }
</style>

<button onmousedown={onMouseDown} style="left: {left}px; top: {top}px;" class="draggable">
    {@render children()}
</button>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove}/>