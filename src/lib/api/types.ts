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

export interface InstagramPhoto {
  image: string;
  alt: string;
}

export interface HomePageContent {
  _id: string;
  hero: {
    tag: string;
    headingLine1: string;
    headingLine2: string;
    subtext: string;
    ctaLabel: string;
    locationTag: string;
    image: string;
  };
  resort: {
    label: string;
    heading: string;
    body: string;
    linkLabel: string;
    image: string;
  };
  quote: {
    label: string;
    text: string;
  };
  mapInfo: {
    label: string;
    heading: string;
    body: string;
    gatewayText: string;
    seasonText: string;
    bestForText: string;
    airportText: string;
  };
  packagesSection: {
    label: string;
    heading: string;
  };
  video: {
    label: string;
    heading: string;
    body: string;
    image: string;
    ctaLabel: string;
    ctaHref: string;
  };
  experiencesSection: {
    label: string;
    heading: string;
  };
  newsletter: {
    label: string;
    heading: string;
    body: string;
  };
  instagram: {
    label: string;
    heading: string;
    url: string;
    photos: InstagramPhoto[];
  };
}

export interface ValueCard {
  title: string;
  body: string;
}

export interface FacilityCard {
  heading: string;
  body: string;
}

export interface AboutPageContent {
  _id: string;
  hero: {
    label: string;
    heading: string;
    subtext: string;
    image: string;
  };
  team: {
    label: string;
    heading: string;
    body1: string;
    body2: string;
    image: string;
  };
  philosophy: {
    label: string;
    heading: string;
    values: ValueCard[];
  };
  quote: {
    text: string;
  };
  facilities: {
    label: string;
    heading: string;
    items: FacilityCard[];
    ctaLabel: string;
  };
}

export interface WildlifeCard {
  icon: string;
  name: string;
  desc: string;
}

export interface PracticalInfoCard {
  heading: string;
  body: string;
  extras: string[];
}

export interface BardiaPageContent {
  _id: string;
  hero: {
    label: string;
    heading: string;
    subtext: string;
    image: string;
  };
  landscape: {
    label: string;
    heading: string;
    body1: string;
    body2: string;
    facts: string[];
    image: string;
  };
  wildlife: {
    label: string;
    heading: string;
    animals: WildlifeCard[];
  };
  bestTime: PracticalInfoCard;
  gettingThere: PracticalInfoCard;
  conservation: {
    label: string;
    heading: string;
    body1: string;
    body2: string;
    image: string;
  };
  quote: {
    text: string;
    ctaLabel: string;
  };
}

export interface GettingHereItem {
  icon: string;
  text: string;
}

export interface ContactPageContent {
  _id: string;
  hero: {
    label: string;
    heading: string;
    subtext: string;
    image: string;
  };
  formSection: {
    label: string;
    heading: string;
  };
  details: {
    label: string;
    heading: string;
    addressName: string;
    addressLocation: string;
    phone: string;
    email: string;
    receptionHours: string;
  };
  gettingHere: {
    label: string;
    items: GettingHereItem[];
  };
  sidebar: {
    image: string;
    quoteText: string;
  };
}

export interface ActivitiesPageContent {
  _id: string;
  hero: {
    label: string;
    heading: string;
    subtext: string;
    image: string;
  };
  guideNote: {
    label: string;
    heading: string;
    body: string;
    image: string;
  };
  listCta: {
    label: string;
    heading: string;
    body: string;
    button1Label: string;
    button2Label: string;
  };
  detailCta: {
    label: string;
    heading: string;
    body: string;
    button1Label: string;
    button2Label: string;
  };
}

export interface PackagesPageContent {
  _id: string;
  hero: {
    label: string;
    heading: string;
    subtext: string;
    image: string;
  };
  quote: {
    text: string;
  };
  listCta: {
    label: string;
    heading: string;
    body: string;
    buttonLabel: string;
  };
  detailCta: {
    label: string;
    heading: string;
    body: string;
    button1Label: string;
    button2Label: string;
  };
}

export interface BlogsPageContent {
  _id: string;
  hero: {
    label: string;
    heading: string;
    subtext: string;
    image: string;
  };
  quote: {
    text: string;
  };
  comingSoon: {
    label: string;
    heading: string;
    body: string;
    buttonLabel: string;
  };
  detailCta: {
    label: string;
    heading: string;
    button1Label: string;
    button2Label: string;
  };
}

export interface GuestReviewsPageContent {
  _id: string;
  hero: {
    label: string;
    heading: string;
    subtext: string;
    image: string;
  };
  quote: {
    text: string;
    attribution: string;
  };
  listLabel: {
    label: string;
    heading: string;
  };
  cta: {
    label: string;
    heading: string;
    body: string;
    buttonLabel: string;
  };
}
