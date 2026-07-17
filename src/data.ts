import { Store } from './types';

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&q=90&w=2500';

export const CATEGORIES = [
  {
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
    description: 'Bespoke tailoring and international high-fashion couture.',
  },
  {
    name: 'Tech',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    description: 'State-of-the-art innovation and refined consumer hardware.',
  },
  {
    name: 'Dining',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
    description: 'Michelin-starred gastronomy and exceptional artisan cafes.',
  },
  {
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200',
    description: 'Bespoke fragrances, luxury skincare, and holistic wellness.',
  },
] as const;

export const STORES: Store[] = [
  {
    id: 'apple',
    name: 'Apple Store',
    category: 'Tech',
    tagline: 'Tech & Innovation',
    coverImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=1600',
    description: 'Explore the future of personal technology at our architectural masterwork. From the latest iPhone and iPad to the bespoke Vision Pro custom fitting experience, Apple Store LUXE Mall offers hands-on guidance from our specialized Tech Creatives.',
    floor: 'Floor 2, Wing A',
    hours: '10:00 AM - 10:00 PM',
    phone: '+1 (555) 019-9230',
    website: 'https://www.apple.com',
    amenities: [
      'Personal Tech Styling',
      'Hands-on Workshops',
      'Vision Pro Demo Suite',
      'Express Pickup Station'
    ],
    exclusiveItems: [
      {
        id: 'apple-1',
        name: 'Apple Vision Pro',
        price: '$3,499',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
        description: 'Apple\'s spatial computer that blends digital content with the physical world.'
      },
      {
        id: 'apple-2',
        name: 'iPhone 15 Pro Titanium',
        price: '$1,199',
        image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600',
        description: 'Forged in aerospace-grade titanium, featuring the groundbreaking A17 Pro chip.'
      }
    ],
    events: [
      {
        id: 'apple-ev-1',
        title: 'Spatial Computing Masterclass',
        date: 'July 22, 2026',
        time: '6:00 PM - 7:30 PM',
        description: 'Join Apple Creatives for a bespoke training session on designing and living in spatial interfaces.'
      }
    ]
  },
  {
    id: 'gucci',
    name: 'Gucci',
    category: 'Fashion',
    tagline: 'High Fashion',
    coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600',
    description: 'Gucci redefines 21st-century luxury with an exceptional Italian craftsmanship showcase. Our magnificent boutique features dark velvet partitions, golden accents, and premium, highly limited runway pieces available only to our Inner Circle members.',
    floor: 'Floor 1, Grand Rotunda',
    hours: '10:00 AM - 9:30 PM',
    phone: '+1 (555) 014-4821',
    website: 'https://www.gucci.com',
    amenities: [
      'VIP Fitting Salon',
      'Personal Shopping Consultant',
      'Complimentary Champagne Service',
      'Monogramming Customization'
    ],
    exclusiveItems: [
      {
        id: 'gucci-1',
        name: 'Gucci Ancora Silk Gown',
        price: '$4,800',
        image: 'https://images.unsplash.com/photo-1539008835154-1558040b61c7?auto=format&fit=crop&q=80&w=600',
        description: 'An exquisite black silk runway masterpiece with custom draping.'
      },
      {
        id: 'gucci-2',
        name: 'Horsebit 1955 Fine Leather Shoulder Bag',
        price: '$3,250',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
        description: 'Timeless luxury structured shoulder bag in prestige calfskin leather.'
      }
    ],
    events: [
      {
        id: 'gucci-ev-1',
        title: 'Fall Couture Trunk Show',
        date: 'July 25, 2026',
        time: '7:00 PM - 10:00 PM',
        description: 'An exclusive presentation of the Fall Collection with our head European stylist. Member RSVP required.'
      }
    ]
  },
  {
    id: 'tesla',
    name: 'Tesla',
    category: 'Tech',
    tagline: 'Electric Future',
    coverImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600',
    description: 'Experience the transition to sustainable energy. Explore Model S, Model X, Cybertruck, and design your dream Tesla in our minimalist gallery. Speak with specialists to customize your charging network setup and arrange private test drives.',
    floor: 'Floor 1, South Esplanade',
    hours: '10:00 AM - 9:00 PM',
    phone: '+1 (555) 012-7491',
    website: 'https://www.tesla.com',
    amenities: [
      'Interactive Design Studio',
      'VIP Demo Test Drives',
      'Supercharger Lounge Access',
      'Fleet Customization Consulting'
    ],
    exclusiveItems: [
      {
        id: 'tesla-1',
        name: 'Tesla Model S Plaid',
        price: '$89,990',
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600',
        description: 'Triple motor AWD setup delivering 1,020 horsepower and 0-60 mph in 1.99s.'
      },
      {
        id: 'tesla-2',
        name: 'Cybertruck Cyberbeast',
        price: '$99,990',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600',
        description: 'Extremely durable stainless steel exoskeleton with brutalist futuristic aesthetic.'
      }
    ],
    events: [
      {
        id: 'tesla-ev-1',
        title: 'Cybertruck Off-Road Showcase',
        date: 'July 28, 2026',
        time: '2:00 PM - 5:00 PM',
        description: 'See the engineering behind the exoskeleton and watch real-time off-road capability presentations.'
      }
    ]
  },
  {
    id: 'chanel',
    name: 'Chanel Fragrance & Beauty',
    category: 'Beauty',
    tagline: 'Luxury Fragrance & Wellness',
    coverImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1600',
    description: 'Immerse yourself in the world of Chanel fragrance, prestige skincare, and high-end makeup. Our elegant boutique offers private consultation suites for custom scent profiling and holistic luxury facial treatments.',
    floor: 'Floor 1, West Promenade',
    hours: '10:00 AM - 9:30 PM',
    phone: '+1 (555) 018-3829',
    website: 'https://www.chanel.com',
    amenities: [
      'Fragrance Profiling Salon',
      'VIP Makeup Consultation',
      'Luxury Facial Suite',
      'Complimentary Skin Consultation'
    ],
    exclusiveItems: [
      {
        id: 'chanel-1',
        name: 'Les Exclusifs de Chanel - Sycomore',
        price: '$450',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
        description: 'A prestige woody fragrance with accents of vetiver, smoke, and cedar.'
      },
      {
        id: 'chanel-2',
        name: 'Sublimage L\'Extrait de Crème',
        price: '$700',
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600',
        description: 'The ultimate luxury skin regeneration cream infused with active planifolia fractions.'
      }
    ],
    events: [
      {
        id: 'chanel-ev-1',
        title: 'Masterclass: The Art of Scent',
        date: 'July 24, 2026',
        time: '5:00 PM - 6:30 PM',
        description: 'An interactive exploration of Chanel\'s legendary fragrance history led by a Parisian scent ambassador.'
      }
    ]
  },
  {
    id: 'le-luxe-bistro',
    name: 'Le Luxe Bistro & Pâtisserie',
    category: 'Dining',
    tagline: 'Michelin-starred Gastronomy',
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1600',
    description: 'A delicate dining sanctuary presenting contemporary French gastronomy. Under the guidance of our Michelin-starred chef, Le Luxe Bistro combines rare ingredients with magnificent presentation to create a memorable culinary interlude.',
    floor: 'Floor 3, Skylight Conservatory',
    hours: '11:00 AM - 10:30 PM',
    phone: '+1 (555) 015-2831',
    website: 'https://leluxe.menu',
    amenities: [
      'Chef\'s Private Table',
      'Panoramic Skylight View',
      'Sommelier Fine Wine Pairing',
      'Artisanal Pâtisserie To-Go'
    ],
    exclusiveItems: [
      {
        id: 'dining-1',
        name: 'The Golden Pear Pâtisserie',
        price: '$35',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
        description: 'A spectacular edible art piece infused with vanilla mousse, caramelised pear core, and gold leaf coating.'
      },
      {
        id: 'dining-2',
        name: 'Vintage Champagne Caviar Tasting',
        price: '$240',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
        description: 'A flight of three vintage champagnes paired with elite sustainable Ossetra caviar.'
      }
    ],
    events: [
      {
        id: 'dining-ev-1',
        title: 'Midsummer Chef\'s Dinner',
        date: 'July 30, 2026',
        time: '8:00 PM - 11:00 PM',
        description: 'An exclusive 7-course tasting menu with elite sake and grand cru Burgundy pairings. Limited to 12 seats.'
      }
    ]
  }
];
