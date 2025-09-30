export const mockRestaurants = [
  {
    id: 'r_sea_breeze',
    name: 'Sea Breeze Grill',
    rating: 4.6,
    etaMin: 25,
    etaMax: 35,
    cuisine: ['Seafood', 'Grill'],
    fee: 1.99,
    bannerColor: '#DCEBFF',
  },
  {
    id: 'r_blue_wave_sushi',
    name: 'Blue Wave Sushi',
    rating: 4.8,
    etaMin: 20,
    etaMax: 30,
    cuisine: ['Japanese', 'Sushi'],
    fee: 2.49,
    bannerColor: '#E6F1FF',
  },
  {
    id: 'r_ocean_bowl',
    name: 'Ocean Bowl Poke',
    rating: 4.4,
    etaMin: 15,
    etaMax: 25,
    cuisine: ['Poke', 'Healthy'],
    fee: 0.99,
    bannerColor: '#E8F7FF',
  },
];

export const mockMenus = {
  r_sea_breeze: [
    { id: 'm1', name: 'Grilled Salmon', desc: 'Citrus glaze, herbed rice, seasonal greens', price: 16.5 },
    { id: 'm2', name: 'Shrimp Tacos', desc: 'Chipotle aioli, cabbage slaw, lime', price: 12.0 },
    { id: 'm3', name: 'Clam Chowder', desc: 'Creamy New England style', price: 8.5 },
  ],
  r_blue_wave_sushi: [
    { id: 'm4', name: 'Bluefin Nigiri', desc: 'Premium bluefin tuna, wasabi, soy', price: 18.0 },
    { id: 'm5', name: 'Rainbow Roll', desc: 'Salmon, tuna, avocado, tobiko', price: 14.0 },
    { id: 'm6', name: 'Miso Soup', desc: 'Tofu, scallion, wakame', price: 4.5 },
  ],
  r_ocean_bowl: [
    { id: 'm7', name: 'Classic Ahi Poke', desc: 'Ahi tuna, shoyu, sesame, scallion', price: 13.0 },
    { id: 'm8', name: 'Spicy Salmon Bowl', desc: 'Salmon, spicy mayo, edamame, cucumber', price: 12.5 },
    { id: 'm9', name: 'Tofu Garden Bowl', desc: 'Tofu, ginger dressing, veggies', price: 11.0 },
  ],
};

export const categories = [
  'All', 'Seafood', 'Japanese', 'Sushi', 'Poke', 'Healthy', 'Grill'
];
