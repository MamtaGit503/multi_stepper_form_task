import { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";

export default function TripInfo({ data, setData, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErr = {};
    if (!data.departureCountry.trim())
      newErr.departureCountry = "Departure Country is required";
    if (!data.destinationCountry.trim())
      newErr.destinationCountry = "Destination Country is required";
    if (!data.departureDate)
      newErr.departureDate = "Departure Date is required";
    if (!data.returnDate) newErr.returnDate = "Return Date is required";
    if (!data.travelers || data.travelers <= 0)
      newErr.travelers = "Enter valid number of travelers";
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = (err) =>
    `peer w-full border rounded-lg px-3 pt-5 pb-2 outline-none placeholder-transparent focus:border-black focus:ring-0 ${
      err ? "border-red-500" : "border-gray-300"
    }`;

  const labelClass =
    "absolute left-2 -top-2.5 bg-white px-1 text-[#313131]   text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black";

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">Trip Information</h2>

      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Departure Country"
          value={data.departureCountry || ""}
          onChange={(e) => handleChange("departureCountry", e.target.value)}
          className={inputClass(errors.departureCountry)}
        />
        <label className={labelClass}>Departure Country *</label>
        {errors.departureCountry && (
          <p className="text-[#D72638] text-sm mt-1">
            {errors.departureCountry}
          </p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Destination Country"
          value={data.destinationCountry || ""}
          onChange={(e) => handleChange("destinationCountry", e.target.value)}
          className={inputClass(errors.destinationCountry)}
        />
        <label className={labelClass}>Destination Country *</label>
        {errors.destinationCountry && (
          <p className="text-[#D72638] text-sm mt-1">
            {errors.destinationCountry}
          </p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="date"
          placeholder="Departure Date"
          value={data.departureDate || ""}
          onChange={(e) => handleChange("departureDate", e.target.value)}
          className={inputClass(errors.departureDate)}
        />
        <label className={labelClass}>Departure Date *</label>
        <IoCalendarOutline className="absolute right-3 top-6 text-gray-600 pointer-events-none" />
        {errors.departureDate && (
          <p className="text-[#D72638] text-sm mt-1">{errors.departureDate}</p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="date"
          placeholder="Return Date"
          value={data.returnDate || ""}
          onChange={(e) => handleChange("returnDate", e.target.value)}
          className={inputClass(errors.returnDate)}
        />
        <label className={labelClass}>Return Date *</label>
        <IoCalendarOutline className="absolute right-3 top-6 text-gray-600 pointer-events-none" />
        {errors.returnDate && (
          <p className="text-[#D72638] text-sm mt-1">{errors.returnDate}</p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="number"
          placeholder="Number of Travelers"
          value={data.travelers || ""}
          onChange={(e) => handleChange("travelers", e.target.value)}
          className={inputClass(errors.travelers)}
        />
        <label className={labelClass}>Number of Travelers *</label>
        {errors.travelers && (
          <p className="text-[#D72638] text-sm mt-1">{errors.travelers}</p>
        )}
      </div>

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
