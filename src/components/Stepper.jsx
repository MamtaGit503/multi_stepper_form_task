export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex gap-3 mb-16 overflow-x-auto justify-between">
      {steps.map((step, index) => {
        const completed = index + 1 <= currentStep;

        return (
          <div key={index} className="">
            <div
              className={`pb-2 text-sm font-medium ${
                completed ? "text-black" : "text-gray-400"
              }`}
            >
              {step}
            </div>
            <div
              className={`h-1.5 rounded-full ${
                completed ? "bg-[#D72638]" : "bg-gray-200"
              }`}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
