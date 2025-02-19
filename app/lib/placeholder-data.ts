const users = [
  {
    username: 'artisan_john',
    password: 'password123',
    email: 'john@example.com',
    full_name: 'John Doe',
    bio: 'Passionate artisan crafting handmade jewelry.',
    profile_picture: 'https://example.com/images/john.jpg',
    is_artisan: true,
  },
  {
    username: 'buyer_jane',
    password: 'securepass456',
    email: 'jane@example.com',
    full_name: 'Jane Smith',
    bio: 'Lover of unique handmade goods.',
    profile_picture: 'https://example.com/images/jane.jpg',
    is_artisan: false,
  },
];

const categories = [
  { id: 1, name: 'Jewelry' },
  { id: 2, name: 'Pottery' },
  { id: 3, name: 'Woodwork' },
];

const products = [
  {
    user_id: 1,
    name: 'Handmade Silver Ring',
    category_id: 1, // Jewelry
    description: 'Beautiful handcrafted silver ring.',
    image_url: 'https://example.com/ring.jpg',
    price: 49.99,
    stock: 10,
  },
  {
    user_id: 2,
    name: 'Ceramic Vase',
    category_id: 2, // Pottery
    description: 'Elegant ceramic vase with intricate patterns.',
    image_url: 'https://example.com/vase.jpg',
    price: 79.99,
    stock: 5,
  },
];

const comments = [
  {
    product_id: 1,
    user_id: 2,
    comment_text: 'This ring looks amazing! Will order soon.',
  },
  {
    product_id: 2,
    user_id: 1,
    comment_text: 'The craftsmanship is incredible. Highly recommend!',
  },
];

export { users, categories, products, comments };
