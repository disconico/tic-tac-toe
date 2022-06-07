(myGame = function () {

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

        return {
            board, reset, getField, setField,
        }
    })();

    // display events 
    const gameDisplay = (() => {

        const fieldElements = document.querySelectorAll(".field")
        fieldElements.forEach((field) => field.addEventListener('click', (e) => {
            targetIndex = parseInt(e.target.id)
            if (gameBoard.getField(targetIndex) != "" || gameRules.getIsOver()) {
                return
            } else {
                gameBoard.setField(targetIndex, gameRules.activePlayer.sign)
                field.classList.add(gameBoard.getField(targetIndex))
                field.classList.remove('empty')
                
                playSound()
                gameRules.playCounter++
                gameRules.checkGameStatus()
                gameRules.switchPlayers()
                gameRules.displayMessage()
            }
        }))

        function playSound () {
            // const musicPlayerOne = new Audio('./music/sith.mp3')
            // const musicPlayerTwo = new Audio('./music/jedi.mp3')
            // if (gameRules.activePlayer.name === 'Player 1') {
            //     musicPlayerTwo.pause()
            //     musicPlayerOne.currentTime = 0
            //     musicPlayerOne.play()
            // } else if (gameRules.activePlayer.name === 'Player 2') {
            //     musicPlayerOne.pause()
            //     musicPlayerTwo.currentTime = 0
            //     musicPlayerTwo.play()
            // }
        }

        const restartButton = document.getElementById("restart-button");
        restartButton.addEventListener('click', () => {
            gameBoard.reset();
            fieldElements.forEach((field) => {
                field.classList.remove('X')
                field.classList.remove('O')
                field.classList.add('empty')
            });
            gameRules.reset()
            gameRules.activePlayer = gameRules.playerOne
            gameRules.displayMessage()
        }
        )
    })()

    // game rules
    const gameRules = (() => {

        const playerOne = createPlayer('Player 1', 'X');
        const playerTwo = createPlayer('Player 2', 'O');
        console.log(playerOne, playerTwo)

        let gameEnd = false
        let winnerDeclared = false
        let activePlayer = playerOne
        let playCounter = 0;

        const textMessage = document.getElementById('message')

        const switchPlayers = () => {
            if (gameEnd === false) {
                if (gameRules.activePlayer.name === 'Player 1') {
                    gameRules.activePlayer = gameRules.playerTwo
                } else if (gameRules.activePlayer.name === 'Player 2') {
                    gameRules.activePlayer = gameRules.playerOne
                }
            } else {
                return
            }
        }

        const checkGameStatus = () => {

            console.log(gameRules.playCounter)
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            if (gameRules.playCounter < 9) {

                for (let i = 0; i < winningConditions.length; i++) {
                    const winArray = winningConditions[i]
                    let a = gameBoard.board[winArray[0]]
                    let b = gameBoard.board[winArray[1]]
                    let c = gameBoard.board[winArray[2]]
                    if (a === '' || b === '' || c === '') {
                        continue
                    }
                    if (a === b && b === c) {
                        gameEnd = true;
                        winnerDeclared = true;
                    }
                }
            } else if (gameRules.playCounter === 9) {
                for (let i = 0; i < winningConditions.length; i++) {
                    const winOtherArray = winningConditions[i]
                    let a = gameBoard.board[winOtherArray[0]]
                    let b = gameBoard.board[winOtherArray[1]]
                    let c = gameBoard.board[winOtherArray[2]]
                    if (a === b && b === c) {
                        gameEnd = true;
                        winnerDeclared = true;
                        return
                    } else {
                        gameEnd = true
                        winnerDeclared = false
                    }
                }
            }
        }

        const displayMessage = () => {

            if (gameEnd === true && winnerDeclared === true) {
                textMessage.innerText = `${gameRules.activePlayer.name} won the game !`
            } else if (gameEnd === true && winnerDeclared === false) {
                textMessage.innerText = `it's a draw, play again!`
            } else if (gameEnd === false && gameRules.activePlayer === playerOne) {
                textMessage.innerText = `it's ${playerOne.name} turn!`
            } else if (gameEnd === false && gameRules.activePlayer === playerTwo) {
                textMessage.innerText = `it's ${playerTwo.name} turn!`
            }
        }

        const getIsOver = () => {
            return gameEnd
        }

        const getWinner = () => {
            return winnerDeclared
        }

        const getCounter = () => {
            return playCounter
        }


        const reset = () => {
            gameEnd = false
            winnerDeclared = false
            activePlayer = playerOne
            gameRules.playCounter = 0
        }

        return {
            playerOne, playerTwo, activePlayer, switchPlayers, checkGameStatus, displayMessage, reset, playCounter, getIsOver, getWinner, getCounter
        }
    })();
})()