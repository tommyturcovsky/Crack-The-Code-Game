import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Modal from 'react-modal';

import SelectDifficulty from './components/selectDifficulty';
import Game from './components/game';

class App extends React.Component {

  constructor(props) {
    super(props);

      this.changeView = this.changeView.bind(this);
      this.changeDifficulty = this.changeDifficulty.bind(this);

    this.state = {
        currentIndexView: 0,
        currentDifficulty: null,
        modalIsOpen: false
    };
      
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
    
changeView(index) {
    if (index !== this.state.currentIndex) {
        this.setState({ currentIndex: index})
    }
}
    
changeDifficulty(difficulty) {
    if (difficulty !== this.state.currentDifficulty) {
        this.setState({ currentDifficulty: difficulty });
        console.log("changed difficulty: ", this.state.currentDifficulty);
    }
}

  render() {
    function SwitchViews(props) {
      let isDifficultySelected = props.difficulty;
      if (isDifficultySelected !== null) {
        return <Game difficulty={isDifficultySelected}
                      changeDifficulty={props.changeDifficulty(this)}/>
      } else {
        return <SelectDifficulty
                  changeDifficulty={props.changeDifficulty(this)}
                  difficulty={isDifficultySelected}
                />;
      }
    }

      return (
        <div className="terminal" >
        <div className="terminal-lines"></div>  
                <div className="container">
                    <div className="row">
                        <h1 className="app-title">Crack the Code</h1>
                    </div>
                    {/* This will be where components get switched out */}
                    <div className="row">
                        <SwitchViews
                          difficulty={this.state.currentDifficulty}
                          changeDifficulty={() => this.changeDifficulty.bind(this)}
                        />
                    </div>

                {/* How To Play Modal */}
                  <div>
                  <h3 className="mt-3 modal-function-button" onClick={this.openModal}>How To Play</h3>
                        <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        ariaHideApp={false}
                      >
                        <div className="container modal-how-to">
                            <div className="modal-terminal-lines"></div>
                            <div className="how-to-title-container">    
                                <h2 className="">How To Play</h2>
                            </div>
                            <div className="container">
                                <div className="row my-2">
                                <p>
                                    The Hacker (the player) is trying to break into a top secret
                                    computer. The correct passcode will gain access to it. 
                                    The Hacker only has only 4 guesses before they are locked
                                    out of the terminal and lose. On each incorrect guess, 
                                    the computer will indicate how many letter positions
                                    are correct.
                                    <br></br><br></br>
                                    For example, if the password is DANCE and the player guesses 
                                    DENSE, the game will indicate that 4 out of 5 positions are
                                    correct (D_NCE). Likewise, if the password is HOPEFUL and
                                    the player guesses PANTING, the game will report 0/7 because
                                    while some of the letters match, they're in the wrong position.
                                    <br></br><br></br>
                                    Happy Hacking!
                                </p>               
                                </div>         
                            </div>
                            <div className="">
                                <h3 className="modal-function-button" onClick={this.closeModal}>Close</h3> 
                            </div>
                        </div>
                        </Modal>
                    </div>
                </div> 
        </div>
    );
  }
}

export default App;
