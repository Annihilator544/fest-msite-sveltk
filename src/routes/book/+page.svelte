<script>
	import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import sign from 'jwt-encode'

    import logo from '../../assets/falaksurgemd.png'

    import { signIn } from '@auth/sveltekit/client';
	import Popup from '$lib/book_pg/Popup.svelte';
	import BgAnim from '$lib/common/BGAnim.svelte';

    let popupSport = false
    let popupCultural = false
    let popupEsports = false

// @ts-nocheck
    // data contains the returned object from page.server.js
    // skeleton of object -> {top_pass: , payment: , origin: process.env.ORIGIN}
    export let data;


    let upgradeprice = "Unavailable"

    // logic to show the upgrade price if the pass is not of the type FULL_ACCESS
    // should also include a check for staff type pass
    
    

    /* what is the use of this check ? */
    // could possibly be to hide all the passes on the page
    if(browser){
        if(data.payment){
            document.body.style.overflowY = "hidden"
        }
    }

    // default values are provided to all parameters in this function
    const signURL = (type = "", refcode = "NA", phone = "0000000000") => {
        let payload = {
            type: type,
            refcode: "NA",
            contact: "+91" + phone,
            iat: new Date().getTime()
        }

        // @ts-ignore
        return sign(payload, $page.data.session?.user?.email)
    }

    const book = (Bevent) => {
        // whenever a booking event is fired an object is passed to this function
        let {detail: options} = Bevent
        if(!$page.data.session){
            signIn("google","/book?loginSuccess")
        }
        // the skeleton of the object is as below
        let {phnum, refcode, type} = options

        
        let signed = signURL(type, refcode, phnum)

        console.log(signed)
        // then the user is redirected to the payment page
        window.location.replace(data.origin + "/pay/" + signed)
    }

    
