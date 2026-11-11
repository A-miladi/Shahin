export type MenuItem = [
  name: string,
  pName: string,
  image: string,
];

interface MenuCategory {
  title: string;
  pTitle: string;
  items: MenuItem[];
}

interface MenuGroup {
  title: string;
  pTitle: string;
  categories: MenuCategory[];
}

export const menuGroups: MenuGroup[] = [
  {
    title: "Cold Bar",
    pTitle: "بار سرد",
    categories: [
      {
        title: "Espresso-Based",
        pTitle: "پایه اسپرسو",
        items: [
          ["Iced Americano", "آیس آمریکانو", "/images/menu/01-iced-americano.webp"],
          ["Iced Latte", "آیس لته", "/images/menu/02-iced-latte.webp"],
          ["Iced Mocha", "آیس موکا", "/images/menu/03-iced-mocha.webp"],
          ["Iced Caramel Macchiato", "آیس کارامل ماکیاتو", "/images/menu/04-iced-caramel-macchiato.webp"],
          ["Cold Brew", "کلد برو", "/images/menu/05-cold-brew.webp"],
          ["Affogato", "آفوگاتو", "/images/menu/06-affogato.webp"],
        ],
      },
      {
        title: "Cold Drinks",
        pTitle: "نوشیدنی سرد",
        items: [
          ["Iced Matcha Latte", "آیس ماچا لته", "/images/menu/iced-matcha-latte.webp"],
        ],
      },
      {
        title: "Smoothies",
        pTitle: "اسموتی",
        items: [
          ["Tropical Mango", "ترپیکال انبه", "/images/menu/07-tropical-mango.webp"],
          ["Apricot", "آپریکات", "/images/menu/08-apricot.webp"],
          ["Red Berry", "رد بری", "/images/menu/09-red-berry.webp"],
        ],
      },
      {
        title: "Mocktails",
        pTitle: "ماکتیل",
        items: [
          ["Mojito", "موهیتو", "/images/menu/10-mojito.webp"],
          ["Lemonade", "لیموناد", "/images/menu/11-lemonade.webp"],
          ["Blue Sky", "بلو اسکای", "/images/menu/12-blue-sky.webp"],
          ["Red Summer", "رد سامر", "/images/menu/13-red-summer.webp"],
          ["Piña Colada", "پینا کولادا", "/images/menu/14-pina-colada.webp"],
          ["Sunrise", "سان رایز", "/images/menu/15-sunrise.webp"],
          ["Bubble Gum", "بابل‌گام", "/images/menu/16-bubble-gum.webp"],
          ["Margarita", "مارگاریتا", "/images/menu/17-margarita.webp"],
        ],
      },
      {
        title: "Milkshakes",
        pTitle: "میلک‌شیک",
        items: [
          ["Chocolate", "شکلات", "/images/menu/18-chocolate.webp"],
          ["Vanilla Biscuit", "وانیل بیسکوئیت", "/images/menu/19-vanilla-biscuit.webp"],
          ["Lotus", "لوتوس", "/images/menu/20-lotus.webp"],
          ["Peanut", "بادام زمینی", "/images/menu/21-peanut.webp"],
          ["Coconut", "نارگیل", "/images/menu/22-coconut.webp"],
          ["Date & Tahini", "خرما ارده", "/images/menu/23-date-tahini.webp"],
        ],
      },
    ],
  },
  {
    title: "Hot Bar",
    pTitle: "بار گرم",
    categories: [
      {
        title: "Espresso-Based",
        pTitle: "پایه اسپرسو",
        items: [
          ["Robusta Espresso + Mineral Water", "اسپرسو روبوستا + آب معدنی", "/images/menu/24-robusta-espresso-mineral-water.webp"],
          ["50/50 Espresso + Mineral Water", "اسپرسو ۵۰–۵۰ + آب معدنی", "/images/menu/25-50-50-espresso-mineral-water.webp"],
          ["Arabica Espresso + Mineral Water", "اسپرسو عربیکا + آب معدنی", "/images/menu/26-arabica-espresso-mineral-water.webp"],
          ["Americano", "آمریکانو", "/images/menu/27-americano.webp"],
          ["Macchiato", "ماکیاتو", "/images/menu/28-macchiato.webp"],
          ["Espresso con Panna", "کُن پانا", "/images/menu/29-espresso-con-panna.webp"],
          ["Latte", "لاته", "/images/menu/30-latte.webp"],
          ["Mocha", "موکا", "/images/menu/31-mocha.webp"],
          ["Cappuccino", "کاپوچینو", "/images/menu/32-cappuccino.webp"],
        ],
      },
      {
        title: "Hot Drinks",
        pTitle: "گرم‌نوش",
        items: [
          ["Pistachio & Saffron Milk", "شیر پسته زعفران", "/images/menu/33-pistachio-saffron-milk.webp"],
          ["Milk with Cream & Walnut", "شیر خامه گردو", "/images/menu/34-milk-with-cream-walnut.webp"],
          ["Caramel Biscuit Milk", "شیر کارامل بیسکوئیت", "/images/menu/35-caramel-biscuit-milk.webp"],
          ["Coconut Milk", "شیر نارگیل", "/images/menu/36-coconut-milk.webp"],
          ["Gulf-Style Saffron Masala", "ماسالا خلیجی زعفرانی", "/images/menu/37-gulf-style-saffron-masala.webp"],
          ["Hot Chocolate", "هات چاکلت", "/images/menu/38-hot-chocolate.webp"],
          ["Dark Chocolate", "دارک چاکلت", "/images/menu/39-dark-chocolate.webp"],
          ["White Chocolate", "وایت چاکلت", "/images/menu/40-white-chocolate.webp"],
          ["Masala", "ماسالا", "/images/menu/41-masala.webp"],
          ["Chocolate Masala", "ماسالا چاکلت", "/images/menu/42-chocolate-masala.webp"],
          ["Chai Latte", "چای لاته", "/images/menu/43-chai-latte.webp"],
          ["Matcha Latte", "ماچا لته", "/images/menu/matcha-latte.webp"],
          ["Nescafé with Milk", "شیر نسکافه", "/images/menu/44-nescafe-with-milk.webp"],
          ["Chocolate Milk", "شیر کاکائو", "/images/menu/45-chocolate-milk.webp"],
          ["Turkish Coffee", "ترک", "/images/menu/46-turkish-coffee.webp"],
        ],
      },
      {
        title: "Tea & Herbal Infusions",
        pTitle: "دمنوش",
        items: [
          ["Relaxation Blend", "آرامش", "/images/menu/47-relaxation-blend.webp"],
          ["Persian Borage", "گل گاوزبان", "/images/menu/48-persian-borage.webp"],
          ["Persian Borage & Lemon Verbena", "گل گاوزبان، به‌لیمو", "/images/menu/49-persian-borage-lemon-verbena.webp"],
          ["Thyme", "آویشن", "/images/menu/50-thyme.webp"],
          ["Thyme & Lemon Verbena", "آویشن، به‌لیمو", "/images/menu/51-thyme-lemon-verbena.webp"],
          ["Lemon Verbena", "به‌لیمو", "/images/menu/52-lemon-verbena.webp"],
          ["Hibiscus Tea", "چای ترش", "/images/menu/53-hibiscus-tea.webp"],
          ["Green Tea", "چای سبز", "/images/menu/54-green-tea.webp"],
          ["Saffron Tea", "چای زعفران", "/images/menu/55-saffron-tea.webp"],
          ["Brewed Tea (Cardamom, Cinnamon & Ginger)", "چای دمی (هل، دارچین، زنجبیل)", "/images/menu/56-brewed-tea-cardamom-cinnamon-ginger.webp"],
        ],
      },
      {
        title: "Brewed Coffee",
        pTitle: "دمی",
        items: [
          ["V60", "V60", "/images/menu/57-v60.webp"],
          ["Chemex", "کمکس", "/images/menu/58-chemex.webp"],
          ["AeroPress", "ایروپرس", "/images/menu/59-aeropress.webp"],
        ],
      },
      {
        title: "Syrups",
        pTitle: "سیروپ",
        items: [
          ["Caramel", "کارامل", "/images/menu/60-caramel.webp"],
          ["Coconut", "نارگیل", "/images/menu/61-coconut.webp"],
          ["Hazelnut", "فندق", "/images/menu/62-hazelnut.webp"],
          ["Irish", "آیریش", "/images/menu/63-irish.webp"],
        ],
      },
    ],
  },
];
