import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: "user",
  title: "Users",
  type: "document",
  icon: UserIcon,
  fields: [
    // Clerk IDs and metadata
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
    defineField({
      name: "lastActiveAt",
      title: "Last Active At",
      type: "datetime",
    }),
    defineField({
      name: "imageUrl",
      title: "Profile Image URL",
      type: "url",
    }),

    // User info
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
    }),
    defineField({
      name: "primaryEmail",
      title: "Primary Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    // Shipping details
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
    // Wishlist
    defineField({
      name: "wishlist",
      title: "Wishlist",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "addedAt",
              title: "Added At",
              type: "datetime",
              initialValue: (new Date()).toISOString(),
            }            
          ],
          preview: {
            select: {
              title: "product.title",
              media: "product.variants.0.variantImages.0",
            },
            prepare(selection) {
              const { title, subtitle, media } = selection;
              return {
                title: title || "Unnamed Product",
                media,
              };
            },
          },
        },
      ],
    }),

    // Recently Viewed
    defineField({
      name: "recentlyViewed",
      title: "Recently Viewed Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "viewedAt",
              title: "Viewed At",
              type: "datetime",
              initialValue: (new Date()).toISOString(),
            },
          ],
          preview: {
            select: {
              title: "product.title",
              subtitle: "viewedAt",
              media: "product.variants.0.variantImages.0",
            },
            prepare(selection) {
              const { title, subtitle, media } = selection;
              return {
                title: title || "Unnamed Product",
                subtitle: `Viewed: ${new Date(subtitle).toLocaleDateString()}`,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(20),      
    }),
    // Future: Orders and address reference (optional for later use)
    defineField({
      name: "orders",
      title: "Orders",
      type: "array",
      of: [{ type: "reference", to: [{ type: "order" }] }],
    }),
  ],
  preview: {
    select: {
      title: "firstName",
      subtitle: "primaryEmail",
      // media: "imageUrl",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Unnamed User",
        subtitle: subtitle || "No email",
        // media,
      };
    },
  },
});
