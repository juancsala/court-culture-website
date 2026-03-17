// Central registry of all image and logo assets.
// Update paths here if you rename or add files.

export const LOGOS = {
  main: '/Main%20Logo%20Png.png',
  mainWhite: '/Main%20Logo%20Blanco%20Png.png',
  emblem: '/Logo%20Corto%20Png.png',
  emblemWhite: '/Logo%20Corto%20Blanco%20Png.png',
}

export const PHOTOS = [
  '/web/DSC04152.jpg',
  '/web/DSC04191.jpg',
  '/web/DSC04288.jpg',
  '/web/DSC04422.jpg',
  '/web/DSC04425.jpg',
  '/web/DSC04496.jpg',
  '/web/DSC04515.jpg',
  '/web/DSC04525.jpg',
]

// Assign specific photos to specific roles
export const HERO_IMAGE = PHOTOS[7]        // DSC04525
export const COMMUNITY_IMAGES = PHOTOS.slice(0, 6) // First 6 for the grid
export const FEATURE_IMAGE = PHOTOS[6]     // DSC04515

export const LINKS = {
  whatsapp: 'https://tinyurl.com/courtculturemty',
  instagram: 'https://www.instagram.com/courtculture.mty?igsh=OGtibDJrZms1YWkz&utm_source=qr',
  tiktok: 'https://www.tiktok.com/@courtculture.mty?_r=1&_t=ZS-94kcjcVQxts',
}
