import { mulish } from "@/utils/font";

const ShippingPolicy = () => {
    return (
      <div className={`${mulish.className} max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-6`}>
        <h2 className="md:text-3xl text-xl font-semibold mb-4 text-black text-center">Shipping Policy</h2> 
        <p className="text-black mb-4">
          At Anaira, we strive to deliver your orders in a timely manner. Below are our shipping policies:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-black">
          <li>Orders are processed within 1-2 business days.</li>
          <li>Standard shipping takes 5-7 business days.</li>
          <li>Express shipping is available for select locations.</li>
          <li>Shipping costs vary based on location and shipping method.</li>
          <li>You will receive a tracking number once your order is shipped.</li>
          <li>We are not responsible for delays due to customs or unforeseen circumstances.</li>
        </ul>
        <p className="text-black mt-4">
          For any shipping inquiries, contact our support team at <a href="mailto:contact@anaira.com" className="text-blue-600 underline">contact@anaira.com</a>.
        </p>
      </div>
    );
  };
  
  export default ShippingPolicy;