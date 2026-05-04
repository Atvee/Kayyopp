export type SmartScore = {
  profile: number
  reviews: number
  activity: number
  certifications: number
  total: number
}

export type Artisan = {
  id: string
  slug: string
  name: string
  craft: string
  cluster: string
  district: string
  area: string
  coordinates: {
    lat: number
    lng: number
    x: number
    y: number
  }
  bio: string
  story: string
  languages: string[]
  yearsOfPractice: number
  rating: number
  reviewCount: number
  smartScore: SmartScore
  verified: boolean
  verificationLevel: "Smart Score" | "Blockchain Ready" | "Blockchain Verified"
  certificates: string[]
  awards: string[]
  availability: {
    days: string[]
    hours: string
    nextSlot: string
    presentToday: boolean
  }
  contact: {
    phone: string
    whatsapp: string
  }
  image: string
  portfolio: string[]
  productIds: string[]
  reviews: {
    name: string
    rating: number
    comment: string
    date: string
  }[]
}

export type Product = {
  id: string
  artisanId: string
  title: string
  description: string
  price: number
  category: string
  image: string
  images: string[]
  tags: string[]
  stock: number
  leadTime: string
  customOrder: boolean
  verifiedMaterial: boolean
}

export type BookingSlot = {
  id: string
  artisanId: string
  label: string
  seats: number
}

export const craftCategories = [
  "Wood carving",
  "Kasavu weaving",
  "Bell metal",
  "Mural painting",
  "Coir craft",
  "Bamboo craft",
]

export const pilotLocations = ["Kovalam", "Fort Kochi", "Aranmula", "Thrissur", "Alappuzha", "Wayanad"]

const imageAssets = {
  heroWorkshop: "/images/hero-workshop.svg",
  woodCarving: "/images/wood-carving.svg",
  teakElephant: "/images/teak-elephant.svg",
  templePanel: "/images/temple-panel.svg",
  kasavuLoom: "/images/kasavu-loom.svg",
  kasavuSaree: "/images/kasavu-saree.svg",
  kasavuShawl: "/images/kasavu-shawl.svg",
  bellMetal: "/images/bell-metal.svg",
  brassLamp: "/images/brass-lamp.svg",
  muralAtelier: "/images/mural-atelier.svg",
  muralPanel: "/images/mural-panel.svg",
  muralWorkshop: "/images/mural-workshop.svg",
  coirCraft: "/images/coir-craft.svg",
}

