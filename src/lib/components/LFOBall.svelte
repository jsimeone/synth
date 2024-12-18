<script>
    let { oscillator, children } = $props();

    let left = $state(600);
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
        if (oscillator == null) {
            console.log("No oscillator found.");
        } else {
            oscillator.set({
                frequency: left,
                volume: (-top / 25) + 0.1
            });
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