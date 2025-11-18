// function to dynamically generate robots.txt
// based on https://abelnnieva.dev/notes/dynamically-generating-robots-txt-in-nextjs

export async function GET() {
  // Generate the robots.txt content based on the environment
  const content = `User-agent: *
Allow: /
Sitemap: ${process.env.BASE_URL}/sitemap.xml`

  // Return the response with the content and correct MIME type
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
