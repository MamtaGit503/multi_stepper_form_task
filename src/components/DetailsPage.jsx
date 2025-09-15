import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { MdOutlineFileDownload } from "react-icons/md";

export default function DetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.formData;

  if (!data) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">No Data Found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-6 py-2 rounded-md"
        >
          Go Back to Form
        </button>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Travel Form Details", 105, y, { align: "center" });
    y += 10;

    const addSection = (title, fields) => {
      y += 6;
      doc.setFontSize(14);
      doc.text(title, 10, y);
      y += 6;
      doc.setFontSize(11);
      fields.forEach(([label, value]) => {
        doc.text(`${label}: ${value || "-"}`, 12, y);
        y += 6;
      });
      y += 4;
    };

    addSection("Personal Information", [
      ["Full Name", data.fullName],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Date of Birth", data.dob],
      ["Gender", data.gender],
    ]);

    addSection("Trip Information", [
      ["Departure Country", data.departureCountry],
      ["Destination Country", data.destinationCountry],
      ["Departure Date", data.departureDate],
      ["Return Date", data.returnDate],
      ["Number of Travelers", data.travelers],
    ]);

    addSection("Coverage Options", [
      ["Type of Coverage", data.coverageType],
      ["Medical Coverage Amount", `${data.medicalAmount} ${data.currency}`],
      ["Trip Cancellation Coverage", data.tripCancellation],
      ["Baggage Coverage", data.baggageCoverage],
      ["Emergency Evacuation Coverage", data.emergencyEvacuation],
    ]);

    addSection("Additional Information", [
      ["Passport Number", data.passportNumber],
      ["Address", data.address],
      ["City", data.city],
      ["ZIP Code", data.zipCode],
      ["Traveling with Pets", data.travelingWithPets],
      ["Pre-existing Conditions", data.medicalConditions],
      ["Special Requirements", data.specialRequirements],
    ]);

    doc.save("travel_form_details.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-10 my-10 sm:my-14 w-full">
      <h2 className="text-xl sm:text-3xl font-bold text-center mb-14 text-[#ffffff] bg-black p-2">
        Travel Form Details
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black gray-800 bg-gray-100 px-2 py-1 ">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
            <p>
              <strong>Full Name:</strong> {data.fullName}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Phone:</strong> {data.phone}
            </p>
            <p>
              <strong>Date of Birth:</strong> {data.dob}
            </p>
            <p>
              <strong>Gender:</strong> {data.gender}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black gray-800 bg-gray-100 px-2 py-1 ">
            Trip Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
            <p>
              <strong>Departure Country:</strong> {data.departureCountry}
            </p>
            <p>
              <strong>Destination Country:</strong> {data.destinationCountry}
            </p>
            <p>
              <strong>Departure Date:</strong> {data.departureDate}
            </p>
            <p>
              <strong>Return Date:</strong> {data.returnDate}
            </p>
            <p>
              <strong>Number of Travelers:</strong> {data.travelers}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black gray-800 bg-gray-100 px-2 py-1 ">
            Coverage Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
            <p>
              <strong>Type of Coverage:</strong> {data.coverageType}
            </p>
            <p>
              <strong>Medical Coverage Amount:</strong> {data.medicalAmount}{" "}
              {data.currency}
            </p>
            <p>
              <strong>Trip Cancellation Coverage:</strong>{" "}
              {data.tripCancellation}
            </p>
            <p>
              <strong>Baggage Coverage:</strong> {data.baggageCoverage}
            </p>
            <p>
              <strong>Emergency Evacuation Coverage:</strong>{" "}
              {data.emergencyEvacuation}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black gray-800 bg-gray-100 px-2 py-1">
            Additional Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
            <p>
              <strong>Passport Number:</strong> {data.passportNumber}
            </p>
            <p>
              <strong>Address:</strong> {data.address}
            </p>
            <p>
              <strong>City:</strong> {data.city}
            </p>
            <p>
              <strong>ZIP Code:</strong> {data.zipCode}
            </p>
            <p>
              <strong>Traveling with Pets:</strong> {data.travelingWithPets}
            </p>
            <p>
              <strong>Pre-existing Conditions:</strong> {data.medicalConditions}
            </p>
            <p className="sm:col-span-2">
              <strong>Special Requirements:</strong> {data.specialRequirements}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white flex items-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 rounded-md hover:bg-green-700 text-sm sm:text-base"
        >
          Download PDF
          <MdOutlineFileDownload className="text-2xl" />
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-[#D72638] text-white w-full sm:w-auto px-6 sm:px-8 py-3 rounded-md hover:bg-red-700 text-sm sm:text-base"
        >
          Back to Form
        </button>
      </div>
    </div>
  );
}
