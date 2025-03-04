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
      media: 'mainImages.0',
      category: 'category.name',
      categoryParent: 'category.parent.name',
      categoryTop: 'category.parent.parent.name',
    },
    prepare({ title, media, category, categoryParent, categoryTop }) {
      const categoryPath = [categoryTop, categoryParent, category].filter(Boolean).join(' > ') || 'No Category';
      return {
        title,
        subtitle: `Category: ${categoryPath}`,
        media,
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
      options: {
        filter: 'categoryType == "base"', // Only base categories allowed
      },
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
    defineField({
      name: 'productPath',
      title: 'Product Path',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      readOnly: true, // Auto-populated
    }),
  ],
});