export const artisans: Artisan[] = [
  {
    id: "art-narayanan",
    slug: "narayanan-wood-studio",
    name: "K. Narayanan",
    craft: "Wood carving",
    cluster: "Arts and Crafts Village",
    district: "Thiruvananthapuram",
    area: "Kovalam",
    coordinates: { lat: 8.3862, lng: 76.9784, x: 42, y: 68 },
    bio: "Master woodcarver specialising in Nilambur teak figurines, temple panels, and custom souvenirs for visitors to Kovalam.",
    story:
      "Narayanan learned carving from his father and now runs a compact stall at the Kovalam Arts and Crafts Village. His workshop is known for patient demonstrations, small travel-friendly pieces, and detailed custom commissions.",
    languages: ["Malayalam", "Tamil", "English"],
    yearsOfPractice: 32,
    rating: 4.9,
    reviewCount: 126,
    smartScore: { profile: 24, reviews: 29, activity: 18, certifications: 22, total: 93 },
    verified: true,
    verificationLevel: "Blockchain Verified",
    certificates: ["Kerala Crafts stall registry", "Government craft ID"],
    awards: ["District craft excellence citation"],
    availability: {
      days: ["Mon", "Tue", "Thu", "Fri", "Sat"],
      hours: "10:00 AM - 5:30 PM",
      nextSlot: "Tomorrow, 10:30 AM",
      presentToday: true,
    },
    contact: { phone: "+91 98765 43011", whatsapp: "+91 98765 43011" },
    image: imageAssets.woodCarving,
    portfolio: [imageAssets.teakElephant, imageAssets.templePanel, imageAssets.heroWorkshop],
    productIds: ["prod-teak-elephant", "prod-temple-panel"],
    reviews: [
      {
        name: "Maya R.",
        rating: 5,
        comment: "The workshop visit made the souvenir meaningful. He explained the carving process clearly.",
        date: "2026-04-18",
      },
      {
        name: "Jonas K.",
        rating: 5,
        comment: "Easy booking, fair price, and the QR verification helped us trust the purchase.",
        date: "2026-04-02",
      },
    ],
  },
  {
    id: "art-saraswathy",
    slug: "saraswathy-kasavu-loom",
    name: "P. Saraswathy",
    craft: "Kasavu weaving",
    cluster: "Balaramapuram Loom Collective",
    district: "Thiruvananthapuram",
    area: "Kovalam",
    coordinates: { lat: 8.428, lng: 77.014, x: 48, y: 64 },
    bio: "Second-generation weaver creating handloom Kasavu sarees, shawls, and made-to-measure borders.",
    story:
      "Saraswathy uses KAYYOPP to show the loom process before tourists arrive. Her profile turns a product listing into a visitable craft story.",
    languages: ["Malayalam", "English"],
    yearsOfPractice: 24,
    rating: 4.8,
    reviewCount: 98,
    smartScore: { profile: 23, reviews: 27, activity: 19, certifications: 20, total: 89 },
    verified: true,
    verificationLevel: "Blockchain Ready",
    certificates: ["Handloom artisan card", "Women cooperative member"],
    awards: ["State handloom fair participant"],
    availability: {
      days: ["Wed", "Thu", "Fri", "Sat", "Sun"],
      hours: "11:00 AM - 6:00 PM",
      nextSlot: "Friday, 2:00 PM",
      presentToday: false,
    },
    contact: { phone: "+91 98765 43022", whatsapp: "+91 98765 43022" },
    image: imageAssets.kasavuLoom,
    portfolio: [imageAssets.kasavuLoom, imageAssets.kasavuSaree, imageAssets.kasavuShawl],
    productIds: ["prod-kasavu-saree", "prod-gold-border-shawl"],
    reviews: [
      {
        name: "Aparna S.",
        rating: 5,
        comment: "The availability calendar helped us plan the visit around her weaving demo.",
        date: "2026-03-29",
      },
    ],
  },
  {
    id: "art-devan",
    slug: "devan-aranmula-metal",
    name: "M. Devan",
    craft: "Bell metal",
    cluster: "Aranmula Heritage Guild",
    district: "Pathanamthitta",
    area: "Aranmula",
    coordinates: { lat: 9.3285, lng: 76.6846, x: 58, y: 52 },
    bio: "Heritage metal artisan producing Aranmula mirror-inspired decor and ritual objects with verified material provenance.",
    story:
      "Devan accepts limited commissions and uses the verification score to separate authentic handmade work from tourist-market imitations.",
    languages: ["Malayalam", "Hindi", "English"],
    yearsOfPractice: 29,
    rating: 4.9,
    reviewCount: 164,
    smartScore: { profile: 25, reviews: 30, activity: 18, certifications: 24, total: 97 },
    verified: true,
    verificationLevel: "Blockchain Verified",
    certificates: ["GI-linked craft cluster reference", "Kerala Crafts certification"],
    awards: ["National handicraft showcase exhibitor"],
    availability: {
      days: ["Tue", "Wed", "Fri", "Sat"],
      hours: "9:30 AM - 4:30 PM",
      nextSlot: "Saturday, 9:30 AM",
      presentToday: true,
    },
    contact: { phone: "+91 98765 43033", whatsapp: "+91 98765 43033" },
    image: imageAssets.bellMetal,
    portfolio: [imageAssets.bellMetal, imageAssets.brassLamp, imageAssets.heroWorkshop],
    productIds: ["prod-aranmula-mirror", "prod-brass-lamp"],
    reviews: [
      {
        name: "Hannah W.",
        rating: 5,
        comment: "The QR credential page answered every authenticity question before we ordered.",
        date: "2026-04-21",
      },
    ],
  },
  {
    id: "art-fathima",
    slug: "fathima-mural-atelier",
    name: "Fathima Nizar",
    craft: "Mural painting",
    cluster: "Fort Kochi Artist Street",
    district: "Ernakulam",
    area: "Fort Kochi",
    coordinates: { lat: 9.965, lng: 76.242, x: 36, y: 42 },
    bio: "Contemporary mural artist translating Kerala temple palettes into portable panels, workshops, and custom commissions.",
    story:
      "Fathima joined after the Biennale field study showed how valuable artist visibility is. Her page supports booking, reviews, and custom briefs.",
    languages: ["Malayalam", "English", "Arabic"],
    yearsOfPractice: 12,
    rating: 4.7,
    reviewCount: 72,
    smartScore: { profile: 22, reviews: 25, activity: 19, certifications: 16, total: 82 },
    verified: false,
    verificationLevel: "Smart Score",
    certificates: ["Fine arts diploma"],
    awards: ["Kochi community mural commission"],
    availability: {
      days: ["Mon", "Wed", "Sat", "Sun"],
      hours: "12:00 PM - 7:00 PM",
      nextSlot: "Sunday, 4:00 PM",
      presentToday: true,
    },
    contact: { phone: "+91 98765 43044", whatsapp: "+91 98765 43044" },
    image: imageAssets.muralAtelier,
    portfolio: [imageAssets.muralAtelier, imageAssets.muralPanel, imageAssets.muralWorkshop],
    productIds: ["prod-mural-panel", "prod-mural-workshop"],
    reviews: [
      {
        name: "Riya M.",
        rating: 5,
        comment: "The chatbot found her when I searched for a painting workshop near Fort Kochi.",
        date: "2026-04-11",
      },
    ],
  },
  {
    id: "art-latha",
    slug: "latha-coir-living",
    name: "Latha Pradeep",
    craft: "Coir craft",
    cluster: "Alappuzha Coir Cooperative",
    district: "Alappuzha",
    area: "Alappuzha",
    coordinates: { lat: 9.4981, lng: 76.3388, x: 43, y: 49 },
    bio: "Coir craft maker turning traditional rope work into mats, baskets, wall pieces, and export-ready decor.",
    story:
      "Latha uses simple photo uploads and local-language prompts to maintain a portfolio without needing a separate website or social media page.",
    languages: ["Malayalam", "English"],
    yearsOfPractice: 18,
    rating: 4.6,
    reviewCount: 58,
    smartScore: { profile: 21, reviews: 23, activity: 17, certifications: 18, total: 79 },
    verified: false,
    verificationLevel: "Smart Score",
    certificates: ["Coir cooperative membership"],
    awards: [],
    availability: {
      days: ["Tue", "Thu", "Sat"],
      hours: "10:00 AM - 4:00 PM",
      nextSlot: "Thursday, 11:00 AM",
      presentToday: false,
    },
    contact: { phone: "+91 98765 43055", whatsapp: "+91 98765 43055" },
    image: imageAssets.coirCraft,
    portfolio: [imageAssets.coirCraft, imageAssets.heroWorkshop, imageAssets.kasavuLoom],
    productIds: ["prod-coir-runner"],
    reviews: [
      {
        name: "Nikhil P.",
        rating: 4,
        comment: "Good direct order flow and quick WhatsApp follow-up from the artisan.",
        date: "2026-03-18",
      },
    ],
  },
]

