

import React, { useState, useEffect, useRef } from 'react';
import { 
  User, UserRole, ViewState, CartItem, Product, 
  Order, DietPreferences, ChatMessage 
} from './types';
import { 
    CATEGORIES, MOCK_PRODUCTS, KINAI_AVATAR_URL, DRINK_SUBCATEGORIES, 
    CAROUSEL_IMAGES, SIDE_BG_IMAGE, AUTH_BG_IMAGE, BG_HISTORY, BG_CHAT, BG_ABOUT,
    CHAT_SIDE_GIF_LEFT, CHAT_SIDE_GIF_RIGHT, HISTORY_COLLAGE_IMAGES
} from './constants';
import { KinaiAvatar } from './components/KinaiAvatar';
import { Cart } from './components/Cart';
import { generatePasswordAdvice, analyzeFood, recommendFood, chatWithKinai, getDeliveryEstimate } from './services/geminiService';
import { 
  User as UserIcon, MapPin, Search, MessageCircle, 
  Info, Home, ChevronLeft, Clock, CheckCircle, Loader2, Menu, ShoppingCart,
  LogOut, X, Trash, Edit, Navigation, PlayCircle, History, Send, Plus, ArrowLeft, ChevronDown, ChevronUp, RefreshCw, ArrowRight, Sparkles, FileText, ShoppingBag, AlertCircle
} from 'lucide-react';

// --- Translation Dictionary ---
const TRANSLATIONS = {
    EN: {
        login: "Login",
        register: "Register",
        welcome_back: "Welcome Back",
        create_account: "Create Account",
        username: "Username",
        password: "Password",
        repeat_password: "Repeat Password",
        name: "Name",
        phone: "Phone",
        forgot_password: "Forgot Password?",
        login_btn: "Login",
        create_btn: "Create Account",
        home: "Home",
        my_order: "My Order",
        chat: "Chat with Kinai",
        about: "About Kinai",
        choose_myself: "Menu Categories",
        help_me: "Ask Kinai AI",
        categories: "Categories",
        back: "Back",
        view_items: "View Items",
        add_to_cart: "Add to Cart",
        add_to_order: "Add to Order", // Admin specific
        my_cart: "My Cart",
        customer_cart: "Customer Order", // Admin specific
        confirm_order: "Confirm Order",
        save_changes: "Save Changes", // Admin specific
        diet_pref: "Dietary Preferences",
        diet_q1: "Do you follow any specific diet?",
        diet_q2: "Do you have any allergies?",
        gen_recs: "Generate Recommendations",
        load_more: "Load More",
        finalize: "Finalize Order",
        del_addr: "Delivery Address",
        rec_phone: "Receiver Phone",
        prep_time: "Preparation Time",
        del_time: "Delivery Time",
        confirm_btn: "Confirm & Order",
        status_prep: "Kitchen is preparing your meal...",
        status_del: "Courier is on the way!",
        status_done: "Delivered",
        admin_title: "Admin Dashboard",
        admin_edit_title: "Editing User Order",
        courier_title: "Courier Dashboard",
        logout: "Logout",
        drinks_hot: "Hot Drinks",
        drinks_non_alc: "Non-alcoholic Cocktails",
        drinks_alc_cocktail: "Alcoholic Cocktails",
        drinks_alc: "Alcoholic Drinks",
        drinks_carb: "Carbonated Drinks",
        drinks_non_carb: "Non-carbonated Drinks",
        courier_set_loc: "Auto-Tracking Active",
        courier_confirm_del: "Confirm Delivery",
        courier_confirm_msg: "Are you sure this order has been delivered?",
        courier_success: "Order Delivered Successfully!",
        placeholder_chat: "Type your question regarding your diet...",
        placeholder_addr: "Street, Building, Apt (e.g. Ahunbaeva 10)",
        back_to_dashboard: "Back to Dashboard",
        admin_confirm_order: "Confirm Order",
        order_items_title: "Order Items",
        current_time: "Current Time",
        recover_title: "Recover Password",
        recover_btn: "Show Password",
        recover_success: "Your password is: ",
        recover_fail: "User not found.",
        distance_calc: "Distance from Maldybaeva 34B: ",
        history_title: "Order History",
        no_history: "No previous orders found.",
        // About Page Translations
        about_title: "About Kinai & Us",
        about_desc: "Kinai is an advanced AI dietitian integrated directly into your food delivery experience. Unlike standard delivery apps, Kinai analyzes every ingredient to ensure your meal fits your dietary needs perfectly.",
        loc_title: "Our Headquarters",
        loc_desc: "We are located in the heart of Bishkek. Our kitchen uses smart-tech to prepare meals efficiently.",
        loc_addr: "Maldybaeva 34B, Bishkek, Kyrgyzstan",
        tech_title: "Smart Kitchen Technology",
        tech_desc: "Our facility utilizes automated temperature control and AI-driven inventory management to ensure every ingredient is fresh and every meal is cooked to perfection.",
        form_title: "Feedback & Suggestions",
        form_desc: "Help us improve! Fill out the form below.",
        admin_msg_added: "Product added to Customer Order",
        admin_msg_confirmed: "You confirmed the order",
        ingredients: "Ingredients",
        loading_ai: "Kinai is thinking...",
        hero_title: "Smart Nutrition",
        hero_subtitle: "Your personal AI nutrition assistant",
        hero_desc: "Kinai helps you choose the perfect meal based on your health goals and preferences.",
        choose_desc: "Browse our menu",
        help_desc: "Let AI choose for you",
        kinai_typing: "Kinai is typing...",
        kinai_tip_title: "Kinai's Insight",
        kinai_tip_subtitle: "Hover over a dish to see details",
        tooltip_ingredients: "Composition:",
        tooltip_tip: "Kinai Recommends:"
    },
    RU: {
        login: "Вход",
        register: "Регистрация",
        welcome_back: "С возвращением",
        create_account: "Создать аккаунт",
        username: "Логин",
        password: "Пароль",
        repeat_password: "Повторите пароль",
        name: "Имя",
        phone: "Телефон",
        forgot_password: "Забыли пароль?",
        login_btn: "Войти",
        create_btn: "Создать аккаунт",
        home: "Главная",
        my_order: "Мой заказ",
        chat: "Чат с Кинай",
        about: "О Кинай",
        choose_myself: "Меню категорий",
        help_me: "Спросить Кинай",
        categories: "Категории",
        back: "Назад",
        view_items: "Посмотреть",
        add_to_cart: "В корзину",
        add_to_order: "Добавить в заказ",
        my_cart: "Корзина",
        customer_cart: "Заказ клиента",
        confirm_order: "Утвердить заказ",
        save_changes: "Сохранить изменения",
        diet_pref: "Предпочтения",
        diet_q1: "Вы соблюдаете диету?",
        diet_q2: "Есть ли у вас аллергия?",
        gen_recs: "Подобрать продукты",
        load_more: "Еще варианты",
        finalize: "Оформление заказа",
        del_addr: "Куда доставить",
        rec_phone: "Номер получателя",
        prep_time: "Время готовки",
        del_time: "Время доставки",
        confirm_btn: "Оформить и заказать",
        status_prep: "Готовится", 
        status_del: "Доставляется", 
        status_done: "Доставлено",
        admin_title: "Панель Администратора",
        admin_edit_title: "Редактирование заказа",
        courier_title: "Панель Курьера",
        logout: "Выйти",
        drinks_hot: "Горячие напитки",
        drinks_non_alc: "Безалкогольные коктейли",
        drinks_alc_cocktail: "Алкогольные коктейли",
        drinks_alc: "Алкогольные напитки",
        drinks_carb: "Газированные напитки",
        drinks_non_carb: "Негазированные напитки",
        courier_set_loc: "Авто-трекинг активен",
        courier_confirm_del: "Подтвердить доставку",
        courier_confirm_msg: "Вы уверены, что заказ был доставлен?",
        courier_success: "Заказ успешно доставлен!",
        placeholder_chat: "Введите вопрос по вашей диете...",
        placeholder_addr: "Улица, Дом, Кв (напр. Ахунбаева 10)",
        back_to_dashboard: "Вернуться в панель",
        admin_confirm_order: "Подтвердить заказ",
        order_items_title: "Состав заказа",
        current_time: "Текущее время",
        recover_title: "Восстановление пароля",
        recover_btn: "Показать пароль",
        recover_success: "Ваш пароль: ",
        recover_fail: "Пользователь не найден.",
        distance_calc: "Расстояние от Малдыбаева 34Б: ",
        history_title: "История заказов",
        no_history: "История заказов пуста.",
        // About Page Translations
        about_title: "О Кинай и о Нас",
        about_desc: "Кинай — это продвинутый ИИ-диетолог, интегрированный прямо в процесс доставки еды. В отличие от обычных приложений, Кинай анализирует каждый ингредиент, чтобы ваше блюдо идеально соответствовало вашим потребностям.",
        loc_title: "Наш Главный Офис",
        loc_desc: "Мы находимся в центре Бишкека. Наша кухня использует смарт-технологии для эффективного приготовления блюд.",
        loc_addr: "Малдыбаева 34Б, Бишкек, Кыргызстан",
        tech_title: "Технологии Умной Кухни",
        tech_desc: "Наш объект использует автоматический контроль температуры и управление запасами на основе ИИ, чтобы гарантировать свежесть ингредиентов и идеальное приготовление каждого блюда.",
        form_title: "Обратная связь",
        form_desc: "Помогите нам стать лучше! Заполните форму ниже.",
        admin_msg_added: "Продукт добавлен в заказ клиента",
        admin_msg_confirmed: "Вы подтвердили заказ",
        ingredients: "Состав",
        loading_ai: "Кинай думает...",
        hero_title: "Умное Питание",
        hero_subtitle: "Ваш личный ИИ-нутрициолог",
        hero_desc: "Кинай поможет вам выбрать идеальное блюдо, исходя из ваших целей и предпочтений.",
        choose_desc: "Посмотреть меню",
        help_desc: "ИИ поможет выбрать",
        kinai_typing: "Кинай печатает...",
        kinai_tip_title: "Подсказка Кинай",
        kinai_tip_subtitle: "Наведите на блюдо для разбора",
        tooltip_ingredients: "Состав:",
        tooltip_tip: "Совет от Кинай:"
    }
};

