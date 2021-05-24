//Info screen module
const infoScreen = (() => {

    const screenArea = document.getElementById('info-screen');

    function initialMessage(){
        screenArea.addEventListener('click', Game.newGame);
        screenArea.innerHTML = "CLICK HERE TO START A NEW GAME";
    }

    function winMessage(){
        screenArea.innerHTML = `${Display.currentMarker} WINS! </br> CLICK HERE TO PLAY AGAIN`;

    }

    return {initialMessage, winMessage};


})();

//Game module
const Game = (() => {

    let boardObject = {
        'div-0': '1',
        'div-1': '2',
        'div-2': '3',
        'div-3': '4',
        'div-4': '5',
        'div-5': '6',
        'div-6': '7',
        'div-7': '8',
        'div-8': '9',
    }

    const _clearBoardObject = () => {
        let n = 1;
        for(let key in boardObject){
            boardObject[key] = n;
            n++;
        }
    }

    function newGame(){
       Display.newGame();
       _clearBoardObject();

    }

    function updateBoardObject(divID, marker){
        boardObject[divID] = marker;
    }

    function checkState(){
        if(boardObject['div-0'] === boardObject['div-1'] && boardObject['div-1'] === boardObject['div-2']){
            return ['div-0', 'div-1', 'div-2'];
        }else if(boardObject['div-3'] === boardObject['div-4'] && boardObject['div-4'] === boardObject['div-5']){
            return ['div-3', 'div-4', 'div-5'];
        }else if(boardObject['div-6'] === boardObject['div-7'] && boardObject['div-7'] === boardObject['div-8']){
            return ['div-6', 'div-7', 'div-8'];
        }else if(boardObject['div-0'] === boardObject['div-3'] && boardObject['div-3'] === boardObject['div-6']){
            return ['div-0', 'div-3', 'div-6'];
        }else if(boardObject['div-1'] === boardObject['div-4'] && boardObject['div-4'] === boardObject['div-7']){
            return ['div-1', 'div-4', 'div-7'];
        }else if(boardObject['div-2'] === boardObject['div-5'] && boardObject['div-5'] === boardObject['div-8']){
            return ['div-2', 'div-5', 'div-8'];
        }else if(boardObject['div-0'] === boardObject['div-4'] && boardObject['div-4'] === boardObject['div-8']){
            return ['div-0', 'div-4', 'div-8'];
        }else if(boardObject['div-2'] === boardObject['div-4'] && boardObject['div-4'] === boardObject['div-6']){
            return ['div-2', 'div-4', 'div-6'];
        }
    }

    function checkWin(){
        if(checkState()){
            let winArray = checkState();
            infoScreen.winMessage();
            return winArray;
        }
    }

    return{checkState, updateBoardObject, newGame, checkWin};

})();

//Display module
const Display = (() =>{

    const _gameSquares = document.querySelectorAll(".game-square");
    const _newGameBtn = document.getElementById('new-game');

    const addSquareListeners = () => {
        _gameSquares.forEach((item, index) => _gameSquares[index].addEventListener('click', _makeMove));
    }
    
    const removeSquareListeners = () => {
        _gameSquares.forEach((item, index) => _gameSquares[index].removeEventListener('click', _makeMove));   
    }

    addSquareListeners();

    let currentMarker = 'X';

    const turnGold = (rowArray) => {
        if(rowArray){
            rowArray.forEach(element => {
                document.getElementById(element).style.color = 'rgb(218,165,32)';
            });
            removeSquareListeners();
            rowArray = '';
        }
    }

    const _turnWhite = () => {
        _gameSquares.forEach(element => {
            element.style.color = 'white';
        })
    }

    const newGame = () => {
        _turnWhite();
        _clearBoard();
        addSquareListeners();
    }

    function _makeMove(e){
        if (this.innerHTML){
            return;
        }else{
            this.innerHTML = currentMarker;
            Game.updateBoardObject(this.id, currentMarker);
            let _check = Game.checkWin();
            turnGold(_check);
        }
        if (currentMarker === 'X'){
            currentMarker = 'O'
        }else{
            currentMarker = 'X'
        };
    }

    const _clearBoard = () => {
        _gameSquares.forEach((x) => {
            x.innerHTML = ''
        });
    }

    return {newGame, turnGold, currentMarker};

})();

//New player module
const Player = (name, choice) => {


}

//On intial load
infoScreen.initialMessage();
