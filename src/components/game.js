import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/game.css';

class game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            loadingText: "Hacking into the terminal. This should only take a second...",
            wordsToGuess: [],
            numOfTries: 0,
            keyWordIndex: null,
            maxNumberOfWords: 8,
            maxLengthOfWords: 4,
            numOfPositionsCorrect: null,
            winStatus: null,
            numOfGamesWon: 0,
        };

        this.showFile = this.showFile.bind(this);
        this.wordGuessOnClick = this.wordGuessOnClick.bind(this);
        this.switchToDifficultySelection = this.switchToDifficultySelection.bind(this);
    }

    componentDidMount() {
        this.showFile();
        setTimeout(() => {
            this.listWordsToGuess();
        }, 3000)

	}

    showFile() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET","https://gist.githubusercontent.com/hunterjorgensen167/4478cd2ca4bfa2062ed0f1d2dfb08ee1/raw/cd5a597fd303088903131134c76c91b8359c47b0/word_list");
        xhr.onload=function(){
            //console.log(xhr.responseText);
        }

        let gamesWonIncrement = this.state.numOfGamesWon;
        if (this.state.winStatus !== null) {
            gamesWonIncrement++;
        }

        this.setState(state => ({
            loadingText: "Hacking into the terminal. This should only take a second...",
            wordsToGuess: [],
            numOfGamesWon: gamesWonIncrement,
            winStatus: null
        }))

        setTimeout(() => {
            let wordsToFilter = xhr.responseText;
            wordsToFilter = wordsToFilter.split("\n");
            let completeFilteredWordList = [];
            
            // These will Change dependent on difficulty level
            let maxNumberOfWords = this.state.maxNumberOfWords
            let maxLengthOfWords = this.state.maxLengthOfWords;

            switch (this.props.difficulty) {
                // Beginner
                case 0:
                    maxNumberOfWords = 5
                    maxLengthOfWords = 4
                    break;
                // Easy
                case 1:
                    maxNumberOfWords = 5
                    maxLengthOfWords = 5
                    break;
                // Medium
                case 2:
                    maxNumberOfWords = 6
                    maxLengthOfWords = 6
                    break;
                // Hard
                case 3:
                    maxNumberOfWords = 7
                    maxLengthOfWords = 7
                    break;
                // Master Hacker
                case 4:
                    maxNumberOfWords = 8
                    maxLengthOfWords = 8
                    break;
                default:
                    maxNumberOfWords = 1
                    maxLengthOfWords = 4
            }

            let numOfWordsToGuess = 0;
            let updateKeyWordIndex = Math.floor(Math.random() * maxNumberOfWords);

            while (numOfWordsToGuess < maxNumberOfWords) {
                let randomIndex = Math.floor(Math.random() * wordsToFilter.length);
                let wordUnderReview = wordsToFilter[randomIndex];

                if (wordUnderReview.length === maxLengthOfWords) {
                    wordUnderReview = wordUnderReview + " ";
                    completeFilteredWordList.push(wordUnderReview);
                    numOfWordsToGuess++;
                }
            }

            this.setState(state => ({
                loadingText: "",
                text: xhr.responseText,
                wordsToGuess: completeFilteredWordList,
                keyWordIndex: updateKeyWordIndex,
                winStatus: null,
                numOfTries: 0,
                numOfPositionsCorrect: null
            }));
            console.log(this.state.keyWordIndex);
        }, 2000);
        xhr.send();
    };

    // Try putting an onClick method with the list of wordsToGuess
    // In the method, determine the behavior of that element and from there
    // We can increment number of tries Left, check to see if the value chosen
    // was the right one by checking it with randomly chosen right key all
    // based on index

    wordGuessOnClick(id) {
        let keyWordIndex = this.state.keyWordIndex;

        // TODO: check the word selected with a key word
        //       if yes say correct
        //       if no, increment tries, say how many they were incorrect by according to key
        if (id === keyWordIndex) {
            this.setState(state => ({
                winStatus: true
            }));
        } else {
            let element = document.getElementById(id);
            element.classList.add("incorrectWord");

            let wordsToGuess = this.state.wordsToGuess;
            let keyWord = wordsToGuess[keyWordIndex];
            let guessedWord = wordsToGuess[id];

            // Increment as Positions correct increase
            let numOfPositionsCorrect = 0;
            for (let i = 0; i < this.state.maxLengthOfWords; i++) {
                console.log("MaxLengthOfWord: " + this.state.maxLengthOfWords);
                if (keyWord.charAt(i) === guessedWord.charAt(i)) {
                    console.log(i);
                    console.log("KeyWord Char: " + keyWord.charAt(i));
                    console.log("GuessedWord Char: " + guessedWord.charAt(i));
                    numOfPositionsCorrect = numOfPositionsCorrect + 1;
                }
            }

            console.log("num of positions correct: " + numOfPositionsCorrect);

            this.setState(state => ({
                numOfTries: this.state.numOfTries + 1,
                numOfPositionsCorrect: numOfPositionsCorrect
            }));

            if (this.state.numOfTries === 3) {
                this.setState(state => ({
                    winStatus: false
                }))
            }
        }
    }

    listWordsToGuess() {
        let numbers = this.state.wordsToGuess;
        let listItems = numbers.map((number, index) =>
            <li onClick={() => this.wordGuessOnClick(index)} className="codeOption" id={index} key={index}>
                <h3>{number}</h3>
            </li>
        );
        return (
            <ul className="format-wordList">{listItems}</ul>
        );
    }

    switchToDifficultySelection() {
        this.props.difficulty = null;
    }


render() {

    function Progress(props) {
        if (props.numOfPositionsCorrect !== null) {
            return (
                <div>
                    <h4>[Number of Positions Correct: {props.numOfPositionsCorrect}]</h4>
                </div>
            )
        } else {
            return null;
        }
    }

    return (

        <div className={this.props.difficulty === null ? "hide" : "container bdr"}>
            <div className="container">
                <div className="row game-info">
                    <h2>Number of Games Won: {this.state.numOfGamesWon}</h2>
                    <h2 className="text-block-display">
                        ({this.state.numOfTries}/4 Tries)
                    </h2>
                    <Progress
                        numOfPositionsCorrect={this.state.numOfPositionsCorrect}
                        winStatus={this.state.winStatus}    
                    />
                </div>

                {/* The List of Words To Guess From */}
                <div className="row">
                    <div id="wordListContainer"></div>
                    {/* <this.listWordsToGuess></this.listWordsToGuess> */}
                    {this.listWordsToGuess()}

                    {/* The Pop Up if Win or Lose */}
                    <div className={this.state.winStatus === null ? "hide" : "popup-message"}>
                        <div className="inner-popup">
                            <div className="popup-title-container">
                            <h1 className={this.state.winStatus === true ? "" : "hide"}>
                                You Win!
                            </h1>
                            <h1 className={this.state.winStatus === false ? "" : "hide"}>
                                You Lose :(
                            </h1>
                            <h4>Correct Word: {this.state.wordsToGuess[this.state.keyWordIndex]}</h4>
                            </div>
                                <button
                                className="play-again"
                                onClick={() => this.props.changeDifficulty(null)}>
                                    Change Difficulty?
                            </button>
                            <div className="divider"></div>
                            <button
                                className="play-again"
                                onClick={() => this.showFile()}>Play Again?
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Loading Text */}
                <div className=''>
                    {this.state.loadingText}
                </div>
            </div>
        </div>    
    );
  }
}

export default game;