// --- Map Widget Component (Google Maps Integration) ---
const BishkekMap = ({ courierLat, courierLng, userLat, userLng, status, address }: any) => {
    const restaurantLat = 42.84;
    const restaurantLng = 74.60;
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address ? address + ", Bishkek" : "Bishkek")}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    const getPos = (lat: number, lng: number) => {
        const y = (42.90 - lat) / (42.90 - 42.80) * 100; 
        const x = (lng - 74.55) / (74.70 - 74.55) * 100;
        return { top: `${Math.max(5, Math.min(95, y))}%`, left: `${Math.max(5, Math.min(95, x))}%` };
    }

    const RESTAURANT_POS = getPos(restaurantLat, restaurantLng); 
    const courierPos = getPos(courierLat, courierLng);
    const userPos = getPos(userLat, userLng);

    return (
        <div className="relative w-full h-80 bg-gray-200 rounded-xl overflow-hidden border-2 border-gray-300 shadow-inner">
            <iframe 
                width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} 
                src={mapSrc} className="opacity-80 grayscale-[0.3]" title="Bishkek Map"
            ></iframe>
            
            <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded shadow text-xs font-bold z-10 flex items-center gap-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" className="w-4 h-4"/>
                Google Maps
            </div>

            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none" style={RESTAURANT_POS}>
                 <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow animate-pulse"></div>
                 <span className="text-[10px] font-bold bg-white px-1 rounded mt-1 shadow">Kitchen</span>
            </div>

            {address && (
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none" style={userPos}>
                     <MapPin className="text-brand-orange fill-brand-orange" size={24} />
                     <span className="text-[10px] font-bold bg-white px-1 rounded shadow">You</span>
                </div>
            )}

            {(status === 'delivering' || status === 'delivered') && (
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000 ease-linear" style={courierPos}>
                     <div className="bg-brand-green p-1.5 rounded-full shadow-lg border-2 border-white">
                        <Navigation size={16} className="text-white transform rotate-45" />
                     </div>
                     <span className="text-[10px] font-bold bg-white px-1 rounded mt-1 shadow whitespace-nowrap">Courier</span>
                </div>
            )}
        </div>
    );
};
console.log("KEY:", import.meta.env.VITE_GEMINI_API_KEY);

