import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function MyOrders() {
  const user = await currentUser();
  if (!user) return <div>Please sign in to view your orders</div>;

  const orders = await getMyOrders(user.id);

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">
                    Order #{order.orderNumber}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {order.orderDate && format(new Date(order.orderDate), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₹{order.totalPrice?.toFixed(2)}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status && order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                  </span>
                  {order.refundStatus && order.refundStatus !== "not_requested" && (
                    <span
                      className={`ml-2 inline-block px-2 py-1 text-xs rounded-full ${
                        order.refundStatus === "refunded"
                          ? "bg-green-100 text-green-800"
                          : order.refundStatus === "denied"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      Refund: {order.refundStatus?.replace(/_/g, " ")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium mb-2">Products</h3>
              <div className="space-y-4">
                {order.products?.map((item) => {
                  // Ensure item.product is not null
                  const product = item?.product;

                  // If product is null, skip this iteration
                  if (!product) return null;

                  // Find the matching variant based on color
                    // Find the matching variant - more robust comparison
                    const selectedVariant = product?.variants?.find(
                        (variant) => variant?.color?.toLowerCase() === item?.color?.toLowerCase()
                    );

                    // Get the first image of the matching variant
                    const variantImage = selectedVariant?.variantImages?.[0]?.asset?.url;
                    console.log(variantImage);
                    
                  return (
                    <div
                      key={`${product?._id}-${item?.sku}`}
                      className="flex items-start gap-4"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                        {variantImage && (
                          <Image
                            src={variantImage}
                            alt={product?.title || "Product image"}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/`}
                          className="font-medium hover:underline"
                        >
                          {product?.title}
                        </Link>
                        <p className="text-sm text-gray-600">SKU: {item?.sku}</p>
                        <p className="text-sm">Qty: {item?.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item?.price?.toFixed(2)}</p>
                        <p className="text-sm">
                          ₹{((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {order.shippingDetails && (
              <div className="p-4 bg-gray-50 border-t">
                <h3 className="font-medium mb-2">Shipping Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">{order.shippingDetails.name}</p>
                    <p className="text-sm">{order.shippingDetails.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      {order.shippingDetails.address?.line1}
                    </p>
                    {order.shippingDetails.address?.line2 && (
                      <p className="text-sm">
                        {order.shippingDetails.address.line2}
                      </p>
                    )}
                    <p className="text-sm">
                      {order.shippingDetails.address?.city},{" "}
                      {order.shippingDetails.address?.state}{" "}
                      {order.shippingDetails.address?.postal_code}
                    </p>
                    <p className="text-sm">
                      {order.shippingDetails.address?.country}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
