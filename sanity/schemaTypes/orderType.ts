import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Orders",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          title: "Product Item",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "sku",
              title: "Stock Keeping Unit",
              type: "string",
              description: "Specify the product sku",
            }),            
            defineField({
              name: "price",
              title: "Price",
              type: "number",
              description: "Specify the product price paid",
            }),
          ],
          preview: {
            select: {
              title: "product.title",
              quantity: "quantity",
              image: "product.mainImages.0", // Selects the first image from mainImages array
            },
            prepare({ title, quantity, image }) {
              return {
                title: `${title} x ${quantity}`,
                subtitle: `Quantity: ${quantity}`,
                media: image, // Displays product image in preview
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      title: "Discount Amount",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    // Refund fields
    defineField({
      name: "refundStatus",
      title: "Refund Status",
      type: "string",
      options: {
        list: [
          { title: "Not Requested", value: "not_requested" },
          { title: "Requested", value: "requested" },
          { title: "Refunded", value: "refunded" },
          { title: "Denied", value: "denied" },
        ],
      },      
    }),
    defineField({
      name: "refundAmount",
      title: "Refund Amount",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "returnReason",
      title: "Return Reason",
      type: "string",      
    }),
    defineField({
      name: "refundDate",
      title: "Refund Date",
      type: "datetime",      
    }),
    defineField({
      name: "shippingDetails",
      title: "Shipping Details",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Recipient Name",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone Number",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "object",
          fields: [
            defineField({
              name: "line1",
              title: "Address Line 1",
              type: "string",
            }),
            defineField({
              name: "line2",
              title: "Address Line 2",
              type: "string",
            }),
            defineField({
              name: "city",
              title: "City",
              type: "string",
            }),
            defineField({
              name: "state",
              title: "State",
              type: "string",
            }),
            defineField({
              name: "postal_code",
              title: "Postal Code",
              type: "string",
            }),
            defineField({
              name: "country",
              title: "Country",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
      refundStatus: "refundStatus",
    },
    prepare({ name, amount, currency, orderId, email, refundStatus }) {
      const orderIdSnippet = orderId ? `${orderId.slice(0, 5)}...${orderId.slice(-5)}` : "N/A";
      return {
        title: `${name} (${orderIdSnippet})`,
        subtitle: `${amount} ${currency}, ${email} ${refundStatus ? `- Refund Status: ${refundStatus}` : ''}`,
        media: BasketIcon,
      };
    },
  },
});
