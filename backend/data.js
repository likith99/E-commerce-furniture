import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Asitha Karnatakam',
      email: 'asithakarnatakam@gmail.com',
      password: bcrypt.hashSync('777777'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Rapri Clip Led Light',
      slug: 'rapri-clip-led-light',
      category: 'Speciaity Lightening',
      image: '/images/p5.webp', // 679px × 829px
      price: 439,
      countInStock: 10,
      brand: 'Zentec',
      rating: 4.5,
      numReviews: 10,
      description: 'Wonderful Decoration Add Something Special To Your Bedroom, Room, College Dorm, Wedding, Party. Easy to Use Just hang it on the wall. No mounting tools needed, suitable for art works or crafts, prints, cards etc.',
    },
    {
      name: 'window curtain lights',
      slug: 'window-curtain-lights',
      category: 'Speciaity Lightening',
      image: '/images/p6.webp',
      price: 489,
      countInStock: 10,
      brand: 'Zentec',
      rating: 4.0,
      numReviews: 10,
      description: '',
    },
    {
      name: 'Bonsai Tree Light',
      slug: 'bonsai-tree-light',
      category: 'Speciaity Lightening',
      image: '/images/p7.webp',
      price: 899,
      countInStock: 10,
      brand: 'Zentec',
      rating: 4.5,
      numReviews: 14,
      description: 'Touch Switch DIY Artificial Light Tree Lamp Decoration Festival Holiday Battery/USB Operated (Leaf Node Lamp)',
    },
    {
      name: 'Crystal Bubble Ball',
      slug: 'crystal-bubble-ball',
      category: 'Speciaity Lightening',
      image: '/images/p8.webp',
      price: 349,
      countInStock: 10,
      brand: 'Zebtec',
      rating: 4.5,
      numReviews: 10,
      description: 'Fairy Lights for Decortaion Diwali Christmas Xmas Light for Diwali Home Decorations Lighting (Warm White, 4 Meter)',
    },
  ],
};
export default data;
