const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', startGame);

function startGame() {
    // HTML Elements
    const mainGrid = document.querySelector('#main-grid');
     
    // Creo una variabile per il numero di bombe:
    const numberOfBombs = 16;

    // Definisco una variabile che prenderà la selezione del livello di difficoltà dal select:
    const userLevel = document.querySelector('#user-level').value;

    // Definisco i livelli di difficoltà: 1)1-100, 2)1-81, 3)1-49:
    // Dichiaro una variabile che registrerà i valori del livello di difficoltà attraverso un ciclo switch:
    let gameMaxRange;

    // Creo una variabile che definirà le classi da applicare alla griglia:
    let mainGridClass;

    switch (userLevel) {
        case '1':
            gameMaxRange = 100;
            mainGridClass = 'easy';
            break;
        case '2':
            gameMaxRange = 81;
            mainGridClass = 'hard';
            break;
        case '3':
            gameMaxRange = 49;
            mainGridClass = 'crazy';
            break;
    }

    // Genero 16 numeri casuali che rappresenteranno le bombe, che avranno un range differente a secondo del livello selezionato:
    // Invoco la funzione per generare i 16 numeri:
    const bombs = arrayRndIntergerGenerator(16, 1, gameMaxRange);
    console.log('numeri "bomba"', bombs)

    // Definisco il numero massimo di tentativi, che sarà uguale al range massimo del livello - il numero delle bombe:
    let maxAttempts = gameMaxRange - numberOfBombs;
    console.log('numero massimo tentativi', maxAttempts)

    // definisco una variabile booleana per far continuare il gioco, che di default avrà valore = true:
    let gameContinues = true;

    // Dichiaro un array vuoto che conterrà i numeri vincenti, diversi dai numeri bomba:
    const winningNumber = []; 

    // Invoco la funzione che genererà la griglia:
    gridGenerator();

// -------------------------------------------------- //
//                  DOM FUNCTION                      //
// -------------------------------------------------- // 
// GENERATORE DI GRIGLIE:
// - Aggiunge classi alla griglia per le dimensioni degli square;
// - Crea una cella partendo da questo template:<div class="square"><span>7</span></div>;

function gridGenerator() {

    // Aggiungo classi alla griglia:
    mainGrid.classList.add(mainGridClass);

    for(let i = 1; i <= gameMaxRange; i++) {

        // Creo una cella il cui interno popolo di un div: 
        const newCell = document.createElement('div');

        // che a sua volta conterrà uno span con dentro il numero generato dal ciclo for:
        newCell.innerHTML = `<span>${i}</span>`;

        // Aggiungo la classe:
        newCell.classList.add('square');

        // ed appendo la cella alla griglia:
        mainGrid.append(newCell);
    }
    

}


}


// -------------------------------------------------- //
//                  UTILITY FUNCTION                  //
// -------------------------------------------------- // 

// GENERATORE DI ARRAY DI NUMERI RANDOM:
// numberOfElements -> numero elementi dell'array;
// rangeMin -> Range minimo dei numeri random;
// rangeMax -> Range massimo dei numeri random;
// return: array di numeri random.

function arrayRndIntergerGenerator(numberOfElements, rangeMin, rangeMax) {

    // Dichiaro un array vuoto che verrà poi popolato dai numeri random:
    const randomNumberArray = [];
    
    // Creo un ciclo while che funzionerà finchè la lunghezza dell'array sarà inferiore al numero elementi dell'array:
    while(randomNumberArray.length < numberOfElements) {

        // creo un numero random tra rangeMin e rangeMax:
        const randomNumber = getRndInterger(rangeMin, rangeMax);

        // Che verrà pushato solo se diverso da quelli presenti:
        if(!randomNumberArray.includes(randomNumber)) {
            randomNumberArray.push(randomNumber);
        }
    }
    
    // Restituisco il valore dell'array di numeri random:
    return randomNumberArray;
}

// GENERATORE DI NUMERI RANDOM:
function getRndInterger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}