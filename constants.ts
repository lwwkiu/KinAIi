

import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'salads', name_en: 'Salads', name_ru: 'Салаты', image: 'https://i.pinimg.com/1200x/17/03/47/1703474e2d84159e317fcb3ce560df18.jpg' },
  { id: 'appetizers', name_en: 'Appetizers', name_ru: 'Холодные закуски', image: 'https://i.pinimg.com/1200x/14/f8/66/14f866edb48b517c0243982c20c8fe7d.jpg' },
  { id: 'first_courses', name_en: 'First Courses', name_ru: 'Первые блюда', image: 'https://i.pinimg.com/736x/0f/96/80/0f9680760b505ef467dfd66e8a52125d.jpg' },
  { id: 'second_courses', name_en: 'Second Courses', name_ru: 'Вторые блюда', image: 'https://i.pinimg.com/736x/c3/9c/27/c39c27dfd3c62b2efdf1d7bc2514546e.jpg' },
  { id: 'drinks', name_en: 'Drinks', name_ru: 'Напитки', image: 'https://i.pinimg.com/736x/a2/a9/9a/a2a99acec13e5d91145279eac7a649cd.jpg' },
  { id: 'desserts', name_en: 'Desserts', name_ru: 'Десерты', image: 'https://i.pinimg.com/736x/15/37/37/153737ba706c3d875fec8ad98c00a244.jpg' },
];

export const DRINK_SUBCATEGORIES = [
  { id: 'hot_drinks', name_en: 'Hot Drinks', name_ru: 'Горячие напитки' },
  { id: 'non_alc_cocktails', name_en: 'Non-alcoholic Cocktails', name_ru: 'Безалкогольные коктейли' },
  { id: 'alc_cocktails', name_en: 'Alcoholic Cocktails', name_ru: 'Алкогольные коктейли' },
  { id: 'alc_drinks', name_en: 'Alcoholic Drinks', name_ru: 'Алкогольные напитки' },
  { id: 'carbonated', name_en: 'Carbonated Drinks', name_ru: 'Газированные напитки' },
  { id: 'non_carbonated', name_en: 'Non-carbonated Drinks', name_ru: 'Негазированные напитки' },
];

