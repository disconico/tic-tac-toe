// player factory function 
const createPlayer = (name, sign) => {
    return { name, sign }
}

// game board module 
const gameBoard = (() => {

    let board = ['', '', '', '', '', '', '', '', ''];

    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    const fieldElements = document.querySelectorAll(".field")
    fieldElements.forEach((field) => field.addEventListener('click', (e) => {
        targetIndex = parseInt(e.target.id)
        gameBoard.setField(targetIndex, gameRules.activePlayer.sign)
        field.innerHTML = gameBoard.getField(targetIndex)

        switchPlayers()
        
    }))

    const switchPlayers = () => {
        if (gameRules.activePlayer.name === 'Player 1') {
            gameRules.activePlayer = gameRules.playerTwo
        } else if (gameRules.activePlayer.name === 'Player 2') {
            gameRules.activePlayer = gameRules.playerOne
        }
    }

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener('click', () => {
        reset();
        fieldElements.forEach((field) => {
            field.innerHTML = ""
        })
    }
    )

    return {
         board, getField, setField,
    }
})();

// // display events
// const displayEvents = (() => {

//     const fieldElements = document.querySelectorAll(".field")
//     const messageElement = document.getElementById("message");
//     const restartButton = document.getElementById("restart-button");

//     const setDisplay = () => {
//         for (let i = 0; i < gameBoard.board.length; i++) {
//             fieldElements.forEach((field) => {
//                 field.innerHTML = gameBoard.board[i]
//             })
//         }
//     }

//     return {
//         setDisplay
//     }

// })()


// game rules
const gameRules = (() => {

    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');
    console.log(playerOne, playerTwo)


    let gameEnd = false
    let round = 1
    let activePlayer = playerOne

    return {
        playerOne, playerTwo, activePlayer
    }


})();

