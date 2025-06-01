import React from "react";

const steps = [
  "Entry",
  "Author Details",
  "Book Details",
  "Cover & Manuscript",
  "Final",
];

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex flex-col items-center flex-1 relative">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2
              ${isCurrent ? "bg-blue-600 text-white border-blue-700" : ""}
              ${isCompleted ? "bg-green-600 text-white border-green-700" : ""}
              ${!isCurrent && !isCompleted ? "bg-white text-gray-400 border-gray-300" : ""}
              transition-all duration-300`}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-1 text-center">{label}</span>

            {index < steps.length - 1 && (
              <div className="absolute top-4 right-0 w-full h-0.5 bg-gray-300 z-[-1]"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
