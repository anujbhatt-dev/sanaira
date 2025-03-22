import { mulish } from "@/utils/font";

const PrivacyPolicy = () => {
    return (
      <div className={`${mulish.className} max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-6`}>
        <h2 className="md:text-3xl text-xl font-semibold mb-4 text-black text-center">Privacy Policy</h2> 
        <p className="text-black mb-4">
          At Anaira, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-black">
          <li>We collect personal information such as name, email, phone number, and address for order processing.</li>
          <li>Your data is securely stored and will not be shared with third parties without your consent.</li>
          <li>We use cookies to improve your browsing experience and analyze website traffic.</li>
          <li>You can opt out of marketing emails at any time.</li>
          <li>We implement security measures to protect your information from unauthorized access.</li>
          <li>By using our website, you agree to our Privacy Policy.</li>
        </ul>
        <p className="text-black mt-4">
          For any privacy concerns, contact our support team at <a href="mailto:contact@anaira.com" className="text-blue-600 underline">contact@anaira.com</a>.
        </p>
      </div>
    );
  };
  
  export default PrivacyPolicy;
