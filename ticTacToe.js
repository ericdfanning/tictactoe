var prompt = require('prompt')

// var board = `
//     1   2   3
// A  ___|___|___
// B  ___|___|___
// C     |   |   

//  `
var rows = ['   1', '   2', '   3']
var boardArr = ['A ', '_','_','_','|','_','_','_','|','_','_','_','\n', 'B ', '_','_','_','|','_','_','_','|','_','_','_', '\n','C ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|', ' ', ' ', ' ']
var boardCopy = ['A ', '_','_','_','|','_','_','_','|','_','_','_','\n', 'B ', '_','_','_','|','_','_','_','|','_','_','_', '\n','C ', ' ', ' ', ' ', '|', ' ', ' ', ' ', '|', ' ', ' ', ' ']

console.log('Always choose your move with letter first. Example \'A3\' not \'3A\'')

var player1Obj = {
	"A": ['f', 'f', 'f'], 
	"B": ['f', 'f', 'f'],
	"C": ['f', 'f', 'f']
}

var player2Obj = {
	"A": ['f', 'f', 'f'], 
	"B": ['f', 'f', 'f'],
	"C": ['f', 'f', 'f']
}

var placeMove = {
	"A1": 2,
	"A2": 6,
	"A3": 10,
	"B1": 15,
	"B2": 19,
	"B3": 23,
	"C1": 28,
	"C2": 32,
	"C3": 36
}

var isTaken = {
	"A1": false,
	"A2": false,
	"A3": false,
	"B1": false,
	"B2": false,
	"B3": false,
	"C1": false,
	"C2": false,
	"C3": false
}

function checkWinner() {
	var winner = false
	var cross1 = []
	var cross2 = []
	var left = 0
	var right = 0
	for (var key in player1Obj) {
		cross1.push(player1Obj[key][left])
		cross2.push(player1Obj[key][right])
		left++
		right++
		if (!player1Obj[key].includes('f')) {
			console.log('Player 1 WINS!!!')
			winner = true
		}

	}

	if (!cross1.includes('f') || !cross2.includes('f')) {
		console.log('Player 1 WINS!!!')
		winner = true
	}

	left = 0
	right = 0
	cross1 = []
	cross2 = []

	for (var key in player2Obj) {
		cross1.push(player1Obj[key][left])
		cross2.push(player1Obj[key][right])
		left++
		right++
		if (!player2Obj[key].includes('f')) {
			console.log('Player 2 WINS!!!')
			winner = true
		}
	}

	if (!cross1.includes('f') || !cross2.includes('f')) {
		console.log('Player 2 WINS!!!')
		winner = true
	}

	if (!winner) {
		console.log('STALEMATE.')
	}
}

function clearBoard() {
  // handle if there is no winner
  console.log('game over')
  boardCopy = boardArr.slice()
  for (var key in isTaken) {
  	isTaken[key] = false
  }

  getInput()
}

var moveCount = 0;

prompt.start()

var player1 = true // true === player 1, false === player 2

prompt.message = 'What\s your next move?'

function getInput(player) {

	console.log(rows.join(''))
	console.log(boardCopy.join(''))

	var input = ''

	prompt.get(['input'], function (err, result) {

	  console.log('Your move: ', result.input);
	  var r = result.input.toUpperCase()
	  var move = r.split('')

	  if (moveCount === 8) {
	  	checkWinner()
	  	clearBoard()
	  	moveCount = 0
	  } else if (isTaken[r]) {
	  	console.log("That position is taken. Go again")
	  	getInput()
	  } else {

		  if (player1) {
		  	player1Obj[move[0]][Number(move[1]) - 1] = 'o'
		  	boardCopy[placeMove[r]] = 'O'
		  	isTaken[r] = true
		  } else {
		  	player2Obj[move[0]][Number(move[1]) - 1] = 'x'
		  	boardCopy[placeMove[r]] = 'X'
		  	isTaken[r] = true
		  }
		  player1 = !player1

		  moveCount++

		  getInput()
		}
	});
}

getInput(true)
