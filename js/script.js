/*
Descrizione:
- Un alert() espone 5 numeri generati casualmente.
  (Decidete voi se debbano essere tutti diversi)
- Non appena l'utente schiaccia "ok", parte un timer di 30 secondi.
  (Bonus: visualizzare il timer)
- Al termine dei 30 secondi l'utente deve inserire, uno alla volta,
  i numeri che ha visto precedentemente, tramite il prompt().
  (Bonus: far inserire i numeri da un form)
- Dopo che sono stati inseriti i 5 numeri, il software mostra in un alert quanti
  e quali dei numeri da indovinare sono stati individuati.
  (Bonus: stampare in pagina il risultato, in alternativa all'alert.)
*/

/*
1- generare 5 numeri casuali (da 1 a 50) diversi tra loro
2- mettere i numeri generati in un array e mostrarli all'utente
3- dopo 30 secondi, chiedere all'utente di inserire singolarmente i numeri che ha visto
4- mettere i numeri dell'utente in un array
5- mostrare quanti e quali numeri sono stati indovinati
*/

// variabili
var timerDisplay = document.getElementById("timer");
var resultDisplay = document.getElementById("result");
var maxNumber = 50;
var time = 5;
var predict = "";

// array numeri random, numeri utente e numeri indovinati
var randomNumbers = [];
var userNumbers = [];
var predictNumbers = [];

// generare numeri random finchè non sono 5 diversi e aggiungerli all'array
while (randomNumbers.length < 5) {
    var randomNum = numberGenerator(1, maxNumber);
    // se il numero non è presente aggiungerlo all'array
    if (!randomNumbers.includes(randomNum)) {
        randomNumbers.push(randomNum);
    }
}

// mostrare i numeri generati all'utente
alert("I numeri sono: " + randomNumbers.join(" - "));

// BONUS mostrare timer 30 secondi
timerDisplay.innerText = time--;
var intervalId = setInterval(function () {
    timerDisplay.innerText = time;
    time--;
    if (time < 0) {
        clearInterval(intervalId);
        timerDisplay.innerText = "TIME OUT"
    }
}, 1000)

// aspettare 30 secondi prima di chiedere i numeri all'utente
setTimeout(function () {
    // chiedere all'utente i numeri visti precedentemente finchè non sono 5 diversi
    while (userNumbers.length < 5) {
        // ottenere numero e validazione con funzione
        var userNum = getUserNumber(1, maxNumber);
        // se il numero non è presente aggiungerlo all'array
        if (!userNumbers.includes(userNum)) {
            userNumbers.push(userNum);
        }
    }

    // individuare i numeri indovinati
    for (var i = 0; i < userNumbers.length; i++) {
        var currentElement = userNumbers[i];
        // se il numero utente è presente nell'array random aggiungerlo all'array indovinati
        if (randomNumbers.includes(currentElement)) {
            predictNumbers.push(currentElement);
        }
    }

    // mostrare quanti e quali numeri sono stati indovinati, in pagina(BONUS)
    timerDisplay.innerText = "";
    predict = "Hai indovinato " + predictNumbers.length + " numeri."
    if (predictNumbers.length > 0) {
        predict += "<br>I numeri indovinati sono: " + predictNumbers.join(" - ");
    }
    resultDisplay.innerHTML = predict;
}, 6000);


// FUNZIONI
function numberGenerator(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
}

function getUserNumber(min, max) {
    let num;
    do {
        num = prompt("Inserisci un numero da " + min + " a " + max);
    } while (!num || num.trim() === "" || isNaN(num) || num < min || num > max);
    return parseInt(num);
}