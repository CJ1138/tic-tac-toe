//Player prototypes

const Player = (name, marker, registered) =>{
    return{name, marker, registered};
}

const PlayerX = Player("Player X", "x", "n");
const PlayerO = Player("Player O", "o", "n");
const ComputerPlayer = {}

//Info screen module
const infoScreen = (() => {

    //Creates a variable to hold the contents of the infoscreen div
    const screenArea = document.getElementById('info-screen');

    //Sets the initial content of the info screen
    function initialMessage(){
        screenArea.innerHTML = `
            <div id="player-x">
                PLAYER X
                <div id="x-button-div">
                </div>
            </div>
            <div id="player-o">
                PLAYER O
                <div id="o-button-div">
                </div>
            </div>
            `;
        _askName(`x`);
        _playerOInitial();
    }

    function _askName(marker){
        let nameField = `
            <input type="text" id="${marker}-name" placeholder="Name"></input>
            <button name="yes" id="${marker}-check" data-marker="${marker}" data-player="player">&check;</button>`
        let destDiv = document.getElementById(`${marker}-button-div`)
        destDiv.innerHTML = nameField;
        let checkButton = document.getElementById(`${marker}-check`);
        checkButton.addEventListener('click', Game.newHuman);
    }

    function _playerOInitial(){
        let buttons = `<button id="human" class="player-button">HUMAN</button>
                            <button id="ai" class="player-button">AI</button>`
        let destDiv = document.getElementById(`o-button-div`)
        destDiv.innerHTML = buttons;
        let humanBtn = document.getElementById('human');
        humanBtn.addEventListener('click', function(){
            console.log(`working`);
            _askName('o');
        })
    }

    //When someone presses tick, it should set the name of that player to the value entered
    //and show that name on screen

    function _nameCancel(e){
        if(e.target.id === 'x-cancel'){
            _askName('x');
        }else{
            _playerOInitial();
        }
    }

    function setName(marker, name){
        let buttonDiv = document.getElementById(`${marker}-button-div`)
        buttonDiv.innerHTML = `${name} <button name="no" id="${marker}-cancel" data-marker="${marker}">X</button>`;
        let noButton = document.getElementById(`${marker}-cancel`);
        noButton.addEventListener('click', _nameCancel);
        _startQuestion();
    }

    //When two players have been selected, the game shoul ask the player(s) if they want to start

    function _startQuestion(){
        if (PlayerX.registered === 'y' && PlayerO.registered === 'y'){
            screenArea.innerHTML = `Begin Game? <button id="begin-yes>Y</button>"`;
        }
    }

    return {initialMessage, setName};

})();

//Game module
const Game = (() => {
    let currentPlayer;

    // Create an object called boardObject with distinctly set values
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

    //Function to return boardObject to its initial state
    const _resetBoardObject = () => {
        let n = 1;
        for(let key in boardObject){
            boardObject[key] = n;
            n++;
        }
    }

    //Function to call other functions to return the game and display
    //to their initial states
    function newGame(){
        currentPlayer = 'x';
        Display.newGame();
        _resetBoardObject();

    }

    //Function to update boardObject to reflect the marker placed
    //in a given move
    function updateBoardObject(divID, marker){
        boardObject[divID] = marker;
    }

    //Function which checks the board obect to see if any row is in a win state and to return that row
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

    //Calls the checkState function. If the checkState function returns true (ie a row is in a win state) calls
    //the info screen funtion to say who won, and returns an array with the winning row
    function checkWin(){
        if(checkState()){
            let winArray = checkState();
            infoScreen.winMessage(winningPlayer);
            return winArray;
        }
    }

    function newHuman(e){
        let rightName = e.path[1].childNodes[1].value.toUpperCase();
        if (e.path[0].dataset.marker === 'x'){
            PlayerX.name = rightName;
            PlayerX.registered = 'y';
        } else {
            PlayerO.name = rightName;
            PlayerO.registered = 'y';
        }
        infoScreen.setName(e.path[0].dataset.marker, rightName);
    }

    return{checkState, updateBoardObject, newGame, checkWin, newHuman};

})();

//Display module
const Display = (() =>{

    const _gameSquares = document.querySelectorAll(".game-square");
    const _newGameBtn = document.getElementById('new-game');

    const addSquareListeners = () => {
        //_gameSquares.forEach((item, index) => _gameSquares[index].addEventListener('click', Player.makeMove));
    }
    
    const removeSquareListeners = () => {
        //_gameSquares.forEach((item, index) => _gameSquares[index].removeEventListener('click', Player.makeMove));   
    }

    addSquareListeners();

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

    const _clearBoard = () => {
        _gameSquares.forEach((x) => {
            x.innerHTML = ''
        });
    }

    return {newGame, turnGold};

})();





//On intial load
infoScreen.initialMessage();
;
