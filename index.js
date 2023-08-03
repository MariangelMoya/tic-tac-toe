const possibilities = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

class Tablero {
    turn = true // true == X y false == O
    buttons = []
    finished = false

    constructor() {
        this.createTablero()
        this.choices = document.querySelectorAll('#turn button');
        this.buttons = document.querySelectorAll('#tablero button');
        this.setEventsForButtons()
        this.choicePlayer()
    }

    setEventsForButtons() {

        this.buttons.forEach(button =>
            button.addEventListener('click', () => {
                if (button.innerHTML !== '' || this.finished)
                    return
                button.innerHTML = this.turn ? 'X' : 'O'
                this.choicePlayer()
                this.removeButtonsForChoiceTurn()
                this.turn = !this.turn
                this.updateMessage()
                this.winner('X')
                this.winner('O')
                this.restartButton()
            })
        )

        console.log(this.buttons)
    }

    restart() {
        const restartGame = `
            <button id="restart">Restart</button> 
            `
        const buttonRestartGame = document.getElementById('reset')
        buttonRestartGame.innerHTML = restartGame
        let refresh = document.getElementById('restart')
        refresh.addEventListener('click',  () => location.reload())
    }

    winner(player) {
        possibilities.forEach(possibility => {
            let hasWin = true

            possibility.forEach(i => {
                if (this.buttons[i - 1].innerHTML !== player) {
                    hasWin = false
                }
            })

            if (hasWin) {
                const playEndHTML = `
                    <h2 class="winner">Player ${player} has win </h2>
                `

                const element = document.getElementById('message')
                element.innerHTML = playEndHTML
                this.restart()
                this.finished = true
            }

        })
    }

    restartButton() {
        let complete = true
        this.buttons.forEach(button => {
            if (button.innerHTML === '') {
                complete = false
            }
        })

        if (complete) {
            this.restart()
            this.removeMessage()

        }
    }

    choicePlayer() {
        this.choices.forEach(choice =>
            choice.addEventListener('click', () => {
                if (choice.innerHTML === 'O')
                    this.turn = false
                this.updateMessage()
                this.removeButtonsForChoiceTurn()
            })
        )
    }

    updateMessage() {
        let messageHtml = document.querySelector('#message')

        if (this.turn) {
            messageHtml.innerHTML = 'Es Turno de X'
            return
        }

        messageHtml.innerHTML = 'Es Turno de O'
    }

    removeButtonsForChoiceTurn() {
        document.querySelector('#turn').innerHTML = ''
    }

    removeMessage() {
        document.querySelector('#message').innerHTML = 'There is no Winner'
    }

    createTablero() {
        let tablero = document.querySelector("#tablero")

        let elementos = ''

        for (let i = 0; i < 9; i++) {
            elementos += `<div>
                        <button></button>
                    </div>`
        }

        tablero.innerHTML = elementos

    }
}


let tablero = new Tablero()