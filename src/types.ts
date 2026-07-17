export interface Store {
  id: string;
  name: string;
  category: 'Fashion' | 'Tech' | 'Dining' | 'Beauty';
  tagline: string;
  coverImage: string;
  description: string;
  floor: string;
  hours: string;
  phone: string;
  website: string;
  amenities: string[];
  exclusiveItems: {
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
  }[];
  events: {
    id: string;
    title: string;
    date: string;
    time: string;
    description: string;
  }[];
}

export type BookingType = 'personal_shopper' | 'private_fitting' | 'valet_parking' | 'champagne_service' | 'lounge_access';

export interface Booking {
  id: string;
  storeId?: string;
  storeName?: string;
  type: BookingType;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
  notes?: string;
  createdAt: string;
}

export interface LuxeMember {
  name: string;
  email: string;
  phone: string;
  tier: 'Signature' | 'Elite' | 'Prestige' | 'Inner Circle';
  points: number;
  cardId: string;
  memberSince: string;
  valetCode: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  suggestions?: string[];
  bookingOffer?: {
    type: BookingType;
    storeName?: string;
    storeId?: string;
  };
}
