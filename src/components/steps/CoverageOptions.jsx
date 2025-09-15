import { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";

export default function CoverageOptions({ data, setData, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErr = {};
    if (!data.coverageType)
      newErr.coverageType = "Type of Coverage is required";
    if (!data.medicalAmount?.trim())
      newErr.medicalAmount = "Medical Coverage Amount is required";
    if (!data.currency?.trim()) newErr.currency = "Currency is required";
    if (!data.tripCancellation)
      newErr.tripCancellation = "Please select Yes or No";
    if (!data.baggageCoverage)
      newErr.baggageCoverage = "Please select Yes or No";
    if (!data.emergencyEvacuation)
      newErr.emergencyEvacuation = "Please select Yes or No";
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });

    if (errors[field]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }
  };

  const selectClass = (err) =>
    `peer w-full border rounded-lg px-3 pt-5 pb-2 outline-none focus:border-black focus:ring-0 ${
      err ? "border-red-500" : "border-gray-300"
    }`;

  const labelClass =
    "absolute left-2 -top-2.5 bg-white px-1 text-[#313131]   text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black";

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">Coverage Options</h2>

      <div className="relative mb-5">
        <select
          value={data.coverageType || ""}
          onChange={(e) => handleChange("coverageType", e.target.value)}
          className={selectClass(errors.coverageType)}
        >
          <option value="" disabled hidden>
            Select Type
          </option>
          <option value="Single Trip">Single Trip</option>
          <option value="Annual Multi-Trip">Annual Multi-Trip</option>
          <option value="Group Travel">Group Travel</option>
        </select>
        <label className={labelClass}>Type of Coverage *</label>
        {errors.coverageType && (
          <p className="text-[#D72638] text-sm mt-1">{errors.coverageType}</p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="number"
          placeholder=""
          value={data.medicalAmount || ""}
          onChange={(e) => handleChange("medicalAmount", e.target.value)}
          className={selectClass(errors.medicalAmount)}
        />
        <label className={labelClass}>Medical Coverage Amount *</label>
        {errors.medicalAmount && (
          <p className="text-[#D72638] text-sm mt-1">{errors.medicalAmount}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex gap-6">
          {["EUR", "TRY", "USD"].map((cur) => (
            <label key={cur} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="currency"
                value={cur}
                checked={data.currency === cur}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="accent-red-500"
              />
              {cur === "EUR"
                ? "Euro (EUR)"
                : cur === "TRY"
                ? "Turkish Lira (TRY)"
                : "United States Dollar (USD)"}
            </label>
          ))}
        </div>
        {errors.currency && (
          <p className="text-[#D72638] text-sm mt-1">{errors.currency}</p>
        )}
      </div>

      {[
        { field: "tripCancellation", label: "Trip Cancellation Coverage *" },
        { field: "baggageCoverage", label: "Baggage Coverage *" },
        {
          field: "emergencyEvacuation",
          label: "Emergency Evacuation Coverage *",
        },
      ].map(({ field, label }) => (
        <div key={field} className="relative mb-5">
          <select
            value={data[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            className={selectClass(errors[field])}
          >
            <option value="" disabled hidden>
              Select option
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label className={labelClass}>{label}</label>
          {errors[field] && (
            <p className="text-[#D72638] text-sm mt-1">{errors[field]}</p>
          )}
        </div>
      ))}

      <div className="flex gap-6 mt-8">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-500 py-2 px-6 rounded-md flex items-center gap-2"
        >
          <FaLessThan />
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-[#D72638] text-white  px-6 rounded-md hover:bg-red-700 flex items-center gap-2"
        >
          Next
          <FaGreaterThan />
        </button>
      </div>
      <h4 className="text-center text-sm text-[#313131] mt-14">
        Stuck on the form?{" "}
        <span className="font-semibold underline">Let's call you!</span>
      </h4>
    </div>
  );
}