</script>
<div class=" bg-transparent min-h-screen h-fit flex items-center justify-center relative xl:gap-40 lg:gap-28 gap-5 md:flex-row flex-col max-md:mt-10">
    <BgAnim />
    {#if data.payment}
        <div class="fixed backdrop-blur-md top-0 left-0 z-[8] w-screen h-screen  flex items-center justify-center font-normal fadeinSlow ">
            <div class=" bg-[#FE786F] border-white border-[1px] p-4  md:whitespace-nowrap">
                <div class=" max-w-fit max-lg:max-w-screen-md max-md:text-sm text-center font-uni font-semibold text-white   text-2xl">
                    You already have a pending payment ({data.payment.ref_id})<br><a href={data.payment.short_url} class=" font-semibold border-b-2 hover:border-b-4 duration-200 hover:font-bold active:text-white border-[#4b2c59] ">Pay it</a> or <a data-sveltekit-preload-data="tap" href={"/cancelpayment/" + data.payment.ref_id} class=" font-semibold border-b-2 active:text-white hover:border-b-4 hover:font-bold duration-200 border-[#4b2c59]">Cancel the payment</a>
                    <br><div class=" mt-5">Already paid? <form method="POST"><input type="text" name="ref_id" value={data.payment.ref_id} hidden><button class="underline border-2 rounded-md p-2 border-[#4b2c59] mt-2 hover:scale-105 active:scale-95 transition-all duration-200">Refresh status</button></form></div>
                </div>
            </div>   
        </div>
    {/if}
    {#if popupSport}
        <Popup title="All accesss pass" innerText="Full access to everything in TechSolstice" category="SPORTS" on:close ={() => { popupSport = false}} on:book={book}/>
    {/if}
    {#if popupCultural}
            <Popup title="All accesss pass" innerText="Full access to everything in TechSolstice" category="CULTURAL" on:close ={() => { popupCultural = false}} on:book={book}/>
    {/if}
    {#if popupEsports}
            <Popup title="All accesss pass" innerText="Full access to everything in TechSolstice" category="ESPORTS" on:close ={() => { popupEsports = false}} on:book={book}/>
    {/if}
    

    <div>
        <div class="h-[300px] w-[250px] bg-[#238a80] flex flex-col-reverse items-center relative cardcultural">
            
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <div class=" w-fit mx-auto text-5xl text-[#FFE500] mb-24 font-monster">
                    CULTURAL
                </div> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class="  bg-white bg-opacity-50 hover:bg-opacity-70 focus:bg-opacity-70 font-monster text-[#04022A] font-bold capitalize duration-300 py-2 px-12  mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupCultural = true}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    Book now
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-3 text-center text-[#ffffff]">
                Your Canvas<br>for Cultural Brilliance.
            </div>
        </div>
    </div>

    <div>
        <div class=" cardsports h-[300px] w-[250px] bg-[#04022A]  flex flex-col-reverse items-center relative">
        
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <div class=" w-fit mx-auto text-5xl text-[#FFE500] mb-24 font-monster">
                    SPORTS
                </div> 
            </div>
            <div class=" relative opacity-100 text-white ">
                
                <button class=" opacity-70  bg-white bg-opacity-20 text-[#FFE500] font-monster font-bold capitalize duration-300 py-2 px-12  mb-24">
                    Closed
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-3 text-center text-[#ffffff]">
                Your arena<br>for sporting excellence.
            </div>
            
        </div>
    </div>
    
    <div>
        <div class="h-[300px] w-[250px] bg-[#bd0070] flex flex-col-reverse items-center relative cardesports">
            <!-- <div class="absolute top-0 right-0 p-4  text-md font-cstm text-white ">
                <img src = {logo} alt="logo" width="100px" class=" mx-auto mb-24 p-2"> 
            </div> -->
            <div class=" text-right w-full h-full absolute pt-4 text-2xl font-bold flex items-center align-middle ">
                <div class=" w-fit mx-auto text-5xl text-[#FFE500] mb-24 font-monster">
                    ESPORTS
                </div> 
            </div>
            <div class=" relative opacity-100 ">
                
                <button class="  bg-white bg-opacity-50 text-[#04022A] hover:bg-opacity-70 focus:bg-opacity-70 font-monster font-bold capitalize duration-300 py-2 px-12  mb-24" on:click={() => {if(!$page.data.session) {signIn("google","/book?loginSuccess")} else popupEsports = true}} >
                    {#if !$page.data.session}
                    SIGN IN
                    {:else}
                    Book now
                    {/if}
                </button> 
            </div>
            <div class=" absolute bottom-0 text-sm mb-3 text-center text-[#ffffff]">
                Your portal to<br>Digital Domination.
            </div>
        </div>
    </div>

</div>

<style>
        .fadeinSlow{
        animation-name: slowFadeIn;
        animation-duration: 1000ms;
        animation-iteration-count: 1;
        animation-fill-mode: forward;
    }
    

    @keyframes slowFadeIn{
            
            0%{
            transform: translateY(-50px);
            opacity: 0;
            }

            100%{
            transform: translateY(0px);
            opacity: 100%;
            }


    }

    .cardsports{
        will-change: filter, transform;
        transition: all  100ms ease-in-out; 
    }
    .cardsports:hover {
        transform: translateX(-5px) translateY(-5px);
        filter: drop-shadow(10px 10px #FFE500);
    }

    .cardcultural{
        will-change: filter, transform;
        transition: all  100ms ease-in-out; 
    }

    .cardcultural:hover{
        transform: translateX(-5px) translateY(-5px);
        filter: drop-shadow(10px 10px #FFE500);
    }
    .cardesports{
        will-change: filter, transform;
        transition: all  100ms ease-in-out; 
    }
    .cardesports:hover{
        transform: translateX(-5px) translateY(-5px);
        filter: drop-shadow(10px 10px #FFE500);
    }
    .cardsports:focus {
        transform: translateX(-5px) translateY(-5px);
        filter: drop-shadow(10px 10px #FFE500);
    }
    .cardcultural:focus{
        transform: translateX(-5px) translateY(-5px);
        filter: drop-shadow(10px 10px #FFE500);
    }
    .cardesports:focus{
        transform: translateX(-5px) translateY(-5px);
        filter: drop-shadow(10px 10px #FFE500);
    }

    li {
        text-align: left;
        padding-left: 20px;
    }

    .font-cstm{
        font-weight: 550;
    }

</style>
