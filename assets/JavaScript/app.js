// creat variables for tracking data input/output.
var winCount = 0;
var loseCount = 0;
var timeOut;
// creating an object with properties of bands and letters
var HangmanGame = {
    words: ["Red Hot Chili Peppers",
        "Three Day Grace",
        "Bon Jovi",
        "AeroSmith",
        "50 cent",
        "U2",
        "Beyonce",
        "Jay-Z",
        "Eminem",
        "Outkast",
        "Miley Cyrus",
        "Counting Crows",
        "Eminem",
        "John Mayer",
        "Kanye West",
        "Goo Goo Dolls",
        "Green Day",
        "Linkin Park",
    ],

    letters: ["a", "c", "d", "e",
        "f", "g", "h", "i",
        "j", "k", "l", "m",
        "n", "o", "p", "q",
        "r", "s", "t", "u",
        "v", "x", "y", "z"
    ],

    lives: 15,
    userInputs: [],
    userInput: "",
    computerWord: "",
    wordWithMatchedLetters: "",
    computerWordLength: 0,
    mathchedLettersCount: 0,
    gameOver: false,
    winOrLose: false,

    // ********** Start of the game commands ********** //

    init: function(){
        this.lives = 15;
        this.userInputs = [];
        this.userInput = "";
        this.mathchedLettersCount = 0;
        this.wordWithMatchedLetters = "";
        this.gameOver = false;
        this.winOrLose = false;
        this.computerWordLength = this.calculateWordLength();
        this.computerWord = this.guessAWord();

        
        var initialWordToPrint = this.createInitialWordToPrint();
        this.printWord(initialWordToPrint);

        // set elements
        document.querySelector("#loadingMessage").innerHTML = "";
        
    }





}