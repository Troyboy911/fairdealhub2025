export default function DiscountCodes() {
  const codes = [
    { code: 'SAVE10', description: '10% off on all items', brand: 'General' },
    { code: 'FREESHIP', description: 'Free shipping on orders over $50', brand: 'General' },
    { code: 'NEWUSER', description: '20% off for new users', brand: 'Brand 1' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Discount Codes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {codes.map((code, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{code.code}</h2>
            <p className="mb-2">{code.description}</p>
            <p className="text-sm text-gray-600">Brand: {code.brand}</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Copy Code</button>
          </div>
        ))}
      </div>
    </div>
  )
}
