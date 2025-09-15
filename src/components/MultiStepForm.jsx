import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import PersonalInfo from "./steps/PersonalInfo";
import TripInfo from "./steps/TripInfo";
import CoverageOptions from "./steps/CoverageOptions";
import AdditionalInfo from "./steps/AdditionalInfo";

export default function MultiStepForm() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",

    // Step 2
    departureCountry: "",
    destinationCountry: "",
    departureDate: "",
    returnDate: "",
    travelers: "",

    // Step 3
    coverageType: "",
    medicalCoverage: "",
    currency: "",
    tripCancellationCoverage: "",
    baggageCoverage: "",
    emergencyEvacuationCoverage: "",

    // Step 4
    passportNumber: "",
    address: "",
    city: "",
    zipCode: "",
    travelingWithPets: "",
    medicalConditions: "",
    specialRequirements: "",
  });

  const steps = [
    "Personal Information",
    "Trip Information",
    "Coverage Options",
    "Additional Information",
  ];

  const nextStep = () => setCurrentStep((s) => s + 1);
  const prevStep = () => setCurrentStep((s) => s - 1);

  const handleFinalSubmit = () => {
    navigate("/details", { state: { formData } });
  };

  return (
    <div className="w-full max-w-xl mx-6 bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-11 my-8 sm:my-12 md:my-14">
      <Stepper steps={steps} currentStep={currentStep} />

      {currentStep === 1 && (
        <PersonalInfo data={formData} setData={setFormData} onNext={nextStep} />
      )}

      {currentStep === 2 && (
        <TripInfo
          data={formData}
          setData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {currentStep === 3 && (
        <CoverageOptions
          data={formData}
          setData={setFormData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {currentStep === 4 && (
        <AdditionalInfo
          data={formData}
          setData={setFormData}
          onBack={prevStep}
          onSubmit={handleFinalSubmit}
        />
      )}
    </div>
  );
}
