export const generateMetaTags = (options) => {
  const defaults = {
    title: 'AI Background Remover - Remove Image Backgrounds Instantly',
    description: 'Professional AI-powered background removal with precise edge detection. Get transparent backgrounds in seconds.',
    image: '/og-image.jpg',
    url: 'https://backgroundremover.ai'
  }
  
  const meta = { ...defaults, ...options }
  
  return [
    { name: 'description', content: meta.description },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:image', content: meta.image },
    { property: 'og:url', content: meta.url },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.image }
  ]
}

export const generateSchemaMarkup = (type, data) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type
  }
  
  const schemas = {
    Organization: {
      ...baseSchema,
      name: 'AI Background Remover',
      url: 'https://backgroundremover.ai',
      logo: 'https://backgroundremover.ai/logo.png',
      sameAs: [
        'https://twitter.com/bgremover',
        'https://github.com/bgremover',
        'https://linkedin.com/company/bgremover'
      ]
    },
    Product: {
      ...baseSchema,
      name: data.name || 'AI Background Removal Service',
      description: data.description || 'Professional background removal service',
      offers: {
        '@type': 'Offer',
        price: data.price || '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    },
    WebApplication: {
      ...baseSchema,
      name: 'AI Background Remover',
      description: 'Remove backgrounds from images instantly with AI',
      applicationCategory: 'Multimedia',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }
  
  return schemas[type] || baseSchema
}