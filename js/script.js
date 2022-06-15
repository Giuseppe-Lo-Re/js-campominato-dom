// Seleziono l'id del tasto play e ne conservo il dato in una variabile:
const playBtn = document.querySelector('#play');

// Aggiungo un evento al click sul tasto, che faà partire il gioco:
playBtn.addEventListener('click', startGame);

function startGame() {
    
    // HTML Elements
    const mainGrid = document.querySelector('#main-grid');

    // Creo un reset della griglia all'inizio di ogni nuova partita che svuoterà la griglia precedente:
    mainGrid.innerHTML = '';

    // Creo un reset delle classi all'inizio di ogni nuova:
    mainGrid.className = '';
 
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
    console.log('tentativi', winningNumber.length)

    // Invoco la funzione che genererà la griglia:
    gridGenerator();
 
// -------------------------------------------------- //
//                  DOM FUNCTION                      //
// -------------------------------------------------- // 

// GENERATORE DI GRIGLIE:
// - Aggiunge classi alla griglia per le dimensioni degli square;
// - Crea una cella partendo da questo template:<div class="square"><span>7</span></div>;

function gridGenerator() {

    // Aggiungo classi per le dimensioni della griglia :
    mainGrid.classList.add(mainGridClass);

    // Creo un ciclo for per i numeri da 1 al range massimo:
    for(let i = 1; i <= gameMaxRange; i++) {

        // Creo una cella il cui interno popolo di un div: 
        const newCell = document.createElement('div');

        // che a sua volta conterrà uno span con dentro il numero generato dal ciclo for:
        newCell.innerHTML = `<span>${i}</span>`; 

        // Aggiungo la classe:
        newCell.classList.add('square');

        // ed appendo la cella alla griglia:
        mainGrid.append(newCell); 

        // aggiungo l'evento al click sul numero:
        newCell.addEventListener('click', handleCellClick)
    }
    
    // GESTORE DEL CLICK SULLA CELLA:
    // - Legge il numero nello span e lo trasforma in numero;
    // - Se il numero è presente nell'array bombs; la cella diventa rossa e compare un messaggio "Hai Perso!"
    //      altrimenti la cella diventa azzurra e conserva il numero nell'array winningNumbers;
    // - Quando la lunghezza dell'array winningNumbers sarà uguale a quella di maxAttempts(=massimo tentativi raggiunti),
    //      il gioco termina con relativo messaggio "Hai Vinto!";
    function handleCellClick() {

        // Leggo il numero nello span e lo trasforma in numero:
        const thisNumber = parseInt(this.querySelector('span').innerHTML);
        
        // Inizializzo una variabile che mi servirà come argomento per la funzione endGame:

        // Se il numero è presente nell'array bombs:
        if(bombs.includes(thisNumber)) {

            // la cella diventa rossa:
            this.classList.add('red');
            endGame('lost');
            
        // altrimenti pusho il numero nell'array winningNumbers:    
        } else {
            winningNumber.push(thisNumber);
            // e la cella diventa azzurra:
            this.classList.add('blue');
            
            if(winningNumber.length === maxAttempts) {
                endGame('won');
            }  
        }
    }
}
}


// Seleziono l'id del div user-message e ne conservo il dato in una variabile:
const userMessage = document.querySelector('#user-message');

// GENERATORE DI MESSAGGIO FINE GIOCO:
// - Input: "won" o "lost"
// - Return: userMessageDiv.innerHTML
function endGame(result) {
    if(result === 'lost') {

        // Invio un messaggio nel DOM 'HAI PERSO!':
        userMessage.innerHTML = `HAI PERSO!`;

        // Seleziono l'id della griglia:
        const mainGrid = document.getElementById('main-grid');

        // Rendo la griglia non più cliccabile:
        mainGrid.style.pointerEvents = 'none';
    } else {

        // Invio un messaggio nel DOM 'HAI VINTO!':
        userMessage.innerHTML = `HAI VINTO!`   

        // Rendo la griglia non più cliccabile:
        mainGrid.style.pointerEvents = 'none';
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