export const products: Product[] = [
  {
    id: "prod-teak-elephant",
    artisanId: "art-narayanan",
    title: "Nilambur Teak Elephant",
    description: "A hand-carved teak elephant polished with natural oil and signed by the artisan.",
    price: 5400,
    category: "Wood carving",
    image: imageAssets.teakElephant,
    images: [imageAssets.teakElephant, imageAssets.woodCarving],
    tags: ["teak", "souvenir", "signed"],
    stock: 4,
    leadTime: "Ships in 3 days",
    customOrder: true,
    verifiedMaterial: true,
  },
  {
    id: "prod-temple-panel",
    artisanId: "art-narayanan",
    title: "Custom Temple Panel",
    description: "Commission a carved wall panel based on a sketch, photograph, or temple motif.",
    price: 18500,
    category: "Wood carving",
    image: imageAssets.templePanel,
    images: [imageAssets.templePanel],
    tags: ["commission", "temple", "wood"],
    stock: 2,
    leadTime: "Made in 21 days",
    customOrder: true,
    verifiedMaterial: true,
  },
  {
    id: "prod-kasavu-saree",
    artisanId: "art-saraswathy",
    title: "Handwoven Kasavu Saree",
    description: "A six-yard handloom saree with a traditional gold-toned border from Balaramapuram.",
    price: 7200,
    category: "Kasavu weaving",
    image: imageAssets.kasavuSaree,
    images: [imageAssets.kasavuSaree, imageAssets.kasavuLoom],
    tags: ["handloom", "kasavu", "wedding"],
    stock: 6,
    leadTime: "Ships in 5 days",
    customOrder: true,
    verifiedMaterial: true,
  },
  {
    id: "prod-gold-border-shawl",
    artisanId: "art-saraswathy",
    title: "Gold Border Handloom Shawl",
    description: "Lightweight Kasavu-inspired shawl suitable for gifting and travel.",
    price: 2600,
    category: "Kasavu weaving",
    image: imageAssets.kasavuShawl,
    images: [imageAssets.kasavuShawl],
    tags: ["shawl", "gift", "handloom"],
    stock: 10,
    leadTime: "Ships in 2 days",
    customOrder: false,
    verifiedMaterial: true,
  },
  {
    id: "prod-aranmula-mirror",
    artisanId: "art-devan",
    title: "Aranmula Mirror Decor",
    description: "A verified metal mirror-inspired decor piece with QR-linked provenance details.",
    price: 15000,
    category: "Bell metal",
    image: imageAssets.bellMetal,
    images: [imageAssets.bellMetal],
    tags: ["heritage", "metal", "verified"],
    stock: 3,
    leadTime: "Ships in 7 days",
    customOrder: true,
    verifiedMaterial: true,
  },
  {
    id: "prod-brass-lamp",
    artisanId: "art-devan",
    title: "Hand-Finished Brass Lamp",
    description: "A compact ritual lamp with documented material source and finishing notes.",
    price: 4200,
    category: "Bell metal",
    image: imageAssets.brassLamp,
    images: [imageAssets.brassLamp],
    tags: ["lamp", "brass", "gift"],
    stock: 8,
    leadTime: "Ships in 4 days",
    customOrder: false,
    verifiedMaterial: true,
  },
  {
    id: "prod-mural-panel",
    artisanId: "art-fathima",
    title: "Kerala Mural Panel",
    description: "A framed contemporary mural panel using Kerala temple colour references.",
    price: 9800,
    category: "Mural painting",
    image: imageAssets.muralPanel,
    images: [imageAssets.muralPanel],
    tags: ["mural", "painting", "commission"],
    stock: 5,
    leadTime: "Ships in 6 days",
    customOrder: true,
    verifiedMaterial: false,
  },
  {
    id: "prod-mural-workshop",
    artisanId: "art-fathima",
    title: "Two-Hour Mural Workshop",
    description: "Book a guided Fort Kochi studio session and leave with a small painted tile.",
    price: 1800,
    category: "Mural painting",
    image: imageAssets.muralWorkshop,
    images: [imageAssets.muralWorkshop],
    tags: ["workshop", "fort-kochi", "tourist"],
    stock: 12,
    leadTime: "Instant booking request",
    customOrder: false,
    verifiedMaterial: false,
  },
  {
    id: "prod-coir-runner",
    artisanId: "art-latha",
    title: "Alappuzha Coir Table Runner",
    description: "Naturally dyed coir runner made by a cooperative artisan group in Alappuzha.",
    price: 1900,
    category: "Coir craft",
    image: imageAssets.coirCraft,
    images: [imageAssets.coirCraft],
    tags: ["coir", "home", "eco"],
    stock: 16,
    leadTime: "Ships in 3 days",
    customOrder: true,
    verifiedMaterial: true,
  },
]