export default function App() {
  const [lang, setLang] = useState<'EN' | 'RU'>('RU');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewState, setViewState] = useState<ViewState>('AUTH');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [dietPreferences, setDietPreferences] = useState<DietPreferences>({ diet: '', allergies: '' });
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [courierLocation, setCourierLocation] = useState({ lat: 42.84, lng: 74.60 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notification, setNotification] = useState<string | null>(null);

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [regData, setRegData] = useState({ name: '', username: '', password: '', repeatPassword: '', phone: '', gender: 'male', age: '' });
  const [checkoutData, setCheckoutData] = useState({ address: '', phone: '', cookingTime: '', deliveryTime: '' });
  const [passRecoveryData, setPassRecoveryData] = useState({ username: '', name: '' });
  
  const [deliveryCalc, setDeliveryCalc] = useState<{distance: number, time: string, lat: number, lng: number} | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [adminEditOrderId, setAdminEditOrderId] = useState<string | null>(null);
  const [showCourierSuccess, setShowCourierSuccess] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const deliveringOrder = allOrders.find(o => o.status === 'delivering');
    if (deliveringOrder && deliveringOrder.userLocation) {
      const interval = setInterval(() => {
        setCourierLocation(prev => {
          const target = deliveringOrder.userLocation!;
          const dLat = target.lat - prev.lat;
          const dLng = target.lng - prev.lng;
          if (Math.abs(dLat) < 0.001 && Math.abs(dLng) < 0.001) return prev;
          return { lat: prev.lat + dLat * 0.05, lng: prev.lng + dLng * 0.05 };
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [allOrders]);

  useEffect(() => {
      if (notification) {
          // Clear notification after 3 seconds
          const timer = setTimeout(() => setNotification(null), 3000);
          return () => clearTimeout(timer);
      }
  }, [notification]);

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2-lat1) * (Math.PI/180);
    const dLon = (lon2-lon1) * (Math.PI/180); 
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c; 
  }

  useEffect(() => {
    const calc = async () => {
      if (!checkoutData.address || checkoutData.address.length < 5) return;
      setIsCalculating(true);
      const result = await getDeliveryEstimate(checkoutData.address);
      const dist = getDistanceFromLatLonInKm(42.84, 74.60, result.lat, result.lng);
      let timeStr = dist < 4 ? "10-15 min" : dist <= 6 ? "25 min" : "30-40 min";
      setDeliveryCalc({ distance: parseFloat(dist.toFixed(1)), time: timeStr, lat: result.lat, lng: result.lng });
      setIsCalculating(false);
    };
    const timeout = setTimeout(calc, 1500);
    return () => clearTimeout(timeout);
  }, [checkoutData.address]);

  // Helper function to localize status
  const getStatusLabel = (status: string) => {
    if (lang === 'EN') return status.toUpperCase();
    switch (status) {
        case 'preparing': return 'ГОТОВИТСЯ';
        case 'delivering': return 'ДОСТАВЛЯЕТСЯ';
        case 'delivered': return 'ДОСТАВЛЕНО';
        case 'cancelled': return 'ОТМЕНЕНО';
        default: return status.toUpperCase();
    }
  };

  const handleLogin = () => {
    if (loginData.username === 'aki' && loginData.password === '456') {
      setCurrentUser({ username: 'aki', name: 'Admin', role: UserRole.ADMIN });
      setViewState('ADMIN_DASHBOARD');
      return;
    }
    if (loginData.username === 'nur' && loginData.password === '123') {
      setCurrentUser({ username: 'nur', name: 'Courier', role: UserRole.COURIER });
      setViewState('COURIER_DASHBOARD');
      return;
    }
    const foundUser = registeredUsers.find(u => u.username === loginData.username && u.password === loginData.password);
    if (foundUser) {
      setCurrentUser(foundUser);
      setViewState('MAIN');
      return;
    }
    alert(lang === 'RU' ? 'Неверный логин или пароль' : 'Invalid credentials');
  };

  const handleRegister = () => {
    if (!regData.username || !regData.password) return;
    if (regData.password !== regData.repeatPassword) {
      alert(lang === 'RU' ? 'Пароли не совпадают' : 'Passwords do not match');
      return;
    }
    const newUser: User = { username: regData.username, name: regData.name, role: UserRole.USER, phone: regData.phone, password: regData.password };
    setRegisteredUsers([...registeredUsers, newUser]);
    setCurrentUser(newUser);
    setViewState('MAIN');
  };

  const handleRecoverPassword = () => {
      const found = registeredUsers.find(u => u.username === passRecoveryData.username && u.name.toLowerCase() === passRecoveryData.name.toLowerCase());
      if (found && found.password) {
          alert(`${t.recover_success} ${found.password}`);
          setLoginData({ username: found.username, password: found.password });
          setViewState('AUTH');
          setActiveTab('login');
      } else {
          alert(t.recover_fail);
      }
  };

  const logout = () => {
    setCurrentUser(null);
    setViewState('AUTH');
    setCart([]);
    setLoginData({ username: '', password: '' });
  };

  const addToCart = (product: Product) => {
    if (currentUser?.role === UserRole.ADMIN && adminEditOrderId) {
        setAllOrders(prev => prev.map(o => {
            if (o.id === adminEditOrderId) {
                const existing = o.items.find(i => i.id === product.id);
                let newItems = existing ? o.items.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i) : [...o.items, { ...product, quantity: 1 }];
                const newTotal = newItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
                return { ...o, items: newItems, total: newTotal };
            }
            return o;
        }));
        // Ensure notification doesn't spam by checking if it's already set or just rely on state update
        setNotification(lang === 'RU' ? `Вы добавили "${product.name}" (1 шт.) в заказ клиента` : `You added "${product.name}" (1 pc) to customer order`);
    } else {
        setCart(prev => {
        const existing = prev.find(i => i.id === product.id);
        return existing ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    }
  };

  const updateCartQuantity = (id: string, delta: number) => {
    if (currentUser?.role === UserRole.ADMIN && adminEditOrderId) {
        setAllOrders(prev => prev.map(o => {
            if (o.id === adminEditOrderId) {
                const newItems = o.items.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0);
                return { ...o, items: newItems, total: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0) };
            }
            return o;
        }));
    } else {
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0));
    }
  };

  const removeCartItem = (id: string) => {
    if (currentUser?.role === UserRole.ADMIN && adminEditOrderId) {
        setAllOrders(prev => prev.map(o => o.id === adminEditOrderId ? { ...o, items: o.items.filter(i => i.id !== id), total: o.items.filter(i => i.id !== id).reduce((acc, i) => acc + i.price * i.quantity, 0) } : o));
    } else {
        setCart(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleConfirmOrder = () => {
    if (currentUser?.role === UserRole.ADMIN) {
        setViewState('ADMIN_DASHBOARD');
        setAdminEditOrderId(null);
        setIsCartOpen(false);
    } else {
        setViewState('CHECKOUT');
        setIsCartOpen(false);
    }
  };

  const finalizeOrder = () => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: cart,
      total: cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
      status: 'preparing',
      address: checkoutData.address,
      receiverPhone: checkoutData.phone,
      cookingTime: '20 min',
      deliveryTime: deliveryCalc?.time || '30 min',
      customerName: currentUser?.name,
      customerUsername: currentUser?.username,
      date: new Date().toLocaleString(),
      userLocation: deliveryCalc ? { lat: deliveryCalc.lat, lng: deliveryCalc.lng } : undefined,
      distanceKm: deliveryCalc?.distance
    };
    setAllOrders([...allOrders, newOrder]);
    setActiveOrder(newOrder);
    setCart([]);
    setViewState('TRACKING');
  };

  const handleAdminStatusChange = (orderId: string, status: Order['status']) => {
    setAllOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (status === 'delivering') setNotification(t.admin_msg_confirmed);
  };
  
  const handleAdminEditOrder = (orderId: string) => {
      setAdminEditOrderId(orderId);
      setViewState('MENU_CATEGORIES');
      setIsCartOpen(true);
  };

  const confirmDelivery = (orderId: string) => {
      setAllOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: 'delivered' } : order));
      setShowCourierSuccess(true);
  };
  
  const handleSendMessage = async () => {
      if (!chatInput) return;
      const text = chatInput;
      setChatInput('');
      setChatHistory(prev => [...prev, { role: 'user', text }]);
      
      setIsAiTyping(true); // Start typing
      const response = await chatWithKinai(text, lang);
      setIsAiTyping(false); // Stop typing
      
      setChatHistory(prev => [...prev, { role: 'model', text: response }]);
  };

  const getDisplayedProducts = () => {
    let prods = MOCK_PRODUCTS.filter(p => p.category === activeCategory);
    if (activeCategory === 'drinks' && activeSubCategory) prods = prods.filter(p => p.subcategory === activeSubCategory);
    return prods;
  };
  
  const loadRecommendations = async (append = false) => {
      setIsAiLoading(true);
      try {
          const excludeIds = append ? recommendations.map(p => p.id) : [];
          const recs = await recommendFood(`${dietPreferences.diet}, No ${dietPreferences.allergies}`, lang, excludeIds);
          const prodObjs = MOCK_PRODUCTS.filter(p => recs.includes(p.id));
          if (append) setRecommendations(prev => [...prev, ...prodObjs]);
          else setRecommendations(prodObjs);
      } finally {
          setIsAiLoading(false);
      }
  };

  // Helper to get UNIQUE ingredients and advice per product
  const getProductDetails = (product: Product) => {
    const isRU = lang === 'RU';
    
    // Default fallback
    let ingredients = isRU ? ["Секретный ингредиент"] : ["Secret ingredient"];
    let tip = isRU ? "Вкусно и полезно!" : "Tasty and healthy!";

    // Specific mapping for products to ensure variety (Simulating DB)
    switch(product.id) {
        // Salads
        case 's1': // Caesar
            ingredients = isRU ? ["Куриное филе", "Салат Романо", "Пармезан", "Гренки", "Соус"] : ["Chicken breast", "Romaine", "Parmesan", "Croutons", "Sauce"];
            tip = isRU ? "Высокий белок, классический вкус." : "High protein, classic taste.";
            break;
        case 's2': // Greek
            ingredients = isRU ? ["Огурцы", "Помидоры", "Фета", "Оливки", "Орегано"] : ["Cucumber", "Tomato", "Feta", "Olives", "Oregano"];
            tip = isRU ? "Много витаминов и полезных жиров." : "Full of vitamins and healthy fats.";
            break;
        case 's3': // Quinoa Bowl
            ingredients = isRU ? ["Киноа", "Авокадо", "Черри", "Шпинат", "Лимон"] : ["Quinoa", "Avocado", "Cherry tomatoes", "Spinach", "Lemon"];
            tip = isRU ? "Суперфуд для энергии на весь день." : "Superfood for all-day energy.";
            break;
        
        // Appetizers
        case 'a1': // Bruschetta
            ingredients = isRU ? ["Чиабатта", "Томаты", "Базилик", "Чеснок"] : ["Ciabatta", "Tomatoes", "Basil", "Garlic"];
            tip = isRU ? "Легкая закуска перед основным блюдом." : "Light starter before the main course.";
            break;
        case 'a5': // Wings
            ingredients = isRU ? ["Куриные крылья", "Медовый соус", "Специи"] : ["Chicken wings", "Honey sauce", "Spices"];
            tip = isRU ? "Осторожно, может быть остро!" : "Careful, might be spicy!";
            break;

        // First Courses
        case 'f1': // Tomato Soup
            ingredients = isRU ? ["Томаты", "Лук", "Сливки", "Базилик"] : ["Tomatoes", "Onion", "Cream", "Basil"];
            tip = isRU ? "Отлично согревает и насыщает." : "Warms you up perfectly.";
            break;
        case 'f8': // Borsch
            ingredients = isRU ? ["Свекла", "Капуста", "Говядина", "Картофель", "Сметана"] : ["Beets", "Cabbage", "Beef", "Potatoes", "Sour cream"];
            tip = isRU ? "Традиционный вкус, богатый железом." : "Traditional taste, rich in iron.";
            break;

        // Second Courses
        case 'm1': // Salmon
            ingredients = isRU ? ["Лосось", "Спаржа", "Лимонный сок", "Травы"] : ["Salmon", "Asparagus", "Lemon juice", "Herbs"];
            tip = isRU ? "Омега-3 жирные кислоты для мозга." : "Omega-3 fatty acids for the brain.";
            break;
        case 'm2': // Steak
            ingredients = isRU ? ["Говядина Рибай", "Розмарин", "Масло", "Перец"] : ["Ribeye Beef", "Rosemary", "Butter", "Pepper"];
            tip = isRU ? "Мощный заряд белка." : "Powerful protein boost.";
            break;

        // Desserts
        case 'ds1': // Cheesecake
            ingredients = isRU ? ["Сливочный сыр", "Печенье", "Сахар", "Ваниль"] : ["Cream cheese", "Biscuits", "Sugar", "Vanilla"];
            tip = isRU ? "Наслаждайтесь каждым кусочком." : "Enjoy every bite.";
            break;
            
        // Drinks
        case 'hd1': // Espresso
            ingredients = isRU ? ["Кофейные зерна 100% арабика", "Вода"] : ["100% Arabica beans", "Water"];
            tip = isRU ? "Бодрость в маленькой чашке." : "Energy in a small cup.";
            break;

        default:
            // Generic fallbacks based on category if specific ID not found
            if (product.category === 'salads') {
                ingredients = isRU ? ["Свежая зелень", "Овощи по сезону", "Заправка"] : ["Fresh greens", "Seasonal veggies", "Dressing"];
            } else if (product.category === 'drinks') {
                ingredients = isRU ? ["Натуральные ингредиенты", "Лед"] : ["Natural ingredients", "Ice"];
            } else {
                 ingredients = isRU ? ["Основные ингредиенты шеф-повара", "Специи"] : ["Chef's main ingredients", "Spices"];
            }
            break;
    }

    return { ingredients, tip };
  };

  if (viewState === 'AUTH') {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-brand-light">
         <div className="absolute inset-0 z-0">
             <img src={AUTH_BG_IMAGE} className="w-full h-full object-cover opacity-60" alt="background"/>
         </div>
         <div className="relative z-10 w-full max-w-3xl h-full min-h-screen bg-white shadow-2xl flex flex-col">
            <div className="p-6 flex justify-between items-center border-b bg-brand-green text-white">
                <h1 className="text-xl font-bold tracking-widest uppercase">Kinai Food</h1>
                <div className="flex gap-2">
                    <button onClick={() => setLang('EN')} className={`px-2 py-1 text-xs rounded ${lang === 'EN' ? 'bg-white text-brand-green' : 'bg-brand-darkGreen'}`}>EN</button>
                    <button onClick={() => setLang('RU')} className={`px-2 py-1 text-xs rounded ${lang === 'RU' ? 'bg-white text-brand-green' : 'bg-brand-darkGreen'}`}>RU</button>
                </div>
            </div>
            <div className="flex-1 flex flex-col p-8">
                <div className="flex justify-center mb-6">
                    <KinaiAvatar size="lg" message={activeTab === 'register' ? (lang === 'RU' ? "Придумайте надежный пароль!" : "Create a strong password!") : undefined} />
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button onClick={() => setActiveTab('login')} className={`flex-1 py-2 rounded-lg font-medium transition-all ${activeTab === 'login' ? 'bg-white shadow text-brand-green' : 'text-gray-500'}`}>{t.login}</button>
                    <button onClick={() => setActiveTab('register')} className={`flex-1 py-2 rounded-lg font-medium transition-all ${activeTab === 'register' ? 'bg-white shadow text-brand-green' : 'text-gray-500'}`}>{t.register}</button>
                </div>
                {activeTab === 'login' ? (
                    <div className="space-y-4">
                        <input type="text" placeholder={t.username} className="w-full p-4 bg-blue-50 rounded-xl border-none focus:ring-2 focus:ring-brand-green text-gray-800 placeholder-gray-400" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} />
                        <input type="password" placeholder={t.password} className="w-full p-4 bg-blue-50 rounded-xl border-none focus:ring-2 focus:ring-brand-green text-gray-800 placeholder-gray-400" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} />
                        <button onClick={() => setViewState('FORGOT_PASSWORD')} className="text-sm text-brand-orange hover:underline">{t.forgot_password}</button>
                        <button onClick={handleLogin} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-darkGreen shadow-lg transition-transform active:scale-95">{t.login_btn}</button>
                    </div>
                ) : (
                    <div className="space-y-3 overflow-y-auto max-h-[50vh] pr-2">
                         <input type="text" placeholder={t.name} className="w-full p-3 bg-blue-50 rounded-xl focus:ring-2 focus:ring-brand-green text-gray-800" value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} />
                        <div className="flex gap-2">
                             <input type="text" placeholder={t.username} className="flex-1 p-3 bg-blue-50 rounded-xl focus:ring-2 focus:ring-brand-green text-gray-800" value={regData.username} onChange={e => setRegData({...regData, username: e.target.value})} />
                             <input type="text" placeholder="Age" className="w-20 p-3 bg-blue-50 rounded-xl focus:ring-2 focus:ring-brand-green text-gray-800" value={regData.age} onChange={e => setRegData({...regData, age: e.target.value})} />
                        </div>
                        <input type="tel" placeholder={t.phone} className="w-full p-3 bg-blue-50 rounded-xl focus:ring-2 focus:ring-brand-green text-gray-800" value={regData.phone} onChange={e => setRegData({...regData, phone: e.target.value})} />
                         <input type="password" placeholder={t.password} className="w-full p-3 bg-blue-50 rounded-xl focus:ring-2 focus:ring-brand-green text-gray-800" value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} />
                         <input type="password" placeholder={t.repeat_password} className="w-full p-3 bg-blue-50 rounded-xl focus:ring-2 focus:ring-brand-green text-gray-800" value={regData.repeatPassword} onChange={e => setRegData({...regData, repeatPassword: e.target.value})} />
                        <button onClick={handleRegister} className="w-full bg-brand-green text-white py-3 rounded-xl font-bold text-lg hover:bg-brand-darkGreen shadow-lg mt-4">{t.create_btn}</button>
                    </div>
                )}
            </div>
         </div>
      </div>
    );
  }

  if (viewState === 'FORGOT_PASSWORD') {
      return (
        <div className="min-h-screen relative flex items-center justify-center bg-brand-light">
             <div className="absolute inset-0 z-0"><img src={AUTH_BG_IMAGE} className="w-full h-full object-cover opacity-60" alt="bg"/></div>
            <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl text-center">
                 <h2 className="text-2xl font-bold text-brand-green mb-4">{t.recover_title}</h2>
                 <KinaiAvatar className="justify-center mb-6" message={lang === 'RU' ? "Введите логин и имя" : "Enter username and name"} />
                 <input type="text" placeholder={t.username} className="w-full p-3 bg-blue-50 rounded-xl mb-3 focus:ring-2 focus:ring-brand-green text-gray-800" value={passRecoveryData.username} onChange={e => setPassRecoveryData({...passRecoveryData, username: e.target.value})} />
                 <input type="text" placeholder={t.name} className="w-full p-3 bg-blue-50 rounded-xl mb-6 focus:ring-2 focus:ring-brand-green text-gray-800" value={passRecoveryData.name} onChange={e => setPassRecoveryData({...passRecoveryData, name: e.target.value})} />
                 <div className="flex gap-2">
                     <button onClick={() => setViewState('AUTH')} className="flex-1 py-3 text-gray-500 hover:bg-gray-100 rounded-xl">{t.back}</button>
                     <button onClick={handleRecoverPassword} className="flex-1 py-3 bg-brand-green text-white rounded-xl font-bold hover:bg-brand-darkGreen">{t.recover_btn}</button>
                 </div>
            </div>
        </div>
      );
  }

  const Header = () => (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex flex-col items-start ml-2">
             <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">K</div>
             <span className="text-xs font-bold text-brand-green tracking-widest mt-1">KINAI</span>
        </div>
        <div className="flex items-center gap-3">
             {currentUser?.role !== UserRole.USER && <span className="bg-brand-orange text-white text-xs px-2 py-1 rounded">{currentUser?.role}</span>}
             {currentUser?.role === UserRole.USER && (
                 <>
                    <button onClick={() => setViewState('MAIN')} className="text-brand-green hover:underline flex items-center gap-1"><Home size={18} /> <span className="hidden md:inline">{t.home}</span></button>
                    <button onClick={() => setViewState('ORDER_HISTORY')} className="flex items-center gap-1 text-sm text-gray-600 hover:text-brand-green px-2 py-1 rounded-lg hover:bg-blue-50"><History size={18} /> <span className="hidden md:inline">{t.history_title}</span></button>
                    <button onClick={() => setViewState('CHAT')} className="flex items-center gap-1 text-sm text-gray-600 hover:text-brand-green px-2 py-1 rounded-lg hover:bg-blue-50"><MessageCircle size={18} /> <span className="hidden md:inline">{t.chat}</span></button>
                    <button onClick={() => setViewState('ABOUT')} className="flex items-center gap-1 text-sm text-gray-600 hover:text-brand-green px-2 py-1 rounded-lg hover:bg-blue-50"><Info size={18} /> <span className="hidden md:inline">{t.about}</span></button>
                    <button onClick={() => setIsCartOpen(true)} className="p-2 hover:bg-gray-100 rounded-full relative ml-2">
                        <ShoppingCart size={24} className="text-gray-600" />
                        {cart.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.reduce((a,b) => a+b.quantity, 0)}</span>}
                    </button>
                 </>
             )}
             {currentUser?.role === UserRole.ADMIN && adminEditOrderId && <button onClick={() => setViewState('ADMIN_DASHBOARD')} className="bg-gray-800 text-white px-3 py-1 rounded text-sm">{t.back_to_dashboard}</button>}
             <button onClick={logout} className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm ml-2 border-l pl-2"><LogOut size={16}/> <span className="hidden sm:inline">{t.logout}</span></button>
        </div>
    </div>
  );

  if (viewState === 'ADMIN_DASHBOARD') {
      return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">{t.admin_title}</h1>
                <div className="space-y-4">
                    {allOrders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-green">
                            <div className="flex justify-between items-start mb-4">
                                <div><h3 className="text-xl font-bold">{order.customerName} <span className="text-sm text-gray-500">#{order.id}</span></h3><p className="text-gray-600">{order.address}</p><p className="text-sm text-gray-400">{order.date}</p></div>
                                <div className="text-right"><p className="text-2xl font-bold text-brand-green">{order.total} c</p><span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'preparing' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{order.status}</span></div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm">
                                <p className="font-bold mb-2">{t.order_items_title}:</p>
                                {order.items.map((i, idx) => (<div key={idx} className="flex justify-between border-b border-gray-200 last:border-0 py-1"><span>{i.name} x{i.quantity}</span><span>{i.price * i.quantity} c</span></div>))}
                            </div>
                            <div className="flex gap-2 justify-end">
                                {order.status === 'preparing' && <button onClick={() => handleAdminStatusChange(order.id, 'delivering')} className="flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-brand-darkGreen"><CheckCircle size={18} /> {t.admin_confirm_order}</button>}
                                <button onClick={() => handleAdminEditOrder(order.id)} className="flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-gray-600"><Edit size={18} /> Edit</button>
                                <button onClick={() => handleAdminStatusChange(order.id, 'cancelled')} className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"><Trash size={18} /> Cancel</button>
                            </div>
                        </div>
                    ))}
                    {allOrders.length === 0 && <p className="text-center text-gray-500 py-10">No active orders</p>}
                </div>
            </div>
            {isCartOpen && adminEditOrderId && <Cart items={allOrders.find(o => o.id === adminEditOrderId)?.items || []} onUpdateQuantity={(id, delta) => updateCartQuantity(id, delta)} onRemove={(id) => removeCartItem(id)} onConfirm={handleConfirmOrder} onClose={() => setIsCartOpen(false)} />}
        </div>
      );
  }

  if (viewState === 'COURIER_DASHBOARD') {
      const activeDelivery = allOrders.find(o => o.status === 'delivering');
      return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8"><h1 className="text-3xl font-bold text-gray-800">{t.courier_title}</h1><div className="bg-white px-4 py-2 rounded-lg shadow text-sm font-mono">{t.current_time}: {currentTime.toLocaleTimeString()}</div></div>
                {activeDelivery ? (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 bg-blue-50 border-b border-blue-100"><h2 className="text-xl font-bold text-brand-darkGreen mb-1">Current Delivery</h2><p className="text-gray-600 flex items-center gap-2"><MapPin size={16} /> {activeDelivery.address}</p><p className="text-gray-600 flex items-center gap-2"><UserIcon size={16} /> {activeDelivery.customerName} ({activeDelivery.receiverPhone})</p></div>
                        <div className="p-4"><BishkekMap courierLat={courierLocation.lat} courierLng={courierLocation.lng} userLat={activeDelivery.userLocation?.lat || 42.85} userLng={activeDelivery.userLocation?.lng || 74.62} status={activeDelivery.status} address={activeDelivery.address} /></div>
                        <div className="p-6 bg-gray-50 border-t flex justify-between items-center"><div><p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p><span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-sm"><Loader2 className="animate-spin" size={14} /> {t.courier_set_loc}</span></div><button onClick={() => confirmDelivery(activeDelivery.id)} className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-brand-darkGreen transition-all flex items-center gap-2"><CheckCircle size={20} /> {t.courier_confirm_del}</button></div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow border-dashed border-2 border-gray-200"><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4"><Clock size={32} className="text-gray-400" /></div><p className="text-gray-500 font-medium">No active deliveries</p><p className="text-sm text-gray-400 mt-1">Waiting for orders...</p></div>
                )}
            </div>
            {showCourierSuccess && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-fade-in shadow-2xl"><div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-green-600" /></div><h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2><p className="text-gray-600 mb-6">{t.courier_success}</p><button onClick={() => setShowCourierSuccess(false)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800">Close</button></div></div>)}
        </div>
      );
  }

  // --- STANDARD USER VIEWS ---
  return (
    <div className="min-h-screen bg-brand-light pb-20">
        <Header />
        
        {/* Full Screen Hero Section */}
        {viewState === 'MAIN' ? (
            <div className="w-full relative min-h-[85vh] overflow-hidden shadow-2xl mb-12">
                <div className="absolute inset-0"><div className="flex animate-scroll gap-0 min-w-[200%] h-full">{[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map((src, i) => (<img key={i} src={src} className="h-full w-1/5 object-cover" alt="Food background" />))}</div></div>
                <div className="absolute inset-0 bg-brand-green/80 mix-blend-multiply"></div>
                <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
                    <div className="flex flex-col items-center md:items-start text-white max-w-lg text-center md:text-left mb-8 md:mb-0 mt-10 md:mt-0">
                         <div className="transform hover:scale-105 transition-transform duration-300">
                             {/* Larger Avatar */}
                             <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl flex-shrink-0 bg-white mb-6">
                                <img src={KINAI_AVATAR_URL} alt="Kinai AI" className="w-full h-full object-cover" />
                             </div>
                         </div>
                         <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-md">{t.hero_title}</h1>
                         <h2 className="text-2xl md:text-3xl font-light opacity-90 mb-6">{t.hero_subtitle}</h2>
                         <p className="text-lg opacity-80 max-w-sm">{t.hero_desc}</p>
                    </div>
                    <div className="w-full md:w-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
                         <div onClick={() => setViewState('AI_HELP')} className="group cursor-pointer bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 transition-all hover:scale-105 flex items-center gap-4"><div className="bg-brand-green p-3 rounded-full text-white shadow-lg"><Search size={24} /></div><div className="text-white"><h3 className="font-bold text-lg">{t.help_me}</h3><p className="text-xs opacity-70">{t.help_desc}</p></div><ArrowRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity ml-auto" /></div>
                         <div onClick={() => setViewState('MENU_CATEGORIES')} className="group cursor-pointer bg-white hover:bg-gray-100 rounded-2xl p-4 transition-all hover:scale-105 flex items-center gap-4 shadow-lg"><div className="bg-gray-200 p-3 rounded-full text-gray-700"><Menu size={24} /></div><div className="text-gray-800"><h3 className="font-bold text-lg">{t.choose_myself}</h3><p className="text-xs opacity-70">{t.choose_desc}</p></div><ArrowRight className="text-gray-400 group-hover:text-brand-green transition-colors ml-auto" /></div>
                    </div>
                </div>
            </div>
        ) : viewState === 'CHAT' ? (
             <div className="flex h-[85vh] w-full overflow-hidden px-0 mx-0">
                {/* Left GIF - Visible on LG screens and up, spans remaining space, FLEX-1 */}
                <div className="hidden lg:block flex-1 h-full bg-gray-900 relative">
                    <img src={CHAT_SIDE_GIF_LEFT} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Left Banner" />
                </div>

                {/* Main Chat Window - Centered, fixed max width, no external margins to ensure edge contact */}
                <div className="w-full max-w-4xl h-full flex flex-col bg-white shadow-2xl relative z-10">
                    <img src={BG_CHAT} className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
                    <div className="bg-brand-green p-4 text-white flex items-center gap-3 relative z-10"><button onClick={() => setViewState('MAIN')}><ArrowLeft /></button><span className="font-bold">{t.chat}</span></div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
                        <div className="flex gap-4"><KinaiAvatar size="sm" /><div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[80%]"><p className="text-sm">{lang === 'RU' ? 'Привет! Я Кинай. Что вас интересует?' : 'Hi! I am Kinai. How can I help?'}</p></div></div>
                        {chatHistory.map((msg, i) => (<div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>{msg.role === 'model' && <KinaiAvatar size="sm" />}<div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-brand-green text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}><p>{msg.text}</p></div></div>))}
                        
                        {/* Kinai Typing Indicator */}
                        {isAiTyping && (
                            <div className="flex gap-4">
                                <KinaiAvatar size="sm" />
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none flex items-center gap-1 border border-gray-100 shadow-sm">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                    <span className="text-xs text-gray-400 ml-2">{t.kinai_typing}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-gray-50 border-t relative z-10">
                        <div className="flex gap-2"><input className="flex-1 p-3 rounded-xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green text-gray-800 placeholder-gray-400" placeholder={t.placeholder_chat} value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} /><button onClick={handleSendMessage} className="bg-brand-green text-white p-3 rounded-xl hover:bg-brand-darkGreen shadow-md"><Send size={20} /></button></div>
                    </div>
                </div>

                    {/* Right GIF - Visible on LG screens and up, spans remaining space, FLEX-1 */}
                <div className="hidden lg:block flex-1 h-full bg-gray-900 relative">
                    <img src={CHAT_SIDE_GIF_RIGHT} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Right Banner" />
                </div>
            </div>
        ) : (
            <main className="max-w-7xl mx-auto p-6">
                {viewState === 'MENU_CATEGORIES' && (
                    <div>
                        <button onClick={() => setViewState('MAIN')} className="mb-6 flex items-center text-gray-500 hover:text-brand-green"><ChevronLeft size={20} /> {t.back}</button>
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">{t.categories}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {CATEGORIES.map(cat => (
                                <div key={cat.id} onClick={() => { setActiveCategory(cat.id); setViewState('MENU_ITEMS'); }} className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all border-4 border-transparent hover:border-brand-green/20">
                                    <img src={cat.image} alt={cat.name_en} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                                        <span className="text-white text-3xl font-bold tracking-tight">{lang === 'RU' ? cat.name_ru : cat.name_en}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {viewState === 'MENU_ITEMS' && (
                    <div className="relative">
                        <div className="flex items-center gap-4 mb-6">
                            <button onClick={() => setViewState('MENU_CATEGORIES')} className="p-2 bg-white rounded-full shadow hover:bg-gray-100"><ChevronLeft size={20} /></button>
                            <h2 className="text-2xl font-bold capitalize text-gray-800">{CATEGORIES.find(c => c.id === activeCategory)?.[lang === 'RU' ? 'name_ru' : 'name_en']}</h2>
                        </div>

                        {activeCategory === 'drinks' && (
                             <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                                {DRINK_SUBCATEGORIES.map(sub => (
                                    <button key={sub.id} onClick={() => setActiveSubCategory(sub.id === activeSubCategory ? null : sub.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeSubCategory === sub.id ? 'bg-brand-green text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-green'}`}>{lang === 'RU' ? sub.name_ru : sub.name_en}</button>
                                ))}
                             </div>
                        )}
                        
                        <div className="flex gap-6">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {getDisplayedProducts().map(product => {
                                    const details = getProductDetails(product);
                                    return (
                                    <div 
                                        key={product.id} 
                                        className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 flex flex-col transform hover:-translate-y-1 relative"
                                    >
                                        <div className="h-48 overflow-hidden relative">
                                            <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-600">{product.calories} kcal</div>
                                            
                                            {/* Hover Tooltip Overlay (Popup Hint) */}
                                            <div className="absolute inset-0 bg-brand-green/95 bg-opacity-95 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col overflow-y-auto backdrop-blur-sm">
                                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/20">
                                                    <KinaiAvatar size="sm" className="scale-75 origin-left" />
                                                    <span className="font-bold text-sm">{t.tooltip_tip}</span>
                                                </div>
                                                <p className="text-sm italic mb-3">"{details.tip}"</p>
                                                <div className="mt-auto">
                                                    <p className="font-bold text-xs uppercase opacity-70 mb-1">{t.tooltip_ingredients}</p>
                                                    <ul className="text-xs space-y-1">
                                                        {details.ingredients.map((ing, i) => <li key={i}>• {ing}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col relative z-10 bg-white">
                                            <div className="flex justify-between items-start mb-2"><h3 className="font-bold text-lg leading-tight">{product.name}</h3><span className="font-bold text-brand-green">{product.price} c</span></div>
                                            <button onClick={() => addToCart(product)} className="w-full bg-brand-orange/10 text-brand-darkGreen font-bold py-3 rounded-xl hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center gap-2 mt-auto"><Plus size={18} /> {currentUser?.role === UserRole.ADMIN && adminEditOrderId ? t.add_to_order : t.add_to_cart}</button>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
                )}

                {viewState === 'AI_HELP' && (
                    <div className="max-w-2xl mx-auto">
                        <button onClick={() => setViewState('MAIN')} className="mb-6 flex items-center text-gray-500 hover:text-brand-green"><ChevronLeft size={20} /> {t.back}</button>
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center mb-8">
                            <div className="flex justify-center mb-6"><KinaiAvatar size="lg" message={lang === 'RU' ? "Расскажите о ваших предпочтениях!" : "Tell me your preferences!"} /></div>
                            <div className="space-y-4 text-left">
                                <div><label className="block text-sm font-bold text-gray-700 mb-2">{t.diet_q1}</label><input type="text" className="w-full p-3 bg-gray-50 rounded-xl border-gray-200 focus:ring-2 focus:ring-brand-green" placeholder={lang === 'RU' ? "Например: Высокий белок, Веган..." : "e.g. High Protein, Vegan..."} value={dietPreferences.diet} onChange={e => setDietPreferences({...dietPreferences, diet: e.target.value})} /></div>
                                <div><label className="block text-sm font-bold text-gray-700 mb-2">{t.diet_q2}</label><input type="text" className="w-full p-3 bg-gray-50 rounded-xl border-gray-200 focus:ring-2 focus:ring-brand-green" placeholder={lang === 'RU' ? "Например: Орехи, Молоко..." : "e.g. Nuts, Dairy..."} value={dietPreferences.allergies} onChange={e => setDietPreferences({...dietPreferences, allergies: e.target.value})} /></div>
                                <button onClick={() => loadRecommendations(false)} disabled={isAiLoading} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold shadow-lg hover:bg-brand-darkGreen mt-4 flex justify-center items-center gap-2">{isAiLoading ? <Loader2 className="animate-spin" /> : <Search size={20} />}{t.gen_recs}</button>
                            </div>
                        </div>
                        {recommendations.length > 0 && (
                            <div className="space-y-4 animate-fade-in">
                                <h3 className="text-xl font-bold text-gray-800 text-center mb-4">{lang === 'RU' ? 'Рекомендации для вас:' : 'Recommended for you:'}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recommendations.map(item => (
                                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center"><img src={item.image} className="w-20 h-20 rounded-lg object-cover" alt={item.name}/><div className="flex-1"><h4 className="font-bold">{item.name}</h4><p className="text-xs text-gray-500 mb-2">{item.calories} kcal</p><button onClick={() => addToCart(item)} className="text-xs bg-brand-orange text-white px-3 py-1 rounded hover:bg-brand-green transition-colors">{t.add_to_cart}</button></div></div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-6 pt-4 border-t border-gray-200"><button onClick={() => loadRecommendations(true)} disabled={isAiLoading} className="bg-white text-brand-green border-2 border-brand-green px-6 py-3 rounded-full font-bold hover:bg-brand-green hover:text-white transition-all flex items-center gap-2">{isAiLoading ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}{t.load_more}</button></div>
                                <div className="flex justify-center mt-8"><button onClick={() => setViewState('MENU_CATEGORIES')} className="text-gray-500 hover:text-gray-800 underline text-sm">{t.choose_myself}</button></div>
                            </div>
                        )}
                    </div>
                )}

                {viewState === 'CHECKOUT' && (
                    <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-xl">
                         <h2 className="text-2xl font-bold mb-6">{t.finalize}</h2>
                         <div className="space-y-4">
                             <input type="text" placeholder={t.del_addr} className="w-full p-4 bg-gray-50 rounded-xl" value={checkoutData.address} onChange={e => setCheckoutData({...checkoutData, address: e.target.value})} />
                             {isCalculating ? (<p className="text-sm text-blue-500 flex items-center gap-2"><Loader2 className="animate-spin" size={14}/> Calculating distance...</p>) : deliveryCalc && (<div className="bg-blue-50 p-3 rounded-lg text-sm text-brand-darkGreen"><p className="font-bold flex items-center gap-2"><Clock size={14}/> {t.del_time}: {deliveryCalc.time}</p><p className="text-xs opacity-75">{t.distance_calc} {deliveryCalc.distance} km</p></div>)}
                             <input type="tel" placeholder={t.rec_phone} className="w-full p-4 bg-gray-50 rounded-xl" value={checkoutData.phone} onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})} />
                             <div className="flex justify-between font-bold text-xl py-4 border-t border-b"><span>Total:</span><span>{cart.reduce((s, i) => s + i.price * i.quantity, 0)} c</span></div>
                             <button onClick={finalizeOrder} disabled={!checkoutData.address || cart.length === 0} className="w-full bg-brand-green text-white py-4 rounded-xl font-bold hover:bg-brand-darkGreen disabled:opacity-50">{t.confirm_btn}</button>
                             <button onClick={() => setViewState('MAIN')} className="w-full text-gray-400 py-2 hover:text-gray-600">Cancel</button>
                         </div>
                    </div>
                )}
                
                {viewState === 'TRACKING' && activeOrder && (
                     <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                          <div className="bg-brand-green p-6 text-white text-center"><h2 className="text-2xl font-bold mb-2">{getStatusLabel(activeOrder.status)}</h2><p className="opacity-80">Order #{activeOrder.id}</p></div>
                          <div className="h-64 bg-gray-200 relative"><BishkekMap courierLat={courierLocation.lat} courierLng={courierLocation.lng} userLat={deliveryCalc?.lat || 42.85} userLng={deliveryCalc?.lng || 74.62} status={activeOrder.status} address={activeOrder.address} /></div>
                          <div className="p-6"><div className="flex items-center gap-4 mb-4"><KinaiAvatar size="sm" /><div className="bg-gray-100 p-3 rounded-xl rounded-tl-none text-sm">{activeOrder.status === 'preparing' ? (lang === 'RU' ? "Шеф-повар начал готовить!" : "The chef has started cooking!") : (lang === 'RU' ? "Курьер уже в пути. Скоро буду!" : "Courier is on the way. See you soon!")}</div></div><button onClick={() => setViewState('MAIN')} className="w-full border-2 border-brand-green text-brand-green py-3 rounded-xl font-bold hover:bg-brand-green hover:text-white transition-colors">{t.home}</button></div>
                     </div>
                )}

                {viewState === 'ORDER_HISTORY' && (
                    <div className="">
                        <div className="max-w-2xl mx-auto">
                            <button onClick={() => setViewState('MAIN')} className="mb-6 flex items-center text-gray-500 hover:text-brand-green"><ChevronLeft size={20} /> {t.back}</button>
                            <h2 className="text-2xl font-bold mb-6">{t.history_title}</h2>
                            <div className="space-y-4">
                                {allOrders.filter(o => o.customerUsername === currentUser?.username).length === 0 ? (
                                    <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><ShoppingBag size={24} className="text-gray-400"/></div>
                                        <p className="text-gray-500">{t.no_history}</p>
                                    </div>
                                ) : (
                                    allOrders.filter(o => o.customerUsername === currentUser?.username).map(order => (
                                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-center mb-2"><span className="font-bold text-lg">#{order.id}</span><span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{getStatusLabel(order.status)}</span></div>
                                            <p className="text-gray-500 text-sm mb-4">{order.date}</p>
                                            <div className="flex justify-between items-end"><span className="text-xl font-bold text-brand-green">{order.total} c</span><button onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)} className="text-brand-orange hover:text-brand-green flex items-center text-sm">{expandedOrderId === order.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}{lang === 'RU' ? ' Детали' : ' Details'}</button></div>
                                            {expandedOrderId === order.id && (<div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 p-4 rounded-lg">{order.items.map((item, idx) => (<div key={idx} className="flex justify-between text-sm py-1"><span>{item.name} x{item.quantity}</span><span>{item.price * item.quantity} c</span></div>))}</div>)}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        
                        {/* Food Gallery Collage - Full Width Edge to Edge */}
                    <div className="mt-16 w-screen ml-[calc(50%-50vw)]">
  <div className="text-center mb-6">
    <h3 className="text-xl font-bold tracking-[0.2em] text-gray-400 uppercase">
      {lang === 'RU' ? 'Вдохновение вкусом' : 'Taste Inspiration'}
    </h3>
  </div>

  {/* Внешний wrapper: фиксированная высота и обрезка */}
  <div className="w-full h-[400px] overflow-hidden min-h-0">
    {/* Сам grid: занимает всю высоту родителя */}
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full min-h-0">
      {/* Left big image */}
      <div className="relative group overflow-hidden h-full min-h-0">
        <img
          src={HISTORY_COLLAGE_IMAGES[0]}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 min-h-0 max-h-full"
          alt="Gallery Main"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
      </div>

      {/* Right 2x2: делим на 2 строки */}
      <div className="grid grid-cols-2 grid-rows-2 h-full min-h-0">
        <div className="relative group overflow-hidden h-full min-h-0">
          <img
            src={HISTORY_COLLAGE_IMAGES[1]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 min-h-0 max-h-full"
            alt="Gallery 1"
          />
        </div>
        <div className="relative group overflow-hidden h-full min-h-0">
          <img
            src={HISTORY_COLLAGE_IMAGES[2]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 min-h-0 max-h-full"
            alt="Gallery 2"
          />
        </div>
        <div className="relative group overflow-hidden h-full min-h-0">
          <img
            src={HISTORY_COLLAGE_IMAGES[3]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 min-h-0 max-h-full"
            alt="Gallery 3"
          />
        </div>
        <div className="relative group overflow-hidden h-full min-h-0">
          <img
            src={HISTORY_COLLAGE_IMAGES[4]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 min-h-0 max-h-full"
            alt="Gallery 4"
          />
        </div>
      </div>
    </div>
  </div>
</div>
                    </div>
                )}
                
                {viewState === 'ABOUT' && (
                    <div className="max-w-4xl mx-auto">
                        <button onClick={() => setViewState('MAIN')} className="mb-6 flex items-center text-gray-500 hover:text-brand-green"><ChevronLeft size={20} /> {t.back}</button>
                        <div className="relative rounded-3xl overflow-hidden h-64 mb-8 shadow-xl">
                            {/* PLACE IMAGE LINK FOR 'ABOUT KINAI' HERE */}
                            <img src={BG_ABOUT} className="w-full h-full object-cover" alt="About Kinai" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><h1 className="text-4xl font-bold text-white tracking-wide">{t.about_title}</h1></div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"><KinaiAvatar size="lg" className="mb-6" /><h2 className="text-2xl font-bold text-brand-green mb-4">Kinai AI</h2><p className="text-gray-600 leading-relaxed">{t.about_desc}</p></div>
                             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                 <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-brand-green"><MapPin size={32} /></div>
                                 <h2 className="text-2xl font-bold text-brand-green mb-4">{t.loc_title}</h2>
                                 <p className="text-gray-600 mb-2">{t.loc_desc}</p>
                                 <p className="font-bold text-gray-800 mb-4">{t.loc_addr}</p>
                                 {/* Google Maps Embed */}
                                 <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
                                    <iframe 
                                        src="https://maps.google.com/maps?q=Maldybaeva+34B,+Bishkek&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                                        width="100%" height="100%" frameBorder="0" style={{border:0}} allowFullScreen
                                    ></iframe>
                                 </div>
                             </div>
                        </div>
                        {/* Feedback Form Section */}
                       <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center">
    <h2 className="text-2xl font-bold text-brand-green mb-2">{t.form_title}</h2>
    <p className="text-gray-500 mb-6">{t.form_desc}</p>

    <div className="w-full h-[600px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
        <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScF0ZbZHa6sH9wSc_q8LWniU-VssxAOhP3CeMHbhOjVwrSySA/viewform?embedded=true"
            className="w-full h-full rounded-xl"
            style={{ border: "none" }}
            scrolling="auto"
        ></iframe>
    </div>
</div>
                    </div>
                )}
            </main>
        )}
        
        {notification && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/95 backdrop-blur-md text-white px-8 py-6 rounded-2xl shadow-2xl z-[100] flex flex-col items-center gap-3 animate-fade-in border border-gray-700 min-w-[320px] text-center">
                <div className="bg-green-500 p-2 rounded-full mb-1"><CheckCircle size={32} className="text-white" /></div>
                <span className="font-bold text-lg">{notification}</span>
            </div>
        )}

        {isCartOpen && <Cart items={cart} onUpdateQuantity={updateCartQuantity} onRemove={removeCartItem} onConfirm={handleConfirmOrder} onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}