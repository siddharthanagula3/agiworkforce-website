/**
 * OpenAPI 3.0 Specification Endpoint
 * Documents all public API endpoints
 */

import { NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const openApiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'AGI Workforce API',
      version: '0.1.0-alpha',
      description: 'API documentation for AGI Workforce desktop automation platform',
      contact: {
        name: 'AGI Workforce Support',
        email: 'contact@agiworkforce.com',
        url: 'https://agiworkforce.com/contact',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'https://agiworkforce.com/api',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Public',
        description: 'Public endpoints accessible without authentication',
      },
      {
        name: 'Download',
        description: 'Application download endpoints',
      },
      {
        name: 'Contact',
        description: 'Contact and newsletter endpoints',
      },
      {
        name: 'Structured Data',
        description: 'Machine-readable data endpoints',
      },
    ],
    paths: {
      '/feed.json': {
        get: {
          tags: ['Public', 'Structured Data'],
          summary: 'Get JSON Feed',
          description: 'Returns a JSON Feed (v1.1) with site content for AI agents',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/feed+json': {
                  schema: {
                    type: 'object',
                    properties: {
                      version: { type: 'string', example: 'https://jsonfeed.org/version/1.1' },
                      title: { type: 'string', example: 'AGI Workforce' },
                      home_page_url: { type: 'string', example: 'https://agiworkforce.com' },
                      feed_url: { type: 'string', example: 'https://agiworkforce.com/api/feed.json' },
                      description: { type: 'string' },
                      items: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: { type: 'string' },
                            url: { type: 'string' },
                            title: { type: 'string' },
                            content_text: { type: 'string' },
                            summary: { type: 'string' },
                            date_published: { type: 'string', format: 'date-time' },
                            tags: { type: 'array', items: { type: 'string' } },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/structured-data': {
        get: {
          tags: ['Public', 'Structured Data'],
          summary: 'Get Structured Data',
          description: 'Returns combined JSON-LD schemas for AI agents',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/ld+json': {
                  schema: {
                    type: 'object',
                    properties: {
                      '@context': { type: 'string', example: 'https://schema.org' },
                      '@graph': {
                        type: 'array',
                        items: { type: 'object' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/download/windows/latest': {
        get: {
          tags: ['Download'],
          summary: 'Get Latest Windows Download',
          description: 'Returns metadata for the latest Windows installer',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      version: { type: 'string', example: '0.1.0-alpha' },
                      url: { type: 'string', example: 'https://github.com/siddharthanagula3/agiworkforce-desktop/releases/download/v0.1.0-alpha/AGIWorkforce_0.1.0_x64_en-US.msi' },
                      size: { type: 'string', example: '45.2 MB' },
                      releaseDate: { type: 'string', format: 'date-time' },
                      platform: { type: 'string', example: 'windows' },
                      architecture: { type: 'string', example: 'x64' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/contact': {
        post: {
          tags: ['Contact'],
          summary: 'Submit Contact Form',
          description: 'Submit a contact form message',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'message'],
                  properties: {
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', format: 'email', example: 'john@example.com' },
                    company: { type: 'string', example: 'Acme Corp' },
                    subject: { type: 'string', example: 'Product Inquiry' },
                    message: { type: 'string', example: 'I am interested in your product...' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Message sent successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Message sent successfully' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Bad request - invalid input',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string', example: 'Invalid email address' },
                    },
                  },
                },
              },
            },
            '429': {
              description: 'Rate limit exceeded',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string', example: 'Rate limit exceeded' },
                      retryAfter: { type: 'number', example: 60 },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/newsletter': {
        post: {
          tags: ['Contact'],
          summary: 'Subscribe to Newsletter',
          description: 'Subscribe to the AGI Workforce newsletter',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email'],
                  properties: {
                    email: { type: 'string', format: 'email', example: 'subscriber@example.com' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Subscribed successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      message: { type: 'string', example: 'Successfully subscribed' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Bad request - invalid email',
            },
            '429': {
              description: 'Rate limit exceeded',
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            statusCode: { type: 'number' },
          },
        },
      },
    },
  }

  return NextResponse.json(openApiSpec, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
