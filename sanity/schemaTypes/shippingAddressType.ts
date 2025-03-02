import { defineType, defineField } from "sanity";

export const shippingAddressType = defineType({
  name: "shippingAddress",
  title: "Shipping Address",
  type: "document",
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "reference",
      to: [{ type: "user" }], // Assuming there's a 'user' document in your schema
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "recipientName",
      title: "Recipient Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Contact Number",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^\+?[1-9]\d{1,14}$/, {
          name: "Valid phone number",
          invert: false,
        }),
    }),
    defineField({
      name: "addressLine1",
      title: "Address Line 1",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "addressLine2",
      title: "Address Line 2",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State (India Only)",
      type: "string",
      hidden: ({ document }) => document?.country !== "IN",
    }),
    defineField({
      name: "provinceOrRegion",
      title: "Province/Region (For International)",
      type: "string",
      hidden: ({ document }) => document?.country === "IN",
    }),
    defineField({
      name: "postalCode",
      title: "Postal Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      initialValue: "IN",
      options: {
        list: [
          { title: "India", value: "IN" },
          { title: "United States", value: "US" },
          { title: "United Kingdom", value: "UK" },
          { title: "Canada", value: "CA" },
          { title: "Australia", value: "AU" },
          { title: "Germany", value: "DE" },
          { title: "France", value: "FR" },
          { title: "United Arab Emirates", value: "AE" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});


