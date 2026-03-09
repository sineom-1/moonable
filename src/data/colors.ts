export interface KayakColor {
  id: string;
  name: string;
  hex: string;
}

export const KAYAK_COLORS: KayakColor[] = [
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'black', name: 'Black', hex: '#1A1A1A' },
  { id: 'red', name: 'Red', hex: '#D32F2F' },
  { id: 'blue', name: 'Ocean Blue', hex: '#1565C0' },
  { id: 'green', name: 'Forest Green', hex: '#2E7D32' },
  { id: 'yellow', name: 'Sunshine Yellow', hex: '#F9A825' },
  { id: 'orange', name: 'Sunset Orange', hex: '#E65100' },
  { id: 'grey', name: 'Slate Grey', hex: '#607D8B' },
];
