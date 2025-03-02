import { defineType, defineField } from "sanity";

export const couponType = defineType({
  name: "coupon",
  title: "Coupon",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Coupon Code",
      type: "string",
      description: "Unique code for the coupon",
      validation: (Rule) => Rule.required().min(5).max(20), // Coupon code should be between 5-20 characters
    }),
    defineField({
      name: "discountPercentage",
      title: "Discount Percentage",
      type: "number",
      description: "Discount percentage applied by the coupon",
      validation: (Rule) => Rule.min(0).max(100).required(),
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Fixed discount amount applied by the coupon (if applicable)",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
      description: "The date and time from when the coupon is valid",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "datetime",
      description: "The expiry date and time for the coupon",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "usageLimit",
      title: "Usage Limit",
      type: "number",
      description: "Maximum number of times this coupon can be used",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "status",
      title: "Coupon Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Expired", value: "expired" },
          { title: "Disabled", value: "disabled" },
        ],
      },
      initialValue: "active", // Default value
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "applicableToProducts",
      title: "Applicable to Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }], // Assuming there's a 'product' document type
        },
      ],
      description: "List of products this coupon can be applied to",
    }),
    defineField({
      name: "applicableToAllProducts",
      title: "Applicable to All Products",
      type: "boolean",
      description: "If true, the coupon can be applied to all products in the store.",
      initialValue: false,
    }),
  ],
});

export default couponType;