export const MOCK_PRODUCTS: Product[] = [
  // --- SALADS (10 items) ---
  { id: 's1', name: 'Салат Цезарь', category: 'salads', price: 450, calories: 450, image: 'https://i.pinimg.com/736x/cc/52/a2/cc52a2bd0c1ab7661ac6b143b0761124.jpg' },
  { id: 's2', name: 'Греческий салат', category: 'salads', price: 380, calories: 320, image: 'https://i.pinimg.com/736x/68/7b/03/687b03c8734028b282e2efeeaba36b3f.jpg' },
  { id: 's3', name: 'Боул с киноа', category: 'salads', price: 520, calories: 500, image: 'https://i.pinimg.com/1200x/82/76/87/82768719870f901177fd93e4112abcd3.jpg' },
  { id: 's4', name: 'Салат Капрезе', category: 'salads', price: 420, calories: 350, image: 'https://i.pinimg.com/736x/df/c1/14/dfc114e284edb8d081741fd2d0fd9ddd.jpg' },
  { id: 's5', name: 'Салат Вальдорф', category: 'salads', price: 400, calories: 420, image: 'https://i.pinimg.com/736x/2a/6d/97/2a6d9787cc7041e7d7dd9194ebd6f1ec.jpg' },
  { id: 's6', name: 'Салат Нисуаз', category: 'salads', price: 550, calories: 480, image: 'https://i.pinimg.com/1200x/79/80/a4/7980a40167effe555ccb2a1651a6cb6b.jpg' },
  { id: 's7', name: 'Кобб салат', category: 'salads', price: 480, calories: 550, image: 'https://i.pinimg.com/1200x/f9/fd/e8/f9fde867f2443b6562bccae8452d049b.jpg' },
  { id: 's8', name: 'Азиатский салат', category: 'salads', price: 350, calories: 250, image: 'https://i.pinimg.com/736x/89/21/b4/8921b47411015622fe0715e8e36a5357.jpg' },
  { id: 's9', name: 'Фруктовый салат', category: 'salads', price: 300, calories: 150, image: 'https://i.pinimg.com/1200x/fe/1c/08/fe1c08cdd2a4ca58bd89601dc9ea9f5d.jpg' },
  { id: 's10', name: 'Свекла с рукколой', category: 'salads', price: 380, calories: 300, image: 'https://i.pinimg.com/736x/03/58/62/0358620b91678ccfde56e4dad41bd3e4.jpg' },

  // --- APPETIZERS (10 items) ---
  { id: 'a1', name: 'Брускетта', category: 'appetizers', price: 280, calories: 200, image: 'https://i.pinimg.com/736x/9d/d4/75/9dd475ff64b9b04ff3e88a1cf6485f63.jpg' },
  { id: 'a2', name: 'Кальмары в кляре', category: 'appetizers', price: 420, calories: 400, image: 'https://i.pinimg.com/736x/39/ba/49/39ba49a40416369f32b35a3e7a3bf9bc.jpg' },
  { id: 'a3', name: 'Фаршированные грибы', category: 'appetizers', price: 350, calories: 250, image: 'https://i.pinimg.com/1200x/aa/e0/68/aae0685cdca55b3ece2f088f8a16f393.jpg' },
  { id: 'a4', name: 'Чесночный хлеб', category: 'appetizers', price: 150, calories: 350, image: 'https://i.pinimg.com/736x/46/21/16/4621165ca6374303522ce1e5a350545b.jpg' },
  { id: 'a5', name: 'Куриные крылышки', category: 'appetizers', price: 450, calories: 600, image: 'https://i.pinimg.com/1200x/02/73/fc/0273fc5572e7300d8b9917f7e24a22ed.jpg' },
  { id: 'a6', name: 'Спринг-роллы', category: 'appetizers', price: 320, calories: 220, image: 'https://i.pinimg.com/736x/57/16/16/571616efee0c936a787963050a2fbba5.jpg' },
  { id: 'a7', name: 'Начос', category: 'appetizers', price: 380, calories: 700, image: 'https://i.pinimg.com/736x/be/83/02/be83024b77f372f647ef893bcf6df5eb.jpg' },
  { id: 'a8', name: 'Сырные палочки', category: 'appetizers', price: 300, calories: 500, image: 'https://i.pinimg.com/736x/59/9b/94/599b94525dea1e7c99a5e0d4b5e8a7d2.jpg' },
  { id: 'a9', name: 'Тарелка хумуса', category: 'appetizers', price: 350, calories: 300, image: 'https://i.pinimg.com/1200x/20/0c/b0/200cb0bdc026a81c6fd39034b3c4d19b.jpg' },
  { id: 'a10', name: 'Креветочный коктейль', category: 'appetizers', price: 550, calories: 180, image: 'https://i.pinimg.com/1200x/59/e5/c8/59e5c87bb3d47950ac4690b06324e6d1.jpg' },

  // --- FIRST COURSES (10 items) ---
  { id: 'f1', name: 'Томатный суп', category: 'first_courses', price: 250, calories: 200, image: 'https://i.pinimg.com/736x/04/2d/7c/042d7cdc2c1c422aa0bb961bf0a7eb09.jpg' },
  { id: 'f2', name: 'Куриная лапша', category: 'first_courses', price: 280, calories: 250, image: 'https://i.pinimg.com/736x/5d/54/52/5d545288c331dd1370a1bb315dedf769.jpg' },
  { id: 'f3', name: 'Грибной крем-суп', category: 'first_courses', price: 300, calories: 350, image: 'https://i.pinimg.com/1200x/4a/10/af/4a10af9989ccde657750eaa70b6fd638.jpg' },
  { id: 'f4', name: 'Минестроне', category: 'first_courses', price: 260, calories: 180, image: 'https://i.pinimg.com/1200x/8f/2f/7b/8f2f7b566dbb5c24fd9e7a67bbc299f5.jpg' },
  { id: 'f5', name: 'Луковый суп', category: 'first_courses', price: 320, calories: 400, image: 'https://i.pinimg.com/1200x/70/bb/96/70bb96fff2119e3295319d76a58890cf.jpg' },
  { id: 'f6', name: 'Чечевичный суп', category: 'first_courses', price: 250, calories: 220, image: 'https://i.pinimg.com/736x/a3/a2/b6/a3a2b602c7119a7cdbdfc4211dba8151.jpg' },
  { id: 'f7', name: 'Тыквенный суп', category: 'first_courses', price: 270, calories: 190, image: 'https://i.pinimg.com/1200x/66/5b/05/665b05acc2d73baaec917c1bea12b1fe.jpg' },
  { id: 'f8', name: 'Борщ', category: 'first_courses', price: 300, calories: 250, image: 'https://i.pinimg.com/1200x/64/1b/a7/641ba74d717efa82b8c9b1eaffe4fe55.jpg' },
  { id: 'f9', name: 'Клэм-чаудер', category: 'first_courses', price: 350, calories: 450, image: 'https://i.pinimg.com/1200x/fb/5b/b5/fb5bb51b971e136679b6ac1848434758.jpg' },
  { id: 'f10', name: 'Гаспачо', category: 'first_courses', price: 280, calories: 150, image: 'https://i.pinimg.com/736x/1c/88/a8/1c88a8804d59633d928de54fcb690876.jpg' },

  // --- SECOND COURSES (10 items) ---
  { id: 'm1', name: 'Лосось на гриле', category: 'second_courses', price: 950, calories: 600, image: 'https://i.pinimg.com/1200x/77/de/b8/77deb85bf70e3ff7cbd998d671b828ae.jpg' },
  { id: 'm2', name: 'Стейк с фри', category: 'second_courses', price: 1100, calories: 850, image: 'https://i.pinimg.com/1200x/b7/0f/fc/b70ffcf7172d9e76492e60bb030f5054.jpg' },
  { id: 'm3', name: 'Запеченная курица', category: 'second_courses', price: 650, calories: 550, image: 'https://i.pinimg.com/1200x/fb/88/f8/fb88f817134ed2aeaf35cf54a7dc8456.jpg' },
  { id: 'm4', name: 'Паста Карбонара', category: 'second_courses', price: 550, calories: 700, image: 'https://i.pinimg.com/1200x/5d/a4/1c/5da41c8ac3c168fae33700f826fb80ee.jpg' },
  { id: 'm5', name: 'Веганбургер', category: 'second_courses', price: 480, calories: 450, image: 'https://i.pinimg.com/736x/ee/d8/3a/eed83a8729a847dac2cc97ac717ea514.jpg' },
  { id: 'm6', name: 'Бараньи отбивные', category: 'second_courses', price: 1200, calories: 800, image: 'https://i.pinimg.com/1200x/dc/45/58/dc4558ae3d96b4f0965e00359fa8ab77.jpg' },
  { id: 'm7', name: 'Ризотто', category: 'second_courses', price: 600, calories: 500, image: 'https://i.pinimg.com/1200x/ea/bc/4f/eabc4f52759e17e6da2f2c6c89947969.jpg' },
  { id: 'm8', name: 'Говядина вок', category: 'second_courses', price: 700, calories: 600, image: 'https://i.pinimg.com/1200x/b6/cc/51/b6cc51abbe711e3cfa9ffd82e32bc37d.jpg' },
  { id: 'm9', name: 'Фиш энд Чипс', category: 'second_courses', price: 500, calories: 900, image: 'https://i.pinimg.com/736x/06/14/97/0614970f080bcb704cd4441058ad9750.jpg' },
  { id: 'm10', name: 'Такос', category: 'second_courses', price: 450, calories: 400, image: 'https://i.pinimg.com/1200x/66/6c/2b/666c2b4f1752915dd14d21e3f652c083.jpg' },

  // --- DRINKS (36 items - 6 per subcategory) ---
  
  // Hot Drinks (6)
  { id: 'hd1', name: 'Эспрессо', category: 'drinks', subcategory: 'hot_drinks', price: 120, calories: 5, image: 'https://i.pinimg.com/1200x/6a/e4/82/6ae482a0690b8ca89fd3acd554a36d66.jpg' },
  { id: 'hd2', name: 'Латте', category: 'drinks', subcategory: 'hot_drinks', price: 180, calories: 150, image: 'https://i.pinimg.com/736x/45/8a/d8/458ad8344057604c23891f190a7cf2ce.jpg' },
  { id: 'hd3', name: 'Капучино', category: 'drinks', subcategory: 'hot_drinks', price: 180, calories: 120, image: 'https://i.pinimg.com/1200x/bb/15/44/bb154494fe357e809ea8eb6884dc0733.jpg' },
  { id: 'hd4', name: 'Американо', category: 'drinks', subcategory: 'hot_drinks', price: 140, calories: 5, image: 'https://i.pinimg.com/736x/26/a4/c0/26a4c021354f82a9e0c7e6f606fce6dd.jpg' },
  { id: 'hd5', name: 'Горячий шоколад', category: 'drinks', subcategory: 'hot_drinks', price: 200, calories: 300, image: 'https://i.pinimg.com/1200x/e9/b1/43/e9b1431a068ab4e62feb437ffff3c1aa.jpg' },
  { id: 'hd6', name: 'Зеленый чай', category: 'drinks', subcategory: 'hot_drinks', price: 100, calories: 0, image: 'https://i.pinimg.com/736x/6c/eb/6b/6ceb6b8f89a3bc7f003632cee65c6889.jpg' },

  // Non-Alcoholic Cocktails (6)
  { id: 'na1', name: 'Верджин Мохито', category: 'drinks', subcategory: 'non_alc_cocktails', price: 250, calories: 150, image: 'https://i.pinimg.com/736x/97/f2/fb/97f2fb1f4795f25127ae6e3b7dc63f69.jpg' },
  { id: 'na2', name: 'Ширли Темпл', category: 'drinks', subcategory: 'non_alc_cocktails', price: 220, calories: 180, image: 'https://i.pinimg.com/1200x/30/9d/7e/309d7ee9d7a39e79609165c8d5e4eb63.jpg' },
  { id: 'na3', name: 'Ягодный всплеск', category: 'drinks', subcategory: 'non_alc_cocktails', price: 260, calories: 160, image: 'https://i.pinimg.com/1200x/68/59/8a/68598addb1b95781c628e82e8e7a8092.jpg' },
  { id: 'na4', name: 'Огуречный кулер', category: 'drinks', subcategory: 'non_alc_cocktails', price: 200, calories: 90, image: 'https://i.pinimg.com/1200x/3b/fb/9e/3bfb9e70df8e053ca4313da157374a64.jpg' },
  { id: 'na5', name: 'Цитрусовый физ', category: 'drinks', subcategory: 'non_alc_cocktails', price: 200, calories: 120, image: 'https://i.pinimg.com/1200x/78/55/69/785569e614db529bd3e936f147f9f9e5.jpg' },
  { id: 'na6', name: 'Тропический пунш', category: 'drinks', subcategory: 'non_alc_cocktails', price: 240, calories: 200, image: 'https://i.pinimg.com/736x/29/19/38/2919388082edaf26d1d7db9223dd834f.jpg' },

  // Alcoholic Cocktails (6)
  { id: 'ac1', name: 'Маргарита', category: 'drinks', subcategory: 'alc_cocktails', price: 450, calories: 250, image: 'https://i.pinimg.com/736x/86/88/4a/86884a536fed5dadf5f9616b2baa82c6.jpg' },
  { id: 'ac2', name: 'Олд Фэшн', category: 'drinks', subcategory: 'alc_cocktails', price: 500, calories: 220, image: 'https://i.pinimg.com/1200x/80/9d/6e/809d6e07994cae1e1943cf762fe2f843.jpg' },
  { id: 'ac3', name: 'Космополитен', category: 'drinks', subcategory: 'alc_cocktails', price: 480, calories: 200, image: 'https://i.pinimg.com/736x/4b/38/d1/4b38d1e13de17e88df61a4297d39bf8c.jpg' },
  { id: 'ac4', name: 'Мохито', category: 'drinks', subcategory: 'alc_cocktails', price: 450, calories: 180, image: 'https://i.pinimg.com/1200x/9c/84/f7/9c84f7e6505efbb37fc5d5c2555211fb.jpg' },
  { id: 'ac5', name: 'Мартини', category: 'drinks', subcategory: 'alc_cocktails', price: 550, calories: 210, image: 'https://i.pinimg.com/736x/ec/fc/2d/ecfc2d397177081cd100b5a7838d5a03.jpg' },
  { id: 'ac6', name: 'Негрони', category: 'drinks', subcategory: 'alc_cocktails', price: 520, calories: 190, image: 'https://i.pinimg.com/1200x/53/6e/de/536ede7a8ea1a9b080d1fbfaa6fc27ff.jpg' },

  // Alcoholic Drinks (6)
  { id: 'ad1', name: 'Красное вино', category: 'drinks', subcategory: 'alc_drinks', price: 400, calories: 125, image: 'https://i.pinimg.com/1200x/b9/48/ac/b948acdd96d7270fb9f37982e5b8e131.jpg' },
  { id: 'ad2', name: 'Белое вино', category: 'drinks', subcategory: 'alc_drinks', price: 400, calories: 120, image: 'https://i.pinimg.com/1200x/49/a9/e6/49a9e6586e37627ac229e82a1471117f.jpg' },
  { id: 'ad3', name: 'Крафтовое пиво', category: 'drinks', subcategory: 'alc_drinks', price: 300, calories: 200, image: 'https://i.pinimg.com/736x/f6/b4/2a/f6b42a2ddc6c20b86d033402acf3f164.jpg' },
  { id: 'ad4', name: 'Стаут', category: 'drinks', subcategory: 'alc_drinks', price: 350, calories: 250, image: 'https://i.pinimg.com/736x/5a/25/2f/5a252f4238f9f7af57dc5be1160f7bc2.jpg' },
  { id: 'ad5', name: 'Виски шот', category: 'drinks', subcategory: 'alc_drinks', price: 250, calories: 100, image: 'https://i.pinimg.com/originals/3b/3f/08/3b3f08ac0db120d9abde862746786bdc.gif' },
  { id: 'ad6', name: 'Водка шот', category: 'drinks', subcategory: 'alc_drinks', price: 200, calories: 95, image: 'https://i.pinimg.com/736x/cd/a9/b8/cda9b8e3a4cc50cd70fc5a213b1453f4.jpg' },

  // Carbonated (6)
  { id: 'cd1', name: 'Кола', category: 'drinks', subcategory: 'carbonated', price: 100, calories: 140, image: 'https://i.pinimg.com/736x/73/d3/36/73d3360c260cb8c120b9f3ded44619fa.jpg' },
  { id: 'cd2', name: 'Лимон Лайм', category: 'drinks', subcategory: 'carbonated', price: 100, calories: 130, image: 'https://i.pinimg.com/736x/6f/dc/f7/6fdcf75722210395c0c9c93fa7f2e82b.jpg' },
  { id: 'cd3', name: 'Апельсиновая газировка', category: 'drinks', subcategory: 'carbonated', price: 100, calories: 150, image: 'https://i.pinimg.com/736x/42/f7/7a/42f77aaa771fd3b3358b5173d84b4765.jpg' },
  { id: 'cd4', name: 'Имбирный эль', category: 'drinks', subcategory: 'carbonated', price: 120, calories: 120, image: 'https://i.pinimg.com/1200x/02/46/11/024611e245f5d6de046b8cb456fd4a51.jpg' },
  { id: 'cd5', name: 'Минеральная вода', category: 'drinks', subcategory: 'carbonated', price: 80, calories: 0, image: 'https://i.pinimg.com/736x/14/e9/41/14e9416ac799a28cf0d5a156ca86924d.jpg' },
  { id: 'cd6', name: 'Тоник', category: 'drinks', subcategory: 'carbonated', price: 110, calories: 100, image: 'https://i.pinimg.com/736x/0b/a4/af/0ba4af381b8f064a8916cf46bcd0490d.jpg' },

  // Non-carbonated (6)
  { id: 'nc1', name: 'Апельсиновый сок', category: 'drinks', subcategory: 'non_carbonated', price: 180, calories: 110, image: 'https://i.pinimg.com/736x/6a/3d/98/6a3d98f319fa590d8c3b57e963c1f064.jpg' },
  { id: 'nc2', name: 'Яблочный сок', category: 'drinks', subcategory: 'non_carbonated', price: 160, calories: 115, image: 'https://i.pinimg.com/1200x/b0/5e/d7/b05ed7a611493fa36ebef271d1c7a467.jpg' },
  { id: 'nc3', name: 'Холодный чай', category: 'drinks', subcategory: 'non_carbonated', price: 140, calories: 80, image: 'https://i.pinimg.com/736x/7e/f1/6d/7ef16de64be42e5382b4a54c501c01b2.jpg' },
  { id: 'nc4', name: 'Лимонад', category: 'drinks', subcategory: 'non_carbonated', price: 150, calories: 120, image: 'https://i.pinimg.com/736x/66/20/e5/6620e52493ef065ff830a1762990f1d1.jpg' },
  { id: 'nc5', name: 'Клюквенный морс', category: 'drinks', subcategory: 'non_carbonated', price: 160, calories: 130, image: 'https://i.pinimg.com/1200x/e5/ab/f8/e5abf87f2fe25e2c00374d245e9df19a.jpg' },
  { id: 'nc6', name: 'Вода без газа', category: 'drinks', subcategory: 'non_carbonated', price: 60, calories: 0, image: 'https://i.pinimg.com/736x/27/57/41/2757418888ef85bd03797a7345faeaae.jpg' },

  // --- DESSERTS (10 items) ---
  { id: 'ds1', name: 'Чизкейк', category: 'desserts', price: 250, calories: 400, image: 'https://i.pinimg.com/1200x/b1/c9/c0/b1c9c0d5b972484daa2fc79f52f0840f.jpg' },
  { id: 'ds2', name: 'Тирамису', category: 'desserts', price: 280, calories: 450, image: 'https://i.pinimg.com/1200x/96/2d/bf/962dbf7bf690d9822c84016dcb5a054f.jpg' },
  { id: 'ds3', name: 'Шоколадный торт', category: 'desserts', price: 240, calories: 500, image: 'https://i.pinimg.com/736x/a9/7c/ac/a97cac076d0336b950e6db7c4393aa7b.jpg' },
  { id: 'ds4', name: 'Мороженое', category: 'desserts', price: 180, calories: 250, image: 'https://i.pinimg.com/736x/78/17/f5/7817f5ba06797fabb423817fcdee2a4a.jpg' },
  { id: 'ds5', name: 'Яблочный пирог', category: 'desserts', price: 220, calories: 350, image: 'https://i.pinimg.com/736x/51/25/b0/5125b053de0e936e4f8e41cb627358f0.jpg' },
  { id: 'ds6', name: 'Брауни', category: 'desserts', price: 180, calories: 300, image: 'https://i.pinimg.com/736x/79/29/4b/79294b598f6b6db58f6e4c1bb31b235f.jpg' },
  { id: 'ds7', name: 'Панна Котта', category: 'desserts', price: 250, calories: 280, image: 'https://i.pinimg.com/736x/72/95/8b/72958bae89d810af3faaf275b6a93fb2.jpg' },
  { id: 'ds8', name: 'Макаронс', category: 'desserts', price: 300, calories: 200, image: 'https://i.pinimg.com/736x/9e/e4/ee/9ee4eea0e216b89342540a7e771f800f.jpg' },
  { id: 'ds9', name: 'Крем-брюле', category: 'desserts', price: 280, calories: 380, image: 'https://i.pinimg.com/1200x/bb/8d/54/bb8d545149d24dc471e1b48d8206bbec.jpg' },
  { id: 'ds10', name: 'Фруктовая тарталетка', category: 'desserts', price: 240, calories: 260, image: 'https://i.pinimg.com/1200x/75/88/d2/7588d23cecf88e0652ec3d09748fdc00.jpg' },
];

