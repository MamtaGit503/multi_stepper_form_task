import { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";

export default function PersonalInfo({ data, setData, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErr = {};
    if (!data.fullName.trim()) newErr.fullName = "Full Name is required";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) newErr.email = "Enter valid email";
    if (!/^\d{10}$/.test(data.phone))
      newErr.phone = "Enter 10 digit phone number";
    if (!data.dob) newErr.dob = "Date of Birth is required";
    if (!data.gender) newErr.gender = "Select gender";
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const validateField = (field, value) => {
    switch (field) {
      case "fullName":
        return value.trim() ? null : "Full Name is required";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? null : "Enter valid email";
      case "phone":
        return /^\d{10}$/.test(value) ? null : "Enter 10 digit phone number";
      case "dob":
        return value ? null : "Date of Birth is required";
      case "gender":
        return value ? null : "Select gender";
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const handleChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);

    const err = validateField(field, value);
    setErrors((prev) => {
      const copy = { ...prev };
      if (err) copy[field] = err;
      else delete copy[field];
      return copy;
    });
  };

  const inputClass = (err) =>
    `peer w-full border rounded-lg px-3 pt-5 pb-2 outline-none placeholder-transparent focus:border-black focus:ring-0 ${
      err ? "border-red-500" : "border-gray-300"
    }`;

  const labelClass =
    "absolute left-2 -top-2.5 bg-white px-1 text-[#313131]  text-sm transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black";

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">Personal Information</h2>

      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Full Name"
          value={data.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className={inputClass(errors.fullName)}
        />
        <label className={labelClass}>Full Name *</label>
        {errors.fullName && (
          <p className="text-[#D72638] text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={inputClass(errors.email)}
        />
        <label className={labelClass}>E-mail Address *</label>
        {errors.email && (
          <p className="text-[#D72638] text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          type="tel"
          placeholder="Phone"
          value={data.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={inputClass(errors.phone)}
        />
        <label className={labelClass}>Phone Number *</label>
        {errors.phone && (
          <p className="text-[#D72638] text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="relative mb-5">
        <input
          id="dob-input"
          type="date"
          placeholder="Date of Birth"
          value={data.dob}
          onChange={(e) => handleChange("dob", e.target.value)}
          className={`${inputClass(errors.dob)} pr-10 appearance-none`}
        />
        <label className={labelClass}>Date of Birth *</label>

        <IoCalendarOutline
          onClick={() => document.getElementById("dob-input").showPicker()}
          className="absolute right-3 top-6 text-black cursor-pointer"
        />

        {errors.dob && (
          <p className="text-[#D72638] text-sm mt-1">{errors.dob}</p>
        )}
      </div>
      <div className="relative mb-5">
        <select
          value={data.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className={`${inputClass(errors.gender)} pt-5 pb-2`}
        >
          <option value="" hidden></option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <label className={labelClass}>Gender *</label>
        {errors.gender && (
          <p className="text-[#D72638] text-sm mt-1">{errors.gender}</p>
        )}
      </div>

      <div className="flex gap-6 mt-8">
        <button
          disabled
          className="bg-gray-200 text-gray-500 py-2 px-6 rounded-md flex items-center gap-2 cursor-not-allowed opacity-50"
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