export const bookingSlots: BookingSlot[] = [
  { id: "slot-wood-demo", artisanId: "art-narayanan", label: "Tomorrow, 10:30 AM wood carving demo", seats: 4 },
  { id: "slot-loom-tour", artisanId: "art-saraswathy", label: "Friday, 2:00 PM loom visit", seats: 3 },
  { id: "slot-metal-proof", artisanId: "art-devan", label: "Saturday, 9:30 AM metal finishing session", seats: 2 },
  { id: "slot-mural-tile", artisanId: "art-fathima", label: "Sunday, 4:00 PM mural tile workshop", seats: 8 },
  { id: "slot-coir-mat", artisanId: "art-latha", label: "Thursday, 11:00 AM coir braiding demo", seats: 6 },
]

export const platformPillars = [
  {
    title: "Create",
    summary: "AI-assisted profiles, photo portfolios, craft stories, certificates, availability, and QR identity.",
  },
  {
    title: "Connect",
    summary: "Map discovery, conversational search, direct messaging, visit bookings, ratings, and reviews.",
  },
  {
    title: "Sell",
    summary: "Direct product listings, custom orders, simulated UPI/card checkout, and authenticity proof.",
  },
]

export const techStack = [
  ["Frontend", "Next.js, React, TypeScript, Tailwind CSS"],
  ["Backend ready path", "Node.js REST services with Supabase/Firebase compatible data contracts"],
  ["AI layer", "Local heuristics now; LLM profile builder and discovery chatbot integration ready"],
  ["Maps", "Token-free SVG map now; Google Maps or Mapbox adapter can replace the data layer"],
  ["Payments", "Simulated checkout now; Razorpay/UPI integration boundary included in UI"],
  ["Verification", "Smart Score now; Hyperledger/IPFS credential record planned for Phase 2"],
]