export const KINAI_AVATAR_URL = "https://i.pinimg.com/736x/26/a5/96/26a596fdb2763be367a168b134dbf4ea.jpg";

export const CAROUSEL_IMAGES = [
  "https://i.pinimg.com/1200x/35/0f/06/350f06ab7d77539b384a1b7e95a4b345.jpg",
  "https://i.pinimg.com/736x/b3/51/33/b35133e46d7e7e8714f0668e4deda278.jpg",
  "https://i.pinimg.com/1200x/81/63/3d/81633da08a83cffb258d4f8b9e6b35e4.jpg",
  "https://i.pinimg.com/736x/6e/ab/2f/6eab2f0cb6a9b65345c612f12a698820.jpg",
  "https://i.pinimg.com/originals/46/6b/f5/466bf5ec96ece035d5f78093b3875dde.gif",
  "https://i.pinimg.com/originals/76/f7/85/76f7850623f244c7cc6b1f03f91f306a.gif",
  "https://i.pinimg.com/originals/b6/9e/d6/b69ed6230cb42f4dc1131683c4945dc3.gif",
  "https://i.pinimg.com/originals/7b/be/44/7bbe441bdeeef3a4ca60bbe08eadfeed.gif",
  "https://i.pinimg.com/1200x/ab/cd/53/abcd53422074d713966c7486affa5838.jpg",
  "https://i.pinimg.com/originals/5d/1b/45/5d1b456077528018ad89ac45e50c0d98.gif"
];

