'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Product {
  id: number
  name: string
  category: string
  affiliateUrl: string
  image: string
  price: string
  description: string
}

export default function CategoryPage() {
  const { slug } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/update-products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.products.filter((p: Product) => p.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === slug)
        setProducts(filtered)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{slug?.replace('-', ' & ')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-green-600 mb-4">{product.price}</p>
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy Now</a>
          </div>
        ))}
      </div>
    </div>
  )
}
