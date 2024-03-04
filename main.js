let countinterval;
document.querySelector(".control-button span").onclick = function(){
    let name = window.prompt("Whats Your Name?");
    document.getElementById("welcome").play();
    if(name == null || name == ""){
        document.querySelector(".name span").innerHTML = "unknown";
    }else{
        document.querySelector(".name span").innerHTML = name;
    };
    document.querySelector(".control-button").remove();
    countDown(3);
}
// effect duration
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
// create array from game blocks
let blocks = Array.from(blocksContainer.children);
// create Range of keys
let orderRange = [...Array(blocks.length).keys()];
// shuffle array => swap  element by random()
shuffle(orderRange);

// add css order to block 

blocks.forEach((block,index)=>{
    
    block.style.order = orderRange[index];
    block.addEventListener('click',()=>{
        flipblock(block);
    })
});

function flipblock(selectBlock) {
    selectBlock.classList.add("isflibed");
    // select all flibed 
    let allFlibedBlock = blocks.filter((ele)=>ele.classList.contains("isflibed"));
    if(allFlibedBlock.length === 2){
        console.log("stopped");
        /// function to stop click
        stopClicking();

        // function to match blocks
        checkMatchBlock(allFlibedBlock[0],allFlibedBlock[1]);
    }
}
function stopClicking(){
    blocksContainer.classList.add("no-clicking");
    setTimeout(()=>{
        blocksContainer.classList.remove("no-clicking");
    },duration);
}
function checkMatchBlock(blockOne,blockTwo){
    let tries = document.querySelector(".tries span");
    if(blockOne.dataset.technology === blockTwo.dataset.technology){
        blockOne.classList.remove('isflibed');
        blockTwo.classList.remove('isflibed');
        blockOne.classList.add('ismatched');
        blockTwo.classList.add('ismatched');
        document.getElementById("success").play();
    }else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(()=>{
            blockOne.classList.remove('isflibed');
            blockTwo.classList.remove('isflibed');
        },duration);
        document.getElementById("fail").play();
    }
  

}
function shuffle(array){
    /// swap 
    let current = array.length,
    ran,
    temp;
    while(current > 0){
        ran = Math.floor(Math.random()*current);
        current--;
        temp = array[current];
        array[current] = array[ran];
        array[ran] = temp;
    }
    return array;
}
function countDown(duration){
    countinterval = setInterval(()=>{
        let minutes = parseInt(duration / 60);
        let second = parseInt(duration % 60);
        minutes < 10 ? `0${minutes}`: minutes;
        second < 10 ? `0${second}`: second;
        if(--duration < 0){
            clearInterval(countinterval);
            minutes = "00";
            second = "00";
            document.querySelector(".game-over").style.display = "block";
        }
        document.querySelector(".timer").innerHTML = `${minutes}:${second}`
    },1000)
  
}
