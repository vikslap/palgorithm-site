import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '24tm4fmj',
  dataset: 'production',
  apiVersion: '2024-04-18',
  useCdn: false,
})