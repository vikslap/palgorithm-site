import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url' // 1. Import the builder

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '24tm4fmj',
  dataset: 'production',
  apiVersion: '2024-04-18',
  useCdn: false,
})

// 2. Initialize the builder with your client
const builder = imageUrlBuilder(client)

// 3. Export the urlFor helper
export function urlFor(source: any) {
  return builder.image(source)
}