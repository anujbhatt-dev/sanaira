import { mulish } from "@/utils/font";

const TermsAndConditions = () => {
    return (
      <div className={`${mulish.className} max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-6`}>
        <h2 className="md:text-3xl text-xl font-semibold mb-4 text-black text-center">Terms & Conditions</h2> 
        <p className="text-black mb-4">
          Welcome to Anaira! By accessing and using our website, you agree to abide by the following terms and conditions:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-black">
          <li>All content on this website is the property of Anaira and may not be copied or used without permission.</li>
          <li>By placing an order, you agree to provide accurate and complete information.</li>
          <li>Prices and availability of products are subject to change without prior notice.</li>
          <li>Unauthorized use of this website may result in legal action.</li>
          <li>We reserve the right to cancel any order at our discretion.</li>
          <li>By using our services, you agree to comply with all applicable laws and regulations.</li>
        </ul>
        <p className="text-black mt-4">
          For any inquiries regarding our terms, contact our support team at <a href="mailto:contact@anaira.com" className="text-blue-600 underline">contact@anaira.com</a>.
        </p>
      </div>
    );
  };
  
  export default TermsAndConditions;
