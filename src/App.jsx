import { BrowserRouter, Routes, Route } from "react-router-dom";
import MultiStepForm from "./components/MultiStepForm";
import DetailsPage from "./components/DetailsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Routes>
          <Route path="/" element={<MultiStepForm />} />
          <Route path="/details" element={<DetailsPage />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </BrowserRouter>
  );
}
