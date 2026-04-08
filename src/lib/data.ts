import { Product } from './types';

export const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Dragon Figurine',
    price: 1499,
    category: 'figurines',
    description: 'A beautifully detailed dragon figurine, 3D printed with high-resolution resin. Perfect for collectors and fantasy enthusiasts. Each scale and wing membrane is carefully crafted for maximum detail.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600',
    ],
    stock: 15,
    featured: true,
    reviews: [
      { id: 'r1', name: 'Arjun S.', rating: 5, comment: 'Incredible detail! Worth every rupee.', date: '2024-02-15' },
      { id: 'r2', name: 'Priya M.', rating: 4, comment: 'Beautiful piece, slightly smaller than expected.', date: '2024-03-01' },
    ],
  },
  {
    id: '2',
    name: 'Minimalist Phone Stand',
    price: 599,
    category: 'utility',
    description: 'Sleek and sturdy phone stand with cable management. Works with all phone sizes. Printed with eco-friendly PLA material in matte finish.',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600',
    ],
    stock: 50,
    featured: true,
    reviews: [
      { id: 'r3', name: 'Rahul K.', rating: 5, comment: 'Perfect desk accessory!', date: '2024-01-20' },
    ],
  },
  {
    id: '3',
    name: 'Geometric Vase',
    price: 899,
    category: 'decor',
    description: 'Modern geometric vase with a unique low-poly design. Available in multiple colors. Makes a stunning centerpiece for any room.',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600',
      'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600',
    ],
    stock: 30,
    featured: true,
    reviews: [
      { id: 'r4', name: 'Sneha R.', rating: 5, comment: 'Love the geometric design!', date: '2024-02-28' },
    ],
  },
  {
    id: '4',
    name: 'Custom Name Keychain',
    price: 299,
    category: 'keychains',
    description: 'Personalized 3D printed keychain with your name or initials. Durable and lightweight. Available in 10+ colors.',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600',
    ],
    stock: 100,
    featured: false,
    reviews: [
      { id: 'r5', name: 'Amit P.', rating: 4, comment: 'Great gift idea!', date: '2024-03-10' },
    ],
  },
  {
    id: '5',
    name: 'Articulated Robot',
    price: 1999,
    category: 'figurines',
    description: 'Fully articulated robot figure with movable joints. A marvel of 3D printing engineering with 20+ moving parts.',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600',
    ],
    stock: 10,
    featured: true,
    reviews: [
      { id: 'r6', name: 'Vikram D.', rating: 5, comment: 'Amazing articulation!', date: '2024-01-05' },
    ],
  },
  {
    id: '6',
    name: 'Desk Organizer Set',
    price: 799,
    category: 'utility',
    description: 'Modular desk organizer with pen holder, card slot, and cable clips. Keeps your workspace tidy and stylish.',
    images: [
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600',
    ],
    stock: 40,
    featured: false,
    reviews: [],
  },
  {
    id: '7',
    name: 'Moon Lamp',
    price: 1299,
    category: 'decor',
    description: 'Realistic moon surface lamp with LED lighting. Creates a magical ambient glow. USB rechargeable with touch dimmer.',
    images: [
      'https://images.unsplash.com/photo-1532186773960-85649e5cb70b?w=600',
      'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600',
    ],
    stock: 20,
    featured: true,
    reviews: [
      { id: 'r7', name: 'Neha G.', rating: 5, comment: 'So beautiful at night!', date: '2024-02-10' },
    ],
  },
  {
    id: '8',
    name: 'Prototype Service',
    price: 4999,
    category: 'custom',
    description: 'Professional prototyping service for your product ideas. Upload your 3D model or share your concept, and we bring it to life.',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600',
    ],
    stock: 999,
    featured: false,
    reviews: [],
  },
];

export const categories = [
  { id: 'figurines', name: 'Figurines', icon: '🐉', description: 'Detailed collectible figures' },
  { id: 'utility', name: 'Utility', icon: '🔧', description: 'Practical everyday items' },
  { id: 'decor', name: 'Home Decor', icon: '🏠', description: 'Beautiful decorative pieces' },
  { id: 'keychains', name: 'Keychains', icon: '🔑', description: 'Personalized keychains' },
  { id: 'custom', name: 'Custom Orders', icon: '✨', description: 'Your ideas, our expertise' },
];

export const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Hobbyist Collector',
    comment: 'The quality of the figurines is outstanding. Every detail is perfect. I keep coming back for more!',
    rating: 5,
  },
  {
    name: 'Ananya Sharma',
    role: 'Interior Designer',
    comment: 'The geometric vases and moon lamps are my go-to recommendations for clients. Unique and beautifully made.',
    rating: 5,
  },
  {
    name: 'Karthik Nair',
    role: 'Startup Founder',
    comment: 'Their prototyping service saved us weeks of development time. Fast, accurate, and affordable.',
    rating: 4,
  },
];

export const GST_RATE = 0.18;
export const COUPON_CODE = 'PRAGYA20';
export const COUPON_DISCOUNT = 0.20;
