import React, {useState} from "react";

function spliceCorrectAnswer(array, answer){
  array.splice(Math.floor(Math.random()*4), 0, answer);
}

const QuestionBox = ({question, options, correct, selected}) => {
  const [answer, setAnswer] = useState(options);
  if (!options.includes(correct))
    spliceCorrectAnswer(options, correct);
  return (
    <div ClassName = "QuestionBox">
      <div className="question">{question}</div>
      {answer.map((text, index) => (
        <button key={index} className="answerBtn" onClick={() => {
          setAnswer([text]);
          selected(text);
        }}>
          {text}
        </button>
      ))}
    </div>
  );
};

export default QuestionBox;
