<script>
    import BgAnim from "$lib/common/BGAnim.svelte";
import Carousel from "../../lib/mypass_pg/Carousel.svelte";
    export let data;
    /**
	 * @type {any[]}
	 */
    let passstrArr = []
    /**
	 * @type {any[]}
	 */
    let passtypeArr = []

    if(data.passes){
        for(let i in data.passes){
            passstrArr.push(data.passes[i].token)
            passtypeArr.push(data.passes[i].type)
        }
    }
</script>
<BgAnim />
<div class="h-screen w-screen">
    <Carousel codeDataArr = {passstrArr} typeArr={passtypeArr} />
</div>


