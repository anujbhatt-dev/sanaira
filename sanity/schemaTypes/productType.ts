import { PinIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PinIcon,
  preview: {
    select: {
      title: 'title',
      media: 'video', // Use video for preview
      category: 'category.name',
      categoryParent: 'category.parent.name',
      categoryTop: 'category.parent.parent.name',
    },
    prepare({ title, media, category, categoryParent, categoryTop }) {
      const categoryPath = [categoryTop, categoryParent, category].filter(Boolean).join(' > ') || 'No Category';
      return {
        title,
        subtitle: `Category: ${categoryPath}`,
        media, // Note: Sanity may not preview videos directly
      };
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
      options: {
        filter: 'categoryType == "base"', // Only base categories allowed
      },
    }),
    defineField({
      name: 'video',
      title: 'Product Video',
      type: 'file', // Allows video upload
      options: {
        accept: 'video/*', // Restrict to video files
      },
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Variant',
          fields: [
            { name: 'name', title: 'Variant Name', type: 'string', validation: Rule => Rule.required() },
            { name: 'size', title: 'Size', type: 'string' },
            { name: 'color', title: 'Color', type: 'string' }, // Stores Xcode
            { name: 'price', title: 'Price', type: 'number', validation: Rule => Rule.min(0).required() }, // ✅ Price moved inside variant
            { name: 'stock', title: 'Stock', type: 'number', validation: Rule => Rule.min(0) },
            {
              name: 'variantImages',
              title: 'Variant Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }], // ✅ SEO-friendly alt text
                },
              ],
              options: { layout: 'grid' },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
              media: 'variantImages.0',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Unnamed Variant',
                subtitle: `Price: ₹${subtitle || 'N/A'}`,
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'productPath',
      title: 'Product Path',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      readOnly: true, // Auto-populated
    }),
  ],
});
