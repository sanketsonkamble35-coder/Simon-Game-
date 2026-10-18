let userseq=[];
let gameseq=[];
let btns=['yellow','red','purple','green'];
let started=false;
let level=0;
let h2=document.querySelector("h2");
let gameBoard=document.querySelector("#game-board");
let easyButton=document.querySelector("#easy");
let hardButton=document.querySelector("#hard");
let difficulty="easy";

function setDifficulty(selectedDifficulty){
    difficulty=selectedDifficulty;
    gameBoard.classList.toggle("hard-mode", difficulty==="hard");
    easyButton.classList.toggle("selected", difficulty==="easy");
    hardButton.classList.toggle("selected", difficulty==="hard");
}

easyButton.addEventListener("click",function(){
    setDifficulty("easy");
});

hardButton.addEventListener("click",function(){
    setDifficulty("hard");
});

setDifficulty("easy");

document.addEventListener("keypress",function(){
    if (started==false){
        console.log("Game started..")
        started=true;
    }
    levelup();
})


function gameflash(btn){
    let flashClass=difficulty==="hard" ? "text-flash" : "flash";
    btn.classList.add(flashClass);
    setTimeout(function(){
        btn.classList.remove(flashClass);
    },250);
}




function userflash(btn){
    let flashClass=difficulty==="hard" ? "text-flash" : "userflash";
    btn.classList.add(flashClass);
    setTimeout(function(){
        btn.classList.remove(flashClass);
    },200);
}




function levelup(){
    userseq=[];

    level++;
    h2.innerText=`level:${level}`;
    let random=Math.floor(Math.random()*4);
    let randomColor=btns[random]
    let randomBtn=document.querySelector(`.${randomColor}`)
    // console.log(random)
    // console.log(randomColor)
    // console.log(randomBtn)

    gameseq.push(randomColor)
    console.log(gameseq)
    gameflash(randomBtn);
}


function checkans(idx){
    // console.log("current level",level);
    // let idx=level-1;
    if (userseq[idx]===gameseq[idx])
    {
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000)
            // levelup();
        }

    }
    else{
        h2.innerHTML=`Game Over! Your Score Was:<b> ${level}</b> <br> Press any key to restart---`
        document.body.classList.add("game-over");
        setTimeout(function(){
            document.body.classList.remove("game-over");
        },1500);
        reset();
    }
}


function btnPress(){
    console.log("this")
   let btn=this;  // console.log("button was pressed");
   userflash(btn) ;

   let usercolor=btn.getAttribute("id");
//    console.log(usercolor)
    userseq.push(usercolor);
    console.log(userseq);
checkans(userseq.length-1);
}


let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress)
}

function reset(){
    gameseq=[];
    started=false;
    userseq=[];
    level=0;
}