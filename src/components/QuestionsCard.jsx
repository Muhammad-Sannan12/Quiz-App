import React from "react";
import { questions } from "../Data/questions";

const QuestionsCard = ({
  data,
  onAnswer,
  showFeedBack,
  selected,
  current,
  total,
}) => {
  const { question, options, answer } = data;
  const getBtnStyle = (option) => {
    if (!showFeedBack) {
      return "bg-indigo-700 hover:bg-indigo-600 hover:scale-[1.01]";
    }
    if (option === answer) return "bg-emerald-600";
    if (option === selected) return "bg-rose-600";
    return "bg-gray-600";
  };
  return (
    <div
      className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-xl
    border border-gray-700 p-4"
    >
      <div className="flex justify-between mb-2">
        <p className="text-lg font-medium text-gray-300">
          Question {current + 1} of {total}
        </p>
        <span className="bg-gray-700 rounded-full px-2 py-1 text-sm">
          {selected
            ? Math.round(((current + 1) / total) * 100) + "% complete"
            : Math.round((current / total) * 100) + "% complete"}
        </span>
      </div>
      <p className="text-xl font-medium mb-6">{question}</p>
      <div className="grid gap-3">
        {options.map((option, index) => {
          return (
            <button
              disabled={showFeedBack}
              onClick={() => {
                onAnswer(option);
              }}
              className={`${getBtnStyle(option)} text-left  cursor-pointer 
            rounded-lg px-4 py-3 text-white`}
              key={index}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionsCard;
