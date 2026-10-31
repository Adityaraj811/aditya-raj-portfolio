export type MenuCategoryFilter = 'all' | 'brews' | 'kitchen' | 'bakes';

export interface VelouraMenuItem {
  id: string;
  name: string;
  category: 'brews' | 'kitchen' | 'bakes';
  categoryLabel: string;
  price: number;
  points: number;
  notes: string;
  prep: string;
  badge?: string;
  imagePath: string;
}

export interface AlchemyNote {
  id: string;
  categoryLabel: string;
  title: string;
  fact: string;
  metric: string;
  pairing: string;
}

export const VELOURA_MENU_ITEMS: VelouraMenuItem[] = [
  {
    id: 'saffron-latte',
    name: 'Veloura Signature Saffron Latte',
    category: 'brews',
    categoryLabel: 'Alchemy Brews',
    price: 340,
    points: 35,
    notes: 'Kashmiri Saffron · Madagascar Vanilla · Micro-Foam',
    prep: '9.0 BAR · 93°C · Ratnagiri Arabica',
    badge: 'House Signature',
    imagePath: 'images/veloura-latte.jpg',
  },
  {
    id: 'rose-cortado',
    name: 'Damask Rose & Cardamom Cortado',
    category: 'brews',
    categoryLabel: 'Alchemy Brews',
    price: 290,
    points: 30,
    notes: 'Floral Rosewater · Crushed Malabar Cardamom · Dark Cocoa',
    prep: 'Chikmagalur Single-Estate · 4.5 oz Gibraltar',
    imagePath: 'images/veloura-cortado.jpg',
  },
  {
    id: 'cinnamon-coldbrew',
    name: '18-Hr Smoked Cinnamon Cold Brew',
    category: 'brews',
    categoryLabel: 'Alchemy Brews',
    price: 320,
    points: 30,
    notes: 'Charred Ceylon Cinnamon · Orange Zest · Crystal Sphere',
    prep: '18-Hour Slow Steep · Low Acidity',
    imagePath: 'images/veloura-coldbrew.jpg',
  },
  {
    id: 'cloud-eggs',
    name: 'Baked Pillowy Cloud Eggs',
    category: 'kitchen',
    categoryLabel: 'Slow Kitchen',
    price: 380,
    points: 40,
    notes: 'Whipped Herb Egg Whites · Golden Yolk · Sourdough',
    prep: 'Prepared Fresh · Artisan Courtyard',
    badge: 'Chef Ritual',
    imagePath: 'images/veloura-eggs.jpg',
  },
  {
    id: 'basque-cheesecake',
    name: 'Burnt Basque Cheesecake',
    category: 'bakes',
    categoryLabel: 'Bakes',
    price: 360,
    points: 35,
    notes: 'Caramelized Crust · Creamy Vanilla Bean Center',
    prep: 'Small-Batch Daily Bake',
    imagePath: 'images/veloura-cheesecake.jpg',
  },
];

export const ALCHEMY_NOTES: AlchemyNote[] = [
  {
    id: 'alch-1',
    categoryLabel: 'Extraction Thermodynamics',
    title: 'The 9-Bar Golden Emulsion & Tiger Striping',
    fact: 'At 9 bars of pressure and 93°C water temperature, hydrophobic coffee oils emulsify with CO₂ micro-bubbles inside freshly roasted Arabica cell walls—creating velvety reddish-gold tiger striping crema.',
    metric: 'Pressure: 9.0 BAR · Temp: 93.0°C · Yield: 1:2 in 28s',
    pairing: 'Paired with: The Veloura Signature Saffron Latte',
  },
  {
    id: 'alch-2',
    categoryLabel: 'Pour-Over Chemistry',
    title: 'Why the 45-Second "Coffee Bloom" Transforms Flavor',
    fact: 'When hot water first touches freshly ground coffee in a Chemex, trapped CO₂ rushes out in a velvety bloom. Waiting 45 seconds prevents carbonic sourness and unlocks white jasmine & stone-fruit aromatics.',
    metric: 'Bloom Water: 3× Dose · Wait: 45s · Total Brew: 4:00m',
    pairing: 'Paired with: Single-Origin Sanctuary Pour-Over',
  },
  {
    id: 'alch-3',
    categoryLabel: 'Indian Single-Estate Terroir',
    title: 'Shade-Grown Chikmagalur & Pepper Intercropping',
    fact: 'High-elevation Chikmagalur and Ratnagiri Arabica estates grow beneath native silver oak canopies intertwined with Malabar cardamom and pepper vines—imparting a warm spiced cocoa finish.',
    metric: 'Elevation: 1,350m MASL · Canopy: Silver Oak & Fig',
    pairing: 'Paired with: Damask Rose & Green Cardamom Cortado',
  },
  {
    id: 'alch-4',
    categoryLabel: 'Cold Extraction Physics',
    title: 'Time as a Solvent: 18-Hour Cold Steep vs. Thermal Brew',
    fact: 'Replacing thermal energy with 18 hours of ambient extraction reduces chlorogenic acid lactones by ~67%. Steeped with charred Ceylon cinnamon bark, the elixir is naturally sweet and syrupy.',
    metric: 'Steep Duration: 18 Hours · Acidity Reduction: ~67% · pH: 5.45',
    pairing: 'Paired with: 18-Hr Smoked Cinnamon Barrel Cold Brew',
  },
];

export function updateTrayQuantity(
  trayItems: Record<string, number>,
  itemId: string,
  delta: number
): Record<string, number> {
  const current = trayItems[itemId] || 0;
  const nextCount = Math.max(0, current + delta);
  const updated = { ...trayItems };
  if (nextCount === 0) {
    delete updated[itemId];
  } else {
    updated[itemId] = nextCount;
  }
  return updated;
}

export function calculateTrayTotals(
  trayItems: Record<string, number>,
  menuItems: VelouraMenuItem[] = VELOURA_MENU_ITEMS
): { totalCount: number; totalPriceInr: number } {
  let totalCount = 0;
  let totalPriceInr = 0;

  for (const item of menuItems) {
    const qty = Math.max(0, trayItems[item.id] || 0);
    totalCount += qty;
    totalPriceInr += qty * item.price;
  }

  return { totalCount, totalPriceInr };
}

export function filterVelouraMenuItems(
  category: MenuCategoryFilter,
  menuItems: VelouraMenuItem[] = VELOURA_MENU_ITEMS
): VelouraMenuItem[] {
  if (category === 'all') return menuItems;
  return menuItems.filter((item) => item.category === category);
}

export function stepAlchemyIndex(
  currentIndex: number,
  direction: 'next' | 'prev',
  totalNotes: number = ALCHEMY_NOTES.length
): number {
  if (totalNotes <= 0) return 0;
  if (direction === 'next') {
    return (currentIndex + 1) % totalNotes;
  }
  return (currentIndex - 1 + totalNotes) % totalNotes;
}
