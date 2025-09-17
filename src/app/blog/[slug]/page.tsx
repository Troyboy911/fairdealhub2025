interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: PageProps) {
  const posts: { [key: string]: { title: string; content: string } } = {
    'save-money': {
      title: 'How to Save Money Shopping Online',
      content: 'Tips and tricks for finding the best deals. Shop during sales, use discount codes, compare prices, etc.'
    },
    'affiliate-programs': {
      title: 'Top Affiliate Programs in 2023',
      content: 'Review of the best affiliate programs. Amazon Associates, ShareASale, CJ Affiliate, etc.'
    },
    'sales-funnel': {
      title: 'Sales Funnel Strategies',
      content: 'How to optimize your sales funnel for better conversions. Awareness, interest, decision, action.'
    },
  }

  const post = posts[params.slug]

  if (!post) {
    return <div className="min-h-screen bg-gray-100 p-8"><h1>Post not found</h1></div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
      <p>{post.content}</p>
      <a href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">Back to Blog</a>
    </div>
  )
}
