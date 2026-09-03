export interface Highlight {
  title: string;
  body: string;
}

export interface Activity {
  _id: string;
  title: string;
  slug: string;
  tag: string;
  duration: string;
  description: string;
  img: string;
  highlights: Highlight[];
  whatToExpect: string[];
  practicalNotes: string[];
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: string;
  title: string;
  items: string[];
}

export interface Package {
  _id: string;
  name: string;
  slug: string;
  tag: string;
  duration: string;
  description: string;
  img: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  suitableFor: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  img: string;
  readTime: string;
  publishedAt: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GuestReview {
  _id: string;
  name: string;
  origin: string;
  trip: string;
  text: string;
  rating: number;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