export function getArtisanById(id: string) {
  return artisans.find((artisan) => artisan.id === id)
}

export function getArtisanBySlug(slug: string) {
  return artisans.find((artisan) => artisan.slug === slug)
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getProductsWithArtisans() {
  return products.map((product) => ({
    ...product,
    artisan: getArtisanById(product.artisanId)!,
  }))
}

export function getProductsForArtisan(artisanId: string) {
  return products.filter((product) => product.artisanId === artisanId)
}

export function getBookingSlotsForArtisan(artisanId: string) {
  return bookingSlots.filter((slot) => slot.artisanId === artisanId)
}

export function scoreLabel(score: number) {
  if (score >= 90) return "Verification eligible"
  if (score >= 80) return "Strong trust signal"
  if (score >= 70) return "Building trust"
  return "Needs onboarding support"
}

export function matchesQuery(text: string, query: string) {
  return text.toLowerCase().includes(query.trim().toLowerCase())
}

export function assistantSearch(query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return artisans.slice(0, 3)

  return artisans
    .map((artisan) => {
      const haystack = [
        artisan.name,
        artisan.craft,
        artisan.area,
        artisan.district,
        artisan.cluster,
        artisan.bio,
        artisan.languages.join(" "),
        artisan.availability.days.join(" "),
      ]
        .join(" ")
        .toLowerCase()

      let score = 0
      for (const token of normalized.split(/\s+/)) {
        if (haystack.includes(token)) score += 1
      }
      if (normalized.includes("weekend") && artisan.availability.days.some((day) => ["Sat", "Sun"].includes(day))) score += 2
      if (normalized.includes("near") && haystack.includes("kovalam")) score += 1
      if (normalized.includes("verified") && artisan.verified) score += 2
      if (normalized.includes("available") && artisan.availability.presentToday) score += 1
      return { artisan, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || b.artisan.smartScore.total - a.artisan.smartScore.total)
    .map((result) => result.artisan)
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}
