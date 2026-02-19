import React from "react";

export default function Stepper({ step, onChange, clickable = true }) {
  return (
    <div className="flex items-center justify-center">
      {[1, 2, 3].map((num, i) => (
        <React.Fragment key={num}>
          <div
            onClick={() => clickable && onChange?.(num)}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition
              ${clickable ? "cursor-pointer" : "cursor-default"}
              ${
                step >= num
                  ? "bg-brand-500 text-text-primary"
                  : "bg-border-default text-text-secondary"
              }`}
          >
            {num}
          </div>

          {i < 2 && (
            <div
              className={`h-[2px] w-20
                ${
                  step > num
                    ? "bg-brand-700"
                    : "bg-border-light"
                }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
