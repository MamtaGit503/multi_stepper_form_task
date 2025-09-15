import { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";

export default function AdditionalInfo({ data, setData, onBack, onSubmit }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErr = {};

    if (!data.passportNumber?.trim())
      newErr.passportNumber = "Passport Number is required";
    if (!data.address?.trim()) newErr.address = "Address is required";
    if (!data.city?.trim()) newErr.city = "City is required";
    if (!data.zipCode?.trim()) newErr.zipCode = "ZIP Code is required";
    if (!data.travelingWithPets)
      newErr.travelingWithPets = "Please select Yes or No";
    if (!data.medicalConditions?.trim())
      newErr.medicalConditions = "This field is required";
    if (!data.specialRequirements?.trim())
      newErr.specialRequirements = "This field is required";

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
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
      <h2 className="text-2xl font-semibold mb-10">Additional Information</h2>

      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Passport Number"
          value={data.passportNumber || ""}
          onChange={(e) => handleChange("passportNumber", e.target.value)}
          className={inputClass(errors.passportNumber)}
        />
        <label className={labelClass}>Passport Number *</label>
        {errors.passportNumber && (
          <p className="text-[#D72638] text-sm mt-1">{errors.passportNumber}</p>
        )}
      </div>

      <div className="relative mb-5">
        <textarea
          placeholder="Address"
          value={data.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          className={inputClass(errors.address) + " h-24 resize-none"}
        />
        <label className={labelClass}>Address *</label>
        {errors.address && (
          <p className="text-[#D72638] text-sm mt-1">{errors.address}</p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="text"
          placeholder="City"
          value={data.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
          className={inputClass(errors.city)}
        />
        <label className={labelClass}>City *</label>
        {errors.city && (
          <p className="text-[#D72638] text-sm mt-1">{errors.city}</p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="text"
          placeholder="ZIP Code"
          value={data.zipCode || ""}
          onChange={(e) => handleChange("zipCode", e.target.value)}
          className={inputClass(errors.zipCode)}
        />
        <label className={labelClass}>ZIP Code *</label>
        {errors.zipCode && (
          <p className="text-[#D72638] text-sm mt-1">{errors.zipCode}</p>
        )}
      </div>

      <div className="relative mb-5">
        <select
          value={data.travelingWithPets || ""}
          onChange={(e) => handleChange("travelingWithPets", e.target.value)}
          className={inputClass(errors.travelingWithPets)}
        >
          <option value="" disabled hidden>
            Select option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label className={labelClass}>Traveling with Pets *</label>
        {errors.travelingWithPets && (
          <p className="text-[#D72638] text-sm mt-1">
            {errors.travelingWithPets}
          </p>
        )}
      </div>

      <div className="relative mb-5">
        <textarea
          placeholder="Any Pre-Existing Medical Conditions"
          value={data.medicalConditions || ""}
          onChange={(e) => handleChange("medicalConditions", e.target.value)}
          className={inputClass(errors.medicalConditions) + " h-24 resize-none"}
        />
        <label className={labelClass}>
          Any Pre-Existing Medical Conditions *
        </label>
        {errors.medicalConditions && (
          <p className="text-[#D72638] text-sm mt-1">
            {errors.medicalConditions}
          </p>
        )}
      </div>

      <div className="relative mb-5">
        <textarea
          placeholder="Any Special Requirements or Requests"
          value={data.specialRequirements || ""}
          onChange={(e) => handleChange("specialRequirements", e.target.value)}
          className={
            inputClass(errors.specialRequirements) + " h-24 resize-none"
          }
        />
        <label className={labelClass}>
          Any Special Requirements or Requests *
        </label>
        {errors.specialRequirements && (
          <p className="text-[#D72638] text-sm mt-1">
            {errors.specialRequirements}
          </p>
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
          onClick={handleSubmit}
          className="bg-[#D72638] text-white  px-6 rounded-md hover:bg-red-700 flex items-center gap-2"
        >
          Get a Quote
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
