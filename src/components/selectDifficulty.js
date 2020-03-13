import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/selectDifficulty.css';

class selectDifficulty extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

render() {

    return (
        <div className={this.props.difficulty !== null ? "hide" : "container bdr"}>
            <div className="container">
                <div className="row game-info"><h2 className="">Select Difficulty</h2></div>
                <div className="row">
                    <ul className="difficulty-selection format-wordList">
                        <li>
                            <h4 className="difficulty"
                                onClick={() => this.props.changeDifficulty(0)}>
                                Beginner
                            </h4>
                        </li>
                        <li>
                            <h4 className="difficulty"
                                onClick={() => this.props.changeDifficulty(1)}>
                                Easy
                            </h4>
                        </li>
                        <li>
                            <h4 className="difficulty"
                                onClick={() => this.props.changeDifficulty(2)}>
                                Medium
                            </h4>
                        </li>
                        <li>
                            <h4 className="difficulty"
                                onClick={() => this.props.changeDifficulty(3)}>
                                Hard
                            </h4>
                        </li>
                        <li>
                            <h4 className="difficulty"
                                onClick={() => this.props.changeDifficulty(4)}>
                                Master Hacker
                            </h4>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>    
    );
  }
}

export default selectDifficulty;