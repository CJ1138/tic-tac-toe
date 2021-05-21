//Gameboard module
const gameboard = (() =>{

const gameSquares = document.querySelectorAll(".game-square");

gameSquares.forEach((item, index) => gameSquares[index].addEventListener('click', makeMove));

function makeMove(e){
    if (this.innerHTML){
        return;
    }else{
        this.innerHTML = 'X';
        game.checkState();
    }
}

})();


//Active game module
const game = (() => {
    function checkState(boardArray){
    }

    let boardArray = []

    return{checkState};

})();

//New player module
const Player = (name, choice) => {


}