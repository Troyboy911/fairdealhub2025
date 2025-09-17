'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: number
  name: string
  category: string
  affiliateUrl: string
  image: string
  price: string
  description: string
}

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => setShowPopup(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    fetch('/api/update-products')
      .then(res => res.json())
      .then(data => setProducts(data.products.slice(0, 4))) // Get first 4 products
      .catch(console.error)
  }, [])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for sales funnel integration
    console.log('Email submitted:', email)
    // Send to API or sales funnel
    alert('Thank you for subscribing!')
    setShowPopup(false)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Fairdeal Hub</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/categories" className="hover:underline">Categories</a></li>
              <li><a href="/discount-codes" className="hover:underline">Discount Codes</a></li>
              <li><a href="/blog" className="hover:underline">Blog</a></li>
              <li><a href="/admin" className="hover:underline">Admin</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Top Notch Affiliate Marketing</h1>
          <p className="text-xl mb-8">Discover the best deals, discount codes, and products from popular brands.</p>
          <button onClick={() => setShowPopup(true)} className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold">Get Started</button>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder brands */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Brand 1</h3>
              <p>Discount up to 50%</p>
              <a href="#" className="text-blue-500 hover:underline">Shop Now</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Brand 2</h3>
              <p>Free shipping</p>
              <a href="#" className="text-blue-500 hover:underline">Shop Now</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold">Brand 3</h3>
              <p>Buy one get one</p>
              <a href="#" className="text-blue-500 hover:underline">Shop Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-green-600 mb-4">{product.price}</p>
                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Buy Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discount Codes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Discount Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Code: SAVE10</h3>
              <p>10% off on all items</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Copy Code</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Code: FREESHIP</h3>
              <p>Free shipping on orders over $50</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Copy Code</button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">How to Save Money Shopping Online</h3>
              <p>Tips and tricks for finding the best deals.</p>
              <a href="/blog/save-money" className="text-blue-500 hover:underline">Read More</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Top Affiliate Programs in 2023</h3>
              <p>Review of the best affiliate programs.</p>
              <a href="/blog/affiliate-programs" className="text-blue-500 hover:underline">Read More</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Sales Funnel Strategies</h3>
              <p>How to optimize your sales funnel for better conversions.</p>
              <a href="/blog/sales-funnel" className="text-blue-500 hover:underline">Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Fairdeal Hub. All rights reserved.</p>
        </div>
      </footer>

      {/* Email Signup Popup */}
      {showPopup && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-4">Get the latest deals and discount codes delivered to your inbox.</p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Subscribe</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
