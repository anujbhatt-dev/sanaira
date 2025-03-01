import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'categoryType',
      title: 'Category Type',
      type: 'string',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Sub', value: 'sub' },
          { title: 'Base', value: 'base' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      hidden: ({ parent }) => parent?.categoryType === 'top', // Top categories shouldn't have parents
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Category',
      type: 'boolean',
      description: 'Mark as a featured category on the homepage.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'categoryType',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
