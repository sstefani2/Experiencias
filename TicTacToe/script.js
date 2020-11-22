/*
Jogo com base no exemplo https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn
*/
/*Armazena o status do jogo*/
const statusDisplay = document.querySelector('.game--status');
/*Utilizaremos gameActive para pausar o jogo ao terminar a partida*/
let gameActive = true;
/*Jogador*/
let currentPlayer = "X";
/*Armazenaremos o Status do jogo, com as céluas que já foram preenchidas permitindo validar se houve vitória*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*Mensagens que serão exibidas durante o jogo. Como temos as mensagens são dinâmicas foram declaradas como funções*/
const winningMessage = () => `Vitória do jogador ${currentPlayer}!`;
const drawMessage = () => `Empate!`;
const currentPlayerTurn = () => `${currentPlayer}`;

/*Mensagem incial*/
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex){
    /*Atualiza o status do jogo e célula*/
	gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
	/*Aqui usamos um if ternário para atualizar o jogador*/
	currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

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
function handleResultValidation() {
	let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
	if (roundWon) {
			statusDisplay.innerHTML = winningMessage();
			gameActive = false;
			return;
		}
	/*Verifica se ainda tem células vazias. Se não houve vitória e não há mais espaços livres, é empate*/
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

	/*Se a partida não terminou, atualiza o jogador*/
    handlePlayerChange();
}		

function handleCellClick(clickedCellEvent) {
	/*Armazena a célula clicada*/    
    const clickedCell = clickedCellEvent.target;
	/*busca o "id" e converte para número*/    	
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
	/*Verifica se a célula clicada já foi utilizada ou se o jogo está pausado*/
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
	/*segue o fluxo do jogo*/    
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
	/*Atualiza as variáveis para um novo jogo*/
	gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

/*
Listeners e botão de reinício
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);