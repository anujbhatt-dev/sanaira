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
      category: 'category.name',
      categoryParent: 'category.parent.name',
      categoryTop: 'category.parent.parent.name',
    },
    prepare({ title, category, categoryParent, categoryTop }) {
      const categoryPath = [categoryTop, categoryParent, category].filter(Boolean).join(' > ') || 'No Category';
      return {
        title,
        subtitle: `Category: ${categoryPath}`,
      };
    },
  },
  fields: [
    // Product Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    // Product Slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),

    // Product Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),

    // Product Category
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
      options: {
        filter: 'categoryType == "base"',
      },
    }),

    // Product Video (AWS S3 URL)
    defineField({
      name: 'video',
      title: 'Product Video (AWS S3 URL)',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false,
      }).required(),
    }),

    // Product Variants
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
            { name: 'color', title: 'Color', type: 'string', validation: Rule => Rule.required() },
            {
              name: 'sizes',
              title: 'Sizes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Size',
                  fields: [
                    { name: 'size', title: 'Size', type: 'string', validation: Rule => Rule.required() },
                    { name: 'price', title: 'Price', type: 'number', validation: Rule => Rule.min(0).required() },
                    { name: 'stock', title: 'Stock', type: 'number', validation: Rule => Rule.min(0) },
                  ],
                  preview: {
                    select: {
                      title: 'size',
                      subtitle: 'price',
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title: `Size: ${title}`,
                        subtitle: `Price: ₹${subtitle || 'N/A'}`,
                      };
                    },
                  },
                },
              ],
            },
            {
              name: 'variantImages',
              title: 'Variant Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
                },
              ],
              options: { layout: 'grid' },
            },
          ],
          preview: {
            select: {
              title: 'color',
              subtitle: 'sizes.0.price',
              media: 'variantImages.0',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: `Color: ${title}`,
                subtitle: `Starting Price: ₹${subtitle || 'N/A'}`,
                media,
              };
            },
          },
        },
      ],
    }),

    // Product Path (Auto-Populated)
    defineField({
      name: 'productPath',
      title: 'Product Path',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      readOnly: true, // Auto-populated
    }),
  ],
});
