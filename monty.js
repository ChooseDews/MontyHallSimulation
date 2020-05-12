function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function constructDoors(){
    let index = getRandomInt(3);
    let doors = [0, 0, 0];
    doors[index] = 1;
    return doors;
}

function percentWin(boolArray){
    let wins = boolArray.filter(x=>x)
    return wins.length/boolArray.length
}

function run(changeDecision){
    let doors = constructDoors();
    let guess = getRandomInt(3);
    let revealed;

    if(doors[guess] === 1){ 
        //initial guess correct
        if(changeDecision === true) return false;
        return true;
    }
    //initial guess wrong
    if(changeDecision === false) return false;

    //initial guess wrong + decision change
    for(let i in doors){
            let door = doors[i];
            if(door === 0 && i != guess) revealed =  i;
    }
    let guess2
    if(changeDecision){
        let options = [0, 1, 2];
        for(let option of options){
            if(option != guess && option != revealed) guess2 = option;
        }
    }
    return doors[guess2] === 1
}


module.exports = run;

