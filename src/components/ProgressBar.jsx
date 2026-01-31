const steps = [
  "Personal details",
  "Commitments",
  "Organization-related",
  "Payment",
  "Create Account",
];

export default function ProgressBar({ currentStep, loading }) {
  return (
    
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="mx-auto min-w-[65rem] max-w-[65rem] px-6 py-4 space-y-5">
        {/* Title */}
        <div className="flex items-center justify-center">
          <img src="/public/upacm.png" className="img-logo" alt="" />
          <span className="text-blue-600 text-2xl font-semibold tracking-tight ">
          </span>
        </div>

        {/* Stepper */}
        <ul className="relative flex items-center justify-between">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = index === steps.length - 1;

            return (
              <li
                key={label}
                className="relative flex flex-1 items-center justify-center"
              >
                {/* Connector */}
                {!isLast && (
                  <div
                    className={`
                      absolute left-1/2 top-6 h-[2px] w-full
                      ${isCompleted ? "bg-blue-600" : "bg-gray-300"}
                    `}
                  />
                )}

                {/* Step */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`
                      flex h-11 w-11 items-center justify-center rounded-full
                      text-sm font-semibold transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-600 text-white scale-110 ring-4 ring-blue-100"
                          : isCompleted
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {stepNumber}
                  </div>

                  <span
                    className={`
                      text-xs font-medium text-center transition-colors
                      ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
