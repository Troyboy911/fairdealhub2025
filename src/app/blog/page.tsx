export default function Blog() {
  const posts = [
    { slug: 'save-money', title: 'How to Save Money Shopping Online', excerpt: 'Tips and tricks for finding the best deals.' },
    { slug: 'affiliate-programs', title: 'Top Affiliate Programs in 2023', excerpt: 'Review of the best affiliate programs.' },
    { slug: 'sales-funnel', title: 'Sales Funnel Strategies', excerpt: 'How to optimize your sales funnel for better conversions.' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.slug} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="mb-4">{post.excerpt}</p>
            <a href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">Read More</a>
          </div>
        ))}
      </div>
    </div>
  )
}