// Images for Order History Collage (1 Large Left, 4 Small Right) - EDIT THESE LINKS TO CHANGE COLLAGE PHOTOS
export const HISTORY_COLLAGE_IMAGES = [
  "https://i.pinimg.com/1200x/71/af/f6/71aff6c1cc370f4f6ad677e31ca9d62c.jpg", // 1. Large Left
  "https://i.pinimg.com/736x/ff/f5/96/fff596fc1fc696091df8ec9d62a7abc0.jpg", // 2. Top Left (Small)
  "https://i.pinimg.com/1200x/dd/23/25/dd2325f7c10f9b51b09237fd895d95ff.jpg", // 3. Top Right (Small)
  "https://i.pinimg.com/1200x/b5/d1/b2/b5d1b2afdc7fe5d07f787fb9865f0732.jpg", // 4. Bottom Left (Small)
  "https://i.pinimg.com/736x/48/b9/b8/48b9b8bdd84c0d3bb3168a965cfc7e64.jpg"  // 5. Bottom Right (Small)
];

// Default side background (fallback)
export const SIDE_BG_IMAGE = "https://zefirka.club/uploads/posts/2022-09/1662224992_1-zefirka-club-p-yeda-na-svetlom-fone-1.jpg";

// Authorization page background
export const AUTH_BG_IMAGE = "https://img.freepik.com/premium-vector/vector-illustration-night-sky_43137-172.jpg?semt=ais_hybrid&w=740&q=80";

// Specific Minimalist Backgrounds for Views
export const BG_HISTORY = "https://i.pinimg.com/1200x/b2/87/1b/b2871b697858c634620067644265538e.jpg"; // Minimalist table setting/grey theme
export const BG_CHAT = "https://i.pinimg.com/1200x/57/54/1f/57541f5379207865c6978160293e506d.jpg"; // Minimalist clean desk/tech
export const BG_ABOUT = "https://i.pinimg.com/originals/1b/a1/98/1ba198f2a10e4ab7be59bde8bfec8baa.gif"; // Blurred restaurant interior

// Chat side banners (Vertical GIFs) - Using Kinai AI Animated Face
export const CHAT_SIDE_GIF_LEFT = "https://i.pinimg.com/originals/6e/52/4e/6e524eb6b73475b83544341b79b4d9fe.gif"; // Kinai AI with moving eye rings/HUD
export const CHAT_SIDE_GIF_RIGHT = "https://i.pinimg.com/originals/6e/52/4e/6e524eb6b73475b83544341b79b4d9fe.gif"; // Kinai AI with moving eye rings/HUD
