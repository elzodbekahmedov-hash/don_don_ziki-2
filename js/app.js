import { elAdvenced, elBasic, elScore ,  elGameZone, elHands, elModeChangerButton, elRefreshGameButton, elResultZone, elRobot, elUser } from "./html-elements.js";


let activeMode = "basic"



// robot Choose
function robotChoose() {
    let hands = ["rock","paper","scissors",]
    const randomIndex = Math.trunc(Math.random() * hands.length)
    return hands[randomIndex]
}

// mod changer
function modeChanger() {
    if(activeMode === "basic") {
        activeMode = "advenced"
        elAdvenced.style.display = "none"
        elBasic.style.display = "grid"
        elModeChangerButton.innerText = "Basic"
    }else {
        activeMode = "basic"
        elAdvenced.style.display = "grid"
        elBasic.style.display = "none"
        elModeChangerButton.innerText = "Advenced"
    }
}

// change zone
function swapZone(boolean){
    if(boolean){
        elGameZone.style.display = "none"
        elResultZone.style.display = "flex"
    }else{
        elGameZone.style.display = "flex"
        elResultZone.style.display = "none"
    }
}

// find winner
function checkWinner(user , robot){
    const actions = {
        paper: {
            paper: "TIE",
            scissors: "YOU LOSE" ,
            rock: "YOU WIN" ,
            spock: "YOU WIN" ,
            lizard: "YOU LOSE" ,
        },
        scissors: {
            scissors: "TIE",
            paper: "YOU WIN" ,
            rock: "YOU LOSE" ,
            spock: "YOU LOSE" ,
            lizard: "YOU WIN" ,
        },
        rock: {
            rock: "TIE",
            paper: "YOU LOSE" ,
            scissors: "YOU WIN" ,
            spock: "YOU LOSE" ,
            lizard: "YOU WIN" ,
        },
        spok: {
            spock: "TIE",
            paper: "YOU LOSE" ,
            scissors: "YOU WIN" ,
            rock: "YOU WIN" ,
            lizard: "YOU LOSE" ,
        },
        lizard: {
            lizard: "TIE",
            paper: "YOU WIN" ,
            scissors: "YOU LOSE" ,
            rock: "YOU LOSE" ,
            spock: "YOU WIN" ,
        },
    }

    return actions[user][robot];
 }

// hands
elHands.forEach((elHand) => {
    elHand.addEventListener("click", (evt) => {
        swapZone(true)
        const user = evt.target.alt
        const robot = robotChoose()

        elUser.src = evt.target.src
        elRobot.src = "./img/choosing.svg"

        setTimeout(() => {
            elRobot.src = `./img/${robot}.svg`
            const winner = checkWinner(user , robot)
            if(winner === "YOU WIN" ) changeScore();
        }, 1000);
    } )
})

// refresh game
elRefreshGameButton.addEventListener("click",() => {
    swapZone(false)
})

// change score
function changeScore() {
    elScore.innerText = +elScore.innerText + 1   
}

elModeChangerButton.addEventListener("click" , modeChanger)


modeChanger()