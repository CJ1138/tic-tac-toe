//Gameboard module
const gameboard = (() =>{

const gameSquares = document.querySelectorAll(".game-square");

gameSquares.forEach((item, index) => gameSquares[index].addEventListener('click', makeMove));

let currentMarker = 'X';

function makeMove(e){
    if (this.innerHTML){
        return;
    }else{
        this.innerHTML = currentMarker;
        game.checkState();
    }
    if (currentMarker === 'X'){
        currentMarker = 'O'
    }else{
        currentMarker = 'X'
    };
}

})();


//Active game module
const game = (() => {



    function checkState(boardArray){
    }

    return{checkState};

})();

//New player module
const Player = (name, choice) => {


}