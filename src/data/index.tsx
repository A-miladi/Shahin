import { StaticImageData } from "next/image";
import Afogato from "../../public/images/Afogato.png";
import Americano from "../../public/images/Americano.png";
import Caramel from "../../public/images/Charamel.png";
import Herbal from "../../public/images/Herbal.png";
import IceLatte from "../../public/images/IceLatte.png";
import IceMocha from "../../public/images/IceMocha.png";
import Karak from "../../public/images/Karak.png";
import Latte from "../../public/images/Latte.png";
import Matcha from "../../public/images/Matcha.png";
import Mocha from "../../public/images/Mocha.png";
import Tea from "../../public/images/Tea.png";

export interface CoffeeItem {
  id: number;
  name: string;
  pName: string;
  image: StaticImageData;
  category: "Hot Drinks" | "Cold Drinks" | "Food" | "Snack";
  price: number;
  ingredients: string;
  pIngredients: string;
  description: string;
  pDescription: string;
  isPopular: boolean;
}

export const Images = {
  Afogato,
  Americano,
  Caramel,
  Herbal,
  IceLatte,
  IceMocha,
  Karak,
  Latte,
  Matcha,
  Mocha,
  Tea,
};

export const menuData: CoffeeItem[] = [
  {
    id: 1,
    name: "Espresso",
    pName: "اسپرسو",
    image: Images.Americano,
    category: "Hot Drinks",
    price: 50000,
    ingredients: "Rich espresso shot, dark roast",
    pIngredients: "یک شات اسپرسو غنی، رست تیره",
    description: "A perfect balance of rich espresso.",
    pDescription: "تعادلی کامل از اسپرسوی غنی و خوش‌طعم.",
    isPopular: true,
  },
  {
    id: 2,
    name: "Americano",
    pName: "آمریکانو",
    image: Images.Americano,
    category: "Hot Drinks",
    price: 60000,
    ingredients: "Espresso, hot water",
    pIngredients: "اسپرسو، آب گرم",
    description: "Smooth and bold Americano.",
    pDescription: "آمریکانوی ملایم و پرطعم.",
    isPopular: true,
  },
  {
    id: 3,
    name: "Cappuccino",
    pName: "کاپوچینو",
    image: Images.Latte,
    category: "Hot Drinks",
    price: 75000,
    ingredients: "Espresso, steamed milk, milk foam",
    pIngredients: "اسپرسو، شیر بخارپز، کف شیر",
    description:
      "A perfect balance of rich espresso, steamed milk and velvety foam.",
    pDescription: "ترکیبی متعادل از اسپرسو، شیر بخارپز و کف مخملی.",
    isPopular: false,
  },
  {
    id: 4,
    name: "Latte",
    pName: "لاته",
    image: Images.Latte,
    category: "Hot Drinks",
    price: 80000,
    ingredients: "Espresso, steamed milk, light foam",
    pIngredients: "اسپرسو، شیر بخارپز، کف سبک",
    description: "Smooth and creamy latte.",
    pDescription: "لاته‌ای نرم و خامه‌ای.",
    isPopular: true,
  },
  {
    id: 5,
    name: "Mocha",
    pName: "موکا",
    image: Images.Mocha,
    category: "Hot Drinks",
    price: 85000,
    ingredients: "Espresso, chocolate, steamed milk",
    pIngredients: "اسپرسو، شکلات، شیر بخارپز",
    description: "A delightful blend of coffee and chocolate.",
    pDescription: "ترکیبی دلپذیر از قهوه و شکلات.",
    isPopular: false,
  },
  {
    id: 6,
    name: "Caramel Macchiato",
    pName: "کارامل ماکیاتو",
    image: Images.Caramel,
    category: "Hot Drinks",
    price: 90000,
    ingredients: "Espresso, caramel, steamed milk",
    pIngredients: "اسپرسو، کارامل، شیر بخارپز",
    description: "Sweet caramel mixed with rich espresso.",
    pDescription: "کارامل شیرین آمیخته با اسپرسوی غنی.",
    isPopular: false,
  },
  {
    id: 7,
    name: "Matcha Latte",
    pName: "ماچا لاته",
    image: Images.Matcha,
    category: "Hot Drinks",
    price: 95000,
    ingredients: "Matcha green tea, steamed milk",
    pIngredients: "چای سبز ماچا، شیر بخارپز",
    description: "Earthy matcha blended with creamy milk.",
    pDescription: "ماچای طبیعی ترکیب‌شده با شیر خامه‌ای.",
    isPopular: false,
  },
  {
    id: 8,
    name: "Ice Latte",
    pName: "آیس لاته",
    image: Images.IceLatte,
    category: "Cold Drinks",
    price: 85000,
    ingredients: "Espresso, cold milk, ice",
    pIngredients: "اسپرسو، شیر سرد، یخ",
    description: "Refreshing iced latte for hot days.",
    pDescription: "آیس لاته‌ای خنک و نشاط‌آور برای روزهای گرم.",
    isPopular: true,
  },
  {
    id: 9,
    name: "Ice Mocha",
    pName: "آیس موکا",
    image: Images.IceMocha,
    category: "Cold Drinks",
    price: 90000,
    ingredients: "Espresso, chocolate, cold milk, ice",
    pIngredients: "اسپرسو، شکلات، شیر سرد، یخ",
    description: "Chilled mocha with a rich chocolate taste.",
    pDescription: "موکای خنک با طعم غنی شکلات.",
    isPopular: false,
  },
  {
    id: 10,
    name: "Afogato",
    pName: "آفوگاتو",
    image: Images.Afogato,
    category: "Cold Drinks",
    price: 100000,
    ingredients: "Vanilla ice cream, hot espresso",
    pIngredients: "بستنی وانیلی، اسپرسو داغ",
    description: "A delightful mix of hot espresso over cold ice cream.",
    pDescription: "ترکیبی لذت‌بخش از اسپرسوی داغ روی بستنی سرد.",
    isPopular: false,
  },
  {
    id: 11,
    name: "Karak Tea",
    pName: "چای کرک",
    image: Images.Karak,
    category: "Hot Drinks",
    price: 45000,
    ingredients: "Black tea, milk, cardamom, sugar",
    pIngredients: "چای سیاه، شیر، هل، شکر",
    description: "Traditional Middle Eastern milk tea.",
    pDescription: "چای شیری سنتی خاورمیانه.",
    isPopular: false,
  },
  {
    id: 12,
    name: "Herbal Tea",
    pName: "چای گیاهی",
    image: Images.Herbal,
    category: "Hot Drinks",
    price: 40000,
    ingredients: "Mixed herbs, hot water",
    pIngredients: "گیاهان دارویی مخلوط، آب گرم",
    description: "A soothing blend of herbal tea.",
    pDescription: "ترکیبی آرام‌بخش از چای گیاهی.",
    isPopular: false,
  },
  {
    id: 13,
    name: "Tea",
    pName: "چای",
    image: Images.Tea,
    category: "Hot Drinks",
    price: 30000,
    ingredients: "Black tea, hot water",
    pIngredients: "چای سیاه، آب گرم",
    description: "Classic hot black tea.",
    pDescription: "چای سیاه داغ کلاسیک.",
    isPopular: false,
  },
];
