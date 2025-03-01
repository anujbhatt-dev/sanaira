import { PinIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType =  defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PinIcon,
  preview: {
    select: {
      title: 'title',
      media: 'mainImages.0',
      subtitle: 'category.name',
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
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImages',
      title: 'Main Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' },
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
            { name: 'size', title: 'Size', type: 'string' },
            { name: 'color', title: 'Color', type: 'string' },
            { name: 'stock', title: 'Stock', type: 'number', validation: Rule => Rule.min(0) },
            {
              name: 'variantImages',
              title: 'Variant Images',
              type: 'array',
              of: [{ type: 'image' }],
              options: { layout: 'grid' },
            },
          ],
          preview: {
            select: {
              title: 'size',
              subtitle: 'color',
              media: 'variantImages.0',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: `Size: ${title || 'N/A'}`,
                subtitle: `Color: ${subtitle || 'N/A'}`,
                media,
              };
            },
          },
        },
      ],
    }),
    // defineField({
    //   name: 'rating',
    //   title: 'Average Rating',
    //   type: 'number',
    //   description: 'Calculated from reviews',
    //   validation: Rule => Rule.min(1).max(5),
    // }),
    // defineField({
    //   name: 'reviewCount',
    //   title: 'Review Count',
    //   type: 'number',
    //   description: 'Total number of reviews',
    //   validation: Rule => Rule.min(0),
    // }),
    // defineField({
    //   name: 'reviews',
    //   title: 'Reviews',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'review' }] }],
    // }),
  ],
});
