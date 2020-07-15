import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

const opentdb = require('opentdb-api');
 
var options = {
    amount: 5,
    category: 'any',
    difficulty: 'easy',
    type: 'multiple'
}

class Quiz extends Component {
    state = {
        questionBank: [],
        score: 0,
        responses: 0
    };
    getQuestions = () => {
        opentdb.getTrivia(options).then(question => {
            this.setState({
                questionBank: question
            });
          });
    };
    componentDidMount(){
        this.getQuestions();
    }
    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0,
        });
    };
    computeAnswer = (answer, correct_answer) => {
        if (answer === correct_answer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    };
    render () {
        return (
            <div className="container">
                <div className="title">Trivia Quiz</div>
                {this.state.questionBank.length > 0 && this.state.responses < 5 && this.state.questionBank.map(
                    ({question, correct_answer, incorrect_answers}) => (
                        <QuestionBox 
                        question={question}
                        options = {incorrect_answers}
                        correct = {correct_answer}
                        selected = {answer => this.computeAnswer(answer, correct_answer)}
                        ></QuestionBox>
                    ))}

                {this.state.responses === 5? (<Result score = {this.state.score} playAgain={this.playAgain}/>) : null}
            </div>
        );
    }

}

ReactDOM.render(<Quiz/>, document.getElementById("root"));