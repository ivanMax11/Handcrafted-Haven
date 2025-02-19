type Product = {
    id: string
    name: string
    description: string
    price: string
    image: string
  }
  
  const products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Product Description 1',
      price: '$10',
      image: 'product1.jpg',
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Product Description 2',
      price: '$20',
      image: 'product2.jpg',
    },
    // More products...
  ]
  
  const ListedProducts = () => {
    return (
      <section>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Listed Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No products listed yet.</div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                <p className="text-gray-500 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">{product.price} USD</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    )
  }
  
  export default ListedProducts
  