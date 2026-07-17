import { Store } from './types';

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU-qv8fVBVqM80426yQUoYAVqgoMZpdN-_gwdfCI-cYgsCJY-PpzMWtStStkfpWnVJqFwpyERU4w1d9pClNCs9OnF-gfhMH5rLWIFGdXDPgROyAq1XGQXWyMb2s5MTEnUlpCtJcB2tiACIzUOf3TxGLBVHJrwSby1PYBimRdFKQJaOBknudh6byBT9kWmcLRylMpRFefc3HtgewQmH2jxJHmPIG2eGu2xIYoKTqE7T6KCaDQhQ1wsG6Q';

export const CATEGORIES = [
  {
    name: 'Fashion',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWOEcUx75hEd2AxGwo3TlUm0pvs4-hU5jUU1rc-07f7UZA-UrNdnJ1XudzrS0-_wYhOGIvcU3PKnL_LVZvxksHta4sioOSGQkZbSY38Pdo3oViSbLycn2b4pxNUkWCawcBhetl_8hy2-sLoy-JIT5_Fx_uK0gTqAvkj7V4Vh2KFKbQyFkF0gWg8r6ZcwWIR52XFu0MGTnuZ1kpCikRCNOktF0wkjyBh4EKzFZ8NUOQTmYQYGVUiiIZXA',
    description: 'Bespoke tailoring and international high-fashion couture.',
  },
  {
    name: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZuL8Jc56OKEGMODPEgZIj6FEdZaKJj5bAk5MS7n-TotRD3gG7nVUHHJq3cXWNcvrmsZjBsyTEjt7K9Ob-aXkkZK2gduJxQbA7FPMdYEn8YTiDmAsvP2iw3dvLaroYJOJNWPygQTPjvAR9OkS4viXdSvPBMszqSDXgcmhJ2TzcBamVHu0SJxrc-IgGgSrkjgoCn6hLxWLKI7rEbR4I3tGaviuArK-3WQS7t1IxzcLC6DG6swnfouGkDA',
    description: 'State-of-the-art innovation and refined consumer hardware.',
  },
  {
    name: 'Dining',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqMob5r31joOiUPpFRlOaRl0FZzXT5w_Bylg0iE4ig43YujmsZKiw25iajILAIesjILYS1QrjDFgbrBbpx3wAJ0fYG4ygj30UA852YgWAXsM3O1TmgXv_sdUMsc6W5C-dpw8-9gcPTAIgrJyVpkl8F1cN2fv9OztTyl4gbQmE01e4z_GXC-FGrpm8uAj_MLNRyBf7572_ihYXI5MCZauDD3DyCAHY7LCrlW31xz8NciG0ez52jYJhWGA',
    description: 'Michelin-starred gastronomy and exceptional artisan cafes.',
  },
  {
    name: 'Beauty',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClDv5ePKpe9FIGYnUCYeIhv-OkNgkjS89bJVaeQaP1w0pXOxgtx1MyH4TCXV5qtxO-_9c0OryvtasN1dxcTQEw5DbK3oOYPWYFaTh3JEXIlU7eqUYSkag0pTx16LYbhEf-yYoZFV1Hfygy7s_1B8Q_n6I6FCEqHsK9ig9F12WUUXQ0LZPOhOI2NUOSb5OMJ-Abk-uWESwm77r5A70KxpTX3WE7-YGj8muepBkLhJNGk6M0P1-gkzLxXA',
    description: 'Bespoke fragrances, luxury skincare, and holistic wellness.',
  },
] as const;

