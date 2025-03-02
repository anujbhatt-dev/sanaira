import { defineType, defineField } from "sanity";

export const saleType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Sale Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Sale Description",
      type: "text",
      description: "Optional detailed description of the sale",
    }),
    defineField({
      name: "saleType",
      title: "Sale Type",
      type: "string",
      options: {
        list: [
          { title: "Discount", value: "discount" },
          { title: "Clearance", value: "clearance" },
          { title: "Limited Time Offer", value: "limited_time_offer" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discountPercentage",
      title: "Discount Percentage",
      type: "number",
      description: "Discount percentage for the sale (if applicable)",
      validation: (Rule) => Rule.min(0).max(100),
      hidden: ({ document }) => document?.saleType !== "discount", // Show only if discount sale type is selected
    }),
    defineField({
      name: "startDate",
      title: "Sale Start Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Sale End Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Sale Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Inactive", value: "inactive" },
          { title: "Completed", value: "completed" },
        ],
      },
      initialValue: "inactive", // Default value
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "applyToAllProducts",
      title: "Apply to All Products",
      type: "boolean",
      description: "If true, this sale applies to all products.",
      initialValue: false,
    }),
    defineField({
      name: "products",
      title: "Products on Sale",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }], // Assuming there's a 'product' document type
        },
      ],
      description: "List of products that are part of the sale",
      hidden: ({ document }) => document?.applyToAllProducts === true, // Hide if 'applyToAllProducts' is true
    }),
  ],
});


