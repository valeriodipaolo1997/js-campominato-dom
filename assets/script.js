/* Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco(attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js / css / con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.Attenzione: ** nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti(ovvero quando ha rivelato tutte le celle che non sono bombe). 
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.*/


//definisco le variabili
const gameTable = document.getElementById("grid");
let maxCellsNumber = 100;
const playBtn = document.getElementById("start-btn")
const difficulty = document.getElementById("levels")
let bombs = [];
let safeNumbers;


playBtn.addEventListener("click", function () {
let levels = difficulty.value;

    if (levels === "1") {
        createTable(gameTable, 100);
        safeNumbers = 84;

        while (bombs.length < 16) {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 100) + 1;
            } while (bombs.includes(randomNumber));

            bombs.push(randomNumber);
        }

        console.log(bombs);


    


} else if (levels === "2") {
    createTable(gameTable, 81);
    safeNumbers = 65;

    while (bombs.length < 16) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 81) + 1;
        } while (bombs.includes(randomNumber));

        bombs.push(randomNumber);
    }

    console.log(bombs);


} else if (levels === "3") {
    createTable(gameTable, 49);
    safeNumbers = 33;


    while (bombs.length < 16) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 49) + 1;
        } while (bombs.includes(randomNumber));

        bombs.push(randomNumber);
    }

    console.log(bombs);


}
});



function createTable(DOMelement, maxCellsNumber) {

    let gameIsNotOver = true;
    let score = 0;
    let squareClicked = false;

    for (let i = 0; i < maxCellsNumber; i++) {
        const square = document.createElement("div");

        square.className = "square";
        square.append(i + 1);
        gameTable.append(square);

        playBtn.classList.add("d-none");
        difficulty.classList.add("d-none");
      
        square.addEventListener("click", function () {


            if (gameIsNotOver) {
                square.classList.add("safe-cells");
                let squareClickedNumber = i + 1;
                if (square.classList.contains("safe-cells") && squareClicked === false) {

                    score++;
                    squareClicked = true;
                }

                console.log(score);
                console.log("Clic sul numero " + squareClickedNumber);
                if (score === safeNumbers) {
                    gameIsNotOver = false
                    console.log("Hai vinto!");
                }


                if (bombs.includes(squareClickedNumber)) {
                    gameIsNotOver = false
                    console.log("Hai perso");
                    square.classList.add("unsafe-cells");
                    console.log("Punteggio: " + (score - 1));
                }
            }
        })
    }
}