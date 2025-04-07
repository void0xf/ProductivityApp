import React from "react";

const SettingsCartElement = ({
  name,
  valueToSet,
  setterFunction,
  ariaLabel,
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-sm text-textcolor pr-4" id={`${name}-label`}>
        {name}
      </div>
      <button
        onClick={setterFunction}
        className="relative"
        role="switch"
        aria-checked={valueToSet}
        aria-label={ariaLabel || name}
        aria-labelledby={`${name}-label`}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setterFunction();
          }
        }}
      >
        <div
          className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            valueToSet ? "bg-green-500" : "bg-gray-200"
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
              valueToSet ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </button>
    </div>
  );
};

export default SettingsCartElement;
