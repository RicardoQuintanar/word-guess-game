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

    lives: 11,
    userInputs: [],
    userInput: "",
    computerWord: "",
    wordWithMatchedLetters: "",
    computerWordLength: 0,
    mathchedLettersCount: 0,
    gameOver: false,
    winOrLose: false,

    // ********** Start of the game commands ********** //

    init: function () {
        this.lives = 11;
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
        document.querySelector("#lives").innerHTML = "";
        document.querySelector("#winCount").innerHTML = "";
        document.querySelector("#loseCount").innerHTML = "";
        document.querySelector("#winLose").style.display = "inline-block";
        document.querySelector("#").src = "";
    },
    // HangMan Rules for user input

    startGame: function () {
        if (this.gameOVer === false && this.isAlphabet()) {
            this.checkRules();
        }
    },

    // validate against game rules
    checkRules: function () {
        if (!this.checkInputAlreadyTried()) {
            this.disableLetterBtn();
            this.pushToTriedValues();

            if (!this.checkWordContainsUserInput()) {
                this.printLivesLeft();
                this.showHangmanImage();
                this.winLoseCountAndAudioOnGameEnd();
                this.startNewOnGameOver();
            } else {
                this.createWordWithMatchedLetters();
                this.winLoseCountAndAudioOnGameEnd();
                this.startNewOnGameOver();
                document.querySelector("#word").innerHTML = this.wordWithMatchedLetters;
            }


        }
    },
    // function where computer generates random word

    guessAWord: function () {
        var computerRandomNumber = Math.floor(Math.random() * this.words.length);
        return this.words[computerRandomNumber];
        console.log(this.computerWord);
    },

    // length of word function

    calculateWordLength: function () {
        return this.computerWord.length;
    },

    //create string with all dashes to print on load
    createInitialWordToPrint: function () {
        var word = "";
        for (var i = 0; i < this.computerWordLength; i++) {
            word += "_  ";
        }
        this.wordWithMatchedLetters = word;
        return word;
    },

    // check if user has already tried the input
    checkInputAlreadyTried: function () {
        if (this.userInputs.length !== 0) {
            var results = this.userInputs.indexOf(this.userInput) < 0 ? false : true;
            return results;
        } else {
            return false;
        }
    },

    // array for tried values
    pushToTriedValues: function () {
        this.userInputs.push(this.userInput);
    },

    // check if input is a letter
    isAlphabet: function () {
        var pattern = /[a-z]/i
        return this.userInput.match(pattern);
    },

    // check if word contains the letter user entered
    checkWordContainsUserInput: function () {
        var contains = false;
        for (var i = 0; i < this.computerWordLength; i++) {
            if (this.computerWord.charAt(i).toUpperCase() == this.userInput) {
                contains = true;
            }
        }
        return contains;
    },


    // replacing dashes with letters typed
    createWordWithMatchedLetters: function () {
        for (var i = 0; i < this.computerWordLength; i++) {
            if (this.computerWord.chartAt(i).toUpperCase() == this.userInput) {
                if (i === 0) {
                    this.wordWithMatchedLetters = this.wordWithMatchedLetters.substring(0, i * 2) +
                        this.userInput.toUpperCase() + this.wordWithMatchedLetters.substring((i * 2 + 1));
                } else {
                    this.wordWithMatchedLetters = this.wordWithMatchedLetters.substring(0, i * 2) +
                        this.userInput.toLowerCase() + this.wordWithMatchedLetters.substring((i * 2 + 1));
                }
                this.mathchedLettersCount++;
            }
        }
    },


    // print word function
    printWord: function (word) {
        document.querySelector("#word").innerHTML = word;
    },
    // print number of lives left
    printLivesLeft: function () {
        this.lives--;
        document.querySelector("#lives").innerHTML = this.lives;
    },
    // increment win/lose by 1, play audio
    winLoseCountAndAudioOnGameEnd: function () {
        if (this.lives === 0) {
            this.playAudio("");
            loseCount++;
            this.gameOver = true;
            this.winOrLose = false;
        }
        if (this.matchedLettersCount == this.computerWordLength) {
            this.playAudio("");
            winCount++;
            this.winOrLose = true;
            this.gameOver = true;
        }
    },
    // starte new game
    startNewOnGameOver: function () {
        if (this.gameOver == true) {
            var html = "";
            document.querySelector("#winLose")
            if (this.winOrLose) {
                html += '<div class="message">You Won !!!</div>';
            } else {
                html += ' <i class="message">You Lost !!!</div>'
            }
            html += '<div class="load"> New Word will load in 4 seconds.';
            html += 'i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>';

            document.querySelector("#loadingMessage").innerHTML = html;
            timeOut = setTimeout(this.winLoseCountAndAudioOnGameEnd.bind(this), 4000);

        }
    },
    // load new game
    loadGame: function () {
        var t = this;
        for (var i = 0; i < this.letters.length; i++) {
            var id = "#li-" + this.letters[i];
            document.querySelector(id).className = "liActive";
        };
        this.init();

    },
    // play audio

    playAudio: function (gameAudio) {
        var audio = new Audio(gamAudio);
        audio.play();
        audio.volume = .5;
    },
        // shows hangman images
        showHangmanImage: function() {
            if (this.lives != 10) {
                document.querySelector("#hangman-img").src = "assets/images/hangman-" + (9 - this.lives) + ".png";
            } else {
                document.querySelector("#hangman-img").src = "assets/images/animals.png";
            }
        },
    
    
    
    
    }