export const STORES: Store[] = [
  {
    id: 'apple',
    name: 'Apple Store',
    category: 'Tech',
    tagline: 'Tech & Innovation',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYy9xFaX1_RLmSnLnzAFq38KuTazM_peHTx6jlj5xuJ9kpkuKtffLcT2WBCfsasAMntkIps1zhgbflBDQWcUCLiUje103d9G8eBeTifmf2Bnp-dy5CwOzxwuBUbDC4Pg-itoC3QzOK4nO6J-1-Y5pNYGxHd6lHGuODUNmvmPKeL2kzohGULhIyO5LEAczIOsFPjTaevhviliqDEcoe1P07Ri_b0VSBM4Z3ZwM_C_h0jBk12aHKnKhU0w',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZuL8Jc56OKEGMODPEgZIj6FEdZaKJj5bAk5MS7n-TotRD3gG7nVUHHJq3cXWNcvrmsZjBsyTEjt7K9Ob-aXkkZK2gduJxQbA7FPMdYEn8YTiDmAsvP2iw3dvLaroYJOJNWPygQTPjvAR9OkS4viXdSvPBMszqSDXgcmhJ2TzcBamVHu0SJxrc-IgGgSrkjgoCn6hLxWLKI7rEbR4I3tGaviuArK-3WQS7t1IxzcLC6DG6swnfouGkDA',
        description: 'Apple\'s spatial computer that blends digital content with the physical world.'
      },
      {
        id: 'apple-2',
        name: 'iPhone 15 Pro Titanium',
        price: '$1,199',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZuL8Jc56OKEGMODPEgZIj6FEdZaKJj5bAk5MS7n-TotRD3gG7nVUHHJq3cXWNcvrmsZjBsyTEjt7K9Ob-aXkkZK2gduJxQbA7FPMdYEn8YTiDmAsvP2iw3dvLaroYJOJNWPygQTPjvAR9OkS4viXdSvPBMszqSDXgcmhJ2TzcBamVHu0SJxrc-IgGgSrkjgoCn6hLxWLKI7rEbR4I3tGaviuArK-3WQS7t1IxzcLC6DG6swnfouGkDA',
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
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJqfefJj3nomWBhkBWb-BB5rcuw_EvrqsHomB51ERdy-W_90XaIyP815LEUl1a5XQtX7Qj01MMfzVHg42FgPZwoa6yd7irJW4OZuyVKrjVUemSo5GoDSNAH0UcgcGhRV2mbnerPV_MJ10d5CBdKFqt6Da73maH7V-K2g9x3WY0BdAQumbokWXXVVr7T3SMHeCMzl370IeBQ-WwPWdEp-Q8EFNsYnhJpDET2EUzj9ElLf2X87NVqeVjg',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWOEcUx75hEd2AxGwo3TlUm0pvs4-hU5jUU1rc-07f7UZA-UrNdnJ1XudzrS0-_wYhOGIvcU3PKnL_LVZvxksHta4sioOSGQkZbSY38Pdo3oViSbLycn2b4pxNUkWCawcBhetl_8hy2-sLoy-JIT5_Fx_uK0gTqAvkj7V4Vh2KFKbQyFkF0gWg8r6ZcwWIR52XFu0MGTnuZ1kpCikRCNOktF0wkjyBh4EKzFZ8NUOQTmYQYGVUiiIZXA',
        description: 'An exquisite black silk runway masterpiece with custom draping.'
      },
      {
        id: 'gucci-2',
        name: 'Horsebit 1955 Fine Leather Shoulder Bag',
        price: '$3,250',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWOEcUx75hEd2AxGwo3TlUm0pvs4-hU5jUU1rc-07f7UZA-UrNdnJ1XudzrS0-_wYhOGIvcU3PKnL_LVZvxksHta4sioOSGQkZbSY38Pdo3oViSbLycn2b4pxNUkWCawcBhetl_8hy2-sLoy-JIT5_Fx_uK0gTqAvkj7V4Vh2KFKbQyFkF0gWg8r6ZcwWIR52XFu0MGTnuZ1kpCikRCNOktF0wkjyBh4EKzFZ8NUOQTmYQYGVUiiIZXA',
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
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy3lbQzwg8CLAGJ2vA9px_0yIxXPAjYQMq4P_wt6v2JqYlGAzrAt3P1rTKoK6q_h34QQ1uCyEbje5AFigz7BhEH4_1qCco-xeua97m6oafG0wheqBpFU-cLYuYZp_7OyxYP_0tkgnPSRkpczVhdm9Sd_FSj25bTQ5zD7FaFkPKE0dxZGh9-zqmoP1n74wP9TOVmkzU4eyh_A-6xlUY-2aMXs725rlHDxiqOMV6nWjLWK7Zr5P8GmgjHA',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy3lbQzwg8CLAGJ2vA9px_0yIxXPAjYQMq4P_wt6v2JqYlGAzrAt3P1rTKoK6q_h34QQ1uCyEbje5AFigz7BhEH4_1qCco-xeua97m6oafG0wheqBpFU-cLYuYZp_7OyxYP_0tkgnPSRkpczVhdm9Sd_FSj25bTQ5zD7FaFkPKE0dxZGh9-zqmoP1n74wP9TOVmkzU4eyh_A-6xlUY-2aMXs725rlHDxiqOMV6nWjLWK7Zr5P8GmgjHA',
        description: 'Triple motor AWD setup delivering 1,020 horsepower and 0-60 mph in 1.99s.'
      },
      {
        id: 'tesla-2',
        name: 'Cybertruck Cyberbeast',
        price: '$99,990',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy3lbQzwg8CLAGJ2vA9px_0yIxXPAjYQMq4P_wt6v2JqYlGAzrAt3P1rTKoK6q_h34QQ1uCyEbje5AFigz7BhEH4_1qCco-xeua97m6oafG0wheqBpFU-cLYuYZp_7OyxYP_0tkgnPSRkpczVhdm9Sd_FSj25bTQ5zD7FaFkPKE0dxZGh9-zqmoP1n74wP9TOVmkzU4eyh_A-6xlUY-2aMXs725rlHDxiqOMV6nWjLWK7Zr5P8GmgjHA',
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
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClDv5ePKpe9FIGYnUCYeIhv-OkNgkjS89bJVaeQaP1w0pXOxgtx1MyH4TCXV5qtxO-_9c0OryvtasN1dxcTQEw5DbK3oOYPWYFaTh3JEXIlU7eqUYSkag0pTx16LYbhEf-yYoZFV1Hfygy7s_1B8Q_n6I6FCEqHsK9ig9F12WUUXQ0LZPOhOI2NUOSb5OMJ-Abk-uWESwm77r5A70KxpTX3WE7-YGj8muepBkLhJNGk6M0P1-gkzLxXA',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClDv5ePKpe9FIGYnUCYeIhv-OkNgkjS89bJVaeQaP1w0pXOxgtx1MyH4TCXV5qtxO-_9c0OryvtasN1dxcTQEw5DbK3oOYPWYFaTh3JEXIlU7eqUYSkag0pTx16LYbhEf-yYoZFV1Hfygy7s_1B8Q_n6I6FCEqHsK9ig9F12WUUXQ0LZPOhOI2NUOSb5OMJ-Abk-uWESwm77r5A70KxpTX3WE7-YGj8muepBkLhJNGk6M0P1-gkzLxXA',
        description: 'A prestige woody fragrance with accents of vetiver, smoke, and cedar.'
      },
      {
        id: 'chanel-2',
        name: 'Sublimage L\'Extrait de Crème',
        price: '$700',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClDv5ePKpe9FIGYnUCYeIhv-OkNgkjS89bJVaeQaP1w0pXOxgtx1MyH4TCXV5qtxO-_9c0OryvtasN1dxcTQEw5DbK3oOYPWYFaTh3JEXIlU7eqUYSkag0pTx16LYbhEf-yYoZFV1Hfygy7s_1B8Q_n6I6FCEqHsK9ig9F12WUUXQ0LZPOhOI2NUOSb5OMJ-Abk-uWESwm77r5A70KxpTX3WE7-YGj8muepBkLhJNGk6M0P1-gkzLxXA',
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
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqMob5r31joOiUPpFRlOaRl0FZzXT5w_Bylg0iE4ig43YujmsZKiw25iajILAIesjILYS1QrjDFgbrBbpx3wAJ0fYG4ygj30UA852YgWAXsM3O1TmgXv_sdUMsc6W5C-dpw8-9gcPTAIgrJyVpkl8F1cN2fv9OztTyl4gbQmE01e4z_GXC-FGrpm8uAj_MLNRyBf7572_ihYXI5MCZauDD3DyCAHY7LCrlW31xz8NciG0ez52jYJhWGA',
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
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqMob5r31joOiUPpFRlOaRl0FZzXT5w_Bylg0iE4ig43YujmsZKiw25iajILAIesjILYS1QrjDFgbrBbpx3wAJ0fYG4ygj30UA852YgWAXsM3O1TmgXv_sdUMsc6W5C-dpw8-9gcPTAIgrJyVpkl8F1cN2fv9OztTyl4gbQmE01e4z_GXC-FGrpm8uAj_MLNRyBf7572_ihYXI5MCZauDD3DyCAHY7LCrlW31xz8NciG0ez52jYJhWGA',
        description: 'A spectacular edible art piece infused with vanilla mousse, caramelised pear core, and gold leaf coating.'
      },
      {
        id: 'dining-2',
        name: 'Vintage Champagne Caviar Tasting',
        price: '$240',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqMob5r31joOiUPpFRlOaRl0FZzXT5w_Bylg0iE4ig43YujmsZKiw25iajILAIesjILYS1QrjDFgbrBbpx3wAJ0fYG4ygj30UA852YgWAXsM3O1TmgXv_sdUMsc6W5C-dpw8-9gcPTAIgrJyVpkl8F1cN2fv9OztTyl4gbQmE01e4z_GXC-FGrpm8uAj_MLNRyBf7572_ihYXI5MCZauDD3DyCAHY7LCrlW31xz8NciG0ez52jYJhWGA',
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
