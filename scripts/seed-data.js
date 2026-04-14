const image = (src) => src;
const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

module.exports = [
  {
    slug: slugify('Royal Maroon Zari Lehenga'),
    title: 'Royal Maroon Zari Lehenga',
    description:
      'A handcrafted lehenga with rich zari embroidery, structured flare, and an elegant blouse silhouette designed for premium festive occasions.',
    category: 'lehenga-choli',
    fabric: 'Silk Blend',
    color: 'Maroon',
    price: 12999,
    mrp: 42999,
    discount: 70,
    rating: 4.8,
    reviewsCount: 126,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      { url: image('https://images.pexels.com/photos/33088091/pexels-photo-33088091.jpeg?cs=srgb&dl=pexels-fliqaindia-33088091.jpg&fm=jpg'), alt: 'Maroon lehenga front' },
      { url: image('https://images.pexels.com/photos/20043126/pexels-photo-20043126.jpeg?cs=srgb&dl=pexels-fliqaindia-20043126.jpg&fm=jpg'), alt: 'Maroon lehenga detail' },
      { url: image('https://images.pexels.com/photos/20043153/pexels-photo-20043153.jpeg?cs=srgb&dl=pexels-fliqaindia-20043153.jpg&fm=jpg'), alt: 'Maroon lehenga back' }
    ],
    isFeatured: true,
    isHotSelling: true,
    tags: ['wedding', 'festive', 'zari'],
    stock: 18
  },
  {
    slug: slugify('Gold Sequin Designer Lehenga'),
    title: 'Gold Sequin Designer Lehenga',
    description:
      'Statement sequence work with a luminous gold palette and premium finishing for sangeet and receptions.',
    category: 'sequence-lehenga',
    fabric: 'Net',
    color: 'Gold',
    price: 9999,
    mrp: 34999,
    discount: 71,
    rating: 4.7,
    reviewsCount: 93,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      { url: image('https://images.pexels.com/photos/20043126/pexels-photo-20043126.jpeg?cs=srgb&dl=pexels-fliqaindia-20043126.jpg&fm=jpg'), alt: 'Gold sequin lehenga' },
      { url: image('https://images.pexels.com/photos/20043153/pexels-photo-20043153.jpeg?cs=srgb&dl=pexels-fliqaindia-20043153.jpg&fm=jpg'), alt: 'Gold sequin detail' }
    ],
    isFeatured: true,
    tags: ['party wear', 'sequin'],
    stock: 12
  },
  {
    slug: slugify('Ivory Banarasi Saree'),
    title: 'Ivory Banarasi Saree',
    description:
      'A luxurious Banarasi saree with subtle gold weaving, soft drape, and timeless heritage charm.',
    category: 'saree',
    fabric: 'Banarasi Silk',
    color: 'Ivory',
    price: 8499,
    mrp: 27999,
    discount: 70,
    rating: 4.9,
    reviewsCount: 211,
    sizes: ['Free Size'],
    images: [
      { url: image('https://images.pexels.com/photos/28428044/pexels-photo-28428044.jpeg?cs=srgb&dl=pexels-dream_-makkerzz-1603229-28428044.jpg&fm=jpg'), alt: 'Ivory saree' },
      { url: image('https://images.pexels.com/photos/27255671/pexels-photo-27255671.jpeg?cs=srgb&dl=pexels-fotovegraf-312591823-27255671.jpg&fm=jpg'), alt: 'Saree close-up' }
    ],
    isHotSelling: true,
    tags: ['banarasi', 'heritage'],
    stock: 26
  },
  {
    slug: slugify('Rose Gold Anarkali Set'),
    title: 'Rose Gold Anarkali Set',
    description:
      'A premium designer ethnic set with flowing silhouette, delicate embroidery, and soft festive shine.',
    category: 'designer-ethnic',
    fabric: 'Georgette',
    color: 'Rose Gold',
    price: 10999,
    mrp: 38999,
    discount: 72,
    rating: 4.6,
    reviewsCount: 84,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [{ url: image('https://images.pexels.com/photos/28428044/pexels-photo-28428044.jpeg?cs=srgb&dl=pexels-dream_-makkerzz-1603229-28428044.jpg&fm=jpg'), alt: 'Anarkali dress' }],
    tags: ['anarkali', 'designer'],
    stock: 20
  },
  {
    slug: slugify('Emerald Mirror Work Lehenga'),
    title: 'Emerald Mirror Work Lehenga',
    description:
      'Mirror accents with jewel-toned green palette make this lehenga a standout for evening celebrations.',
    category: 'lehenga-choli',
    fabric: 'Georgette',
    color: 'Emerald',
    price: 14999,
    mrp: 48999,
    discount: 69,
    rating: 4.9,
    reviewsCount: 147,
    sizes: ['S', 'M', 'L'],
    images: [{ url: image('https://images.pexels.com/photos/33088091/pexels-photo-33088091.jpeg?cs=srgb&dl=pexels-fliqaindia-33088091.jpg&fm=jpg'), alt: 'Emerald lehenga' }],
    isFeatured: true,
    stock: 9
  },
  {
    slug: slugify('Dusty Pink Organza Saree'),
    title: 'Dusty Pink Organza Saree',
    description:
      'A lightweight organza saree with modern embroidery accents and a soft romantic finish.',
    category: 'saree',
    fabric: 'Organza',
    color: 'Pink',
    price: 6999,
    mrp: 22999,
    discount: 70,
    rating: 4.5,
    reviewsCount: 69,
    sizes: ['Free Size'],
    images: [{ url: image('https://images.pexels.com/photos/28428044/pexels-photo-28428044.jpeg?cs=srgb&dl=pexels-dream_-makkerzz-1603229-28428044.jpg&fm=jpg'), alt: 'Pink saree' }],
    stock: 31
  },
  {
    slug: slugify('Midnight Blue Designer Set'),
    title: 'Midnight Blue Designer Set',
    description:
      'Sophisticated designer ethnic wear with tailored lines, luxe embroidery, and a contemporary silhouette.',
    category: 'designer-ethnic',
    fabric: 'Silk Blend',
    color: 'Blue',
    price: 11999,
    mrp: 39999,
    discount: 70,
    rating: 4.6,
    reviewsCount: 52,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [{ url: image('https://images.pexels.com/photos/20043126/pexels-photo-20043126.jpeg?cs=srgb&dl=pexels-fliqaindia-20043126.jpg&fm=jpg'), alt: 'Blue designer set' }],
    stock: 14
  },
  {
    slug: slugify('Ivory Sequence Bridal Lehenga'),
    title: 'Ivory Sequence Bridal Lehenga',
    description:
      'A bridal-ready lehenga with luminous sequin work, premium volume, and an unmistakably luxe finish.',
    category: 'sequence-lehenga',
    fabric: 'Net',
    color: 'Ivory',
    price: 17999,
    mrp: 59999,
    discount: 70,
    rating: 5,
    reviewsCount: 203,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [{ url: image('https://images.pexels.com/photos/20043153/pexels-photo-20043153.jpeg?cs=srgb&dl=pexels-fliqaindia-20043153.jpg&fm=jpg'), alt: 'Bridal lehenga' }],
    isFeatured: true,
    isHotSelling: true,
    stock: 6
  }
];
