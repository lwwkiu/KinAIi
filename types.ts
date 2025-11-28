
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  COURIER = 'COURIER'
}

export interface User {
  username: string;
  name: string;
  role: UserRole;
  phone?: string;
  preferences?: DietPreferences;
  password?: string; // Stored for recovery logic mock
}

export interface DietPreferences {
  diet: string;
  allergies: string;
}

export interface Category {
  id: string;
  name_en: string;
  name_ru: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string; // Added for Drinks
  price: number;
  calories: number;
  image: string;
  description?: string; // AI generated description
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  courierLocation?: { lat: number; lng: number };
  userLocation?: { lat: number; lng: number }; // Added for map tracking
  address: string;
  receiverPhone: string;
  cookingTime: string;
  deliveryTime: string;
  customerName?: string; // For Admin/Courier view
  customerUsername?: string; // To link back to user history
  distanceKm?: number;
  date: string;
}

export type ViewState = 
  | 'AUTH' 
  | 'FORGOT_PASSWORD'
  | 'MAIN' 
  | 'MENU_CATEGORIES' 
  | 'MENU_ITEMS' 
  | 'AI_HELP' 
  | 'CART_CONFIRM' 
  | 'CHECKOUT' 
  | 'TRACKING' 
  | 'ORDER_HISTORY'
  | 'CHAT' 
  | 'ABOUT'
  | 'ADMIN_DASHBOARD'   
  | 'COURIER_DASHBOARD';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}