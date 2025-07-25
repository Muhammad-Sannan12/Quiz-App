import { useState } from "react";
import Heading from "./components/Heading";
import QuestionsCard from "./components/QuestionsCard";
import { questions } from "./Data/questions";
import Confetti from "react-confetti";

function App() {
  //here showFeedBack handles the continue btn and also disables the btn after click
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [showFeedBack, setshowFeedBack] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setselectedAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const handleAnswer = (option) => {
    if (showFeedBack) return;
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setselectedAnswer(option);
    setshowFeedBack(true);
  };
  const goToNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setcurrentQuestion(currentQuestion + 1);
      setselectedAnswer(null);
      setshowFeedBack(false);
    } else {
      setIsFinished(true);
    }
  };
  const restartQuiz = () => {
    setcurrentQuestion(0);
    setScore(0);
    setselectedAnswer(null);
    setshowFeedBack(false);
    setIsFinished(false);
  };
  const calculateProgress = () => {
    if (isFinished) return 100;
    const baseProgress = (currentQuestion / questions.length) * 100;
    const questionProgress = selectedAnswer ? (1 / questions.length) * 100 : 0;
    console.log(baseProgress + questionProgress);
    return baseProgress + questionProgress;
  };

  const percentage = (score / questions.length) * 100;
  const showConfetti = isFinished && percentage > 50;
  return (
    <div
      className="min-h-screen bg-gray-900 flex flex-col
      items-center justify-center text-white "
    >
      {showConfetti && <Confetti />}
      {!isFinished ? (
        <>
          <Heading />
          <div className="w-full max-w-xl mb-5 ">
            <div className="bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className="h-full  bg-gradient-to-r from bg-indigo-500
              to-purple-600 duration-500 ease-out transition-all"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          <QuestionsCard
            current={currentQuestion}
            total={questions.length}
            selected={selectedAnswer}
            showFeedBack={showFeedBack}
            onAnswer={handleAnswer}
            data={questions[currentQuestion]}
          />
          <div className="mt-5">
            {showFeedBack && (
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600
      py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer"
                onClick={goToNext}
              >
                {currentQuestion + 1 < questions.length
                  ? "Continue"
                  : "See Resuts"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
          <p className="text-xl">
            You scored <span>{score}</span> out of{" "}
            <span className="font-bold">{questions.length} </span>
            and it is {Math.round((score / questions.length) * 100)}%
          </p>
          <button
            onClick={() => restartQuiz()}
            className="mt-5 bg-gradient-to-r from-indigo-600 to-purple-600
            py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
