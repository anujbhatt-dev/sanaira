import { mulish } from "@/utils/font";

const ReturnAndExchange = () => {
    return (
      <div className={`${mulish.className} max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg my-6`}>
        <h2 className="md:text-3xl text-xl font-semibold mb-4 text-black text-center">Return & Exchange Policy</h2> 
        <p className="text-black mb-4">
          At Anaira, we want you to be completely satisfied with your purchase. If you are not happy with your order, you may request a return or exchange under the following conditions:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-black">
          <li>Returns and exchanges are accepted within 7 days of delivery.</li>
          <li>Items must be unused, unworn, and in their original packaging.</li>
          <li>Customers are responsible for return shipping costs unless the item is defective or incorrect.</li>
          <li>Once the returned item is received and inspected, a refund or exchange will be processed.</li>
          <li>Refunds will be credited to the original payment method within 7-10 business days.</li>
          <li>Sale items and gift cards are not eligible for returns or exchanges.</li>
        </ul>
        <p className="text-black mt-4">
          For return and exchange requests, contact our support team at <a href="mailto:contact@anaira.com" className="text-blue-600 underline">contact@anaira.com</a>.
        </p>
      </div>
    );
  };
  
  export default ReturnAndExchange;
