import Link from "next/link";
import {
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Explore",
      pTitle: "کاوش",
      links: [
        { name: "Home", pName: "خانه", href: "/" },
        { name: "Menu", pName: "منو", href: "/menu" },
      ],
    },
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-state-500 lg:pb-0 pb-24 overflow-hidden">
      {/* خط بالای فوتر */}
      <div className="absolute w-full h-[1px] top-0 left-0 bg-gradient-to-l from-transparent via-primary-500 to-transparent" />

      {/* درخشش طلایی */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-0 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* ==================== ستون ۱: لوگو ==================== */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="flex flex-col">
              <h3 className="text-3xl font-serif text-primary-400 tracking-wider">
                SHAHIN
              </h3>
              <span className="text-xs text-secondary-500 tracking-[0.3em] uppercase">
                Cafe & Experience
              </span>
            </Link>

            <p className="text-sm text-secondary-400 leading-relaxed max-w-xs">
              More than just coffee. A unique experience crafted with premium
              ingredients and passion since 2018.
            </p>

          </div>

          {/* ==================== ستون ۲: لینک‌ها ==================== */}
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <div className="flex w-full max-lg:justify-between items-center gap-1">
                <h4 className="text-base font-serif text-neutral-50">
                  {section.title}
                </h4>
                <span className="text-xs text-secondary-500">
                  {section.pTitle}
                </span>
              </div>

              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center rounded-xl lg:bg-transparent bg-primary-400/5 lg:p-1 p-2 max-lg:justify-between gap-2 text-sm text-secondary-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      <span className="w-0 h-[1px] bg-primary-400 hidden lg:block group-hover:w-4 transition-all duration-300" />
                      <span>{link.name}</span>
                      <span className="text-xs text-secondary-600">
                        {link.pName}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ==================== ستون ۳: تماس ==================== */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <h4 className="text-base font-serif text-neutral-50">
                Get in Touch
              </h4>
              <span className="text-xs text-secondary-500">
                با ما در تماس باشید
              </span>
            </div>

            <ul className="flex flex-col gap-3 mb-1">
              <li className="flex items-center gap-3 text-sm text-secondary-400">
                <FiMapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>Tehran, Iran</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-400">
                <FiPhone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span dir="ltr">+98 912 345 6789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-400">
                <FiMail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>hello@shahincafe.com</span>
              </li>
            </ul>

          </div>
        </div>

        {/* خط جداکننده */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary-600/50 mb-6 mt-10 to-transparent" />

        {/* بخش پایین: کپی‌رایت */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary-500">
          <p className="text-center md:text-left">
            © {currentYear}{" "}
            <span className="text-primary-400">Shahin Cafe</span>. All rights
            reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with{" "}
              <span className="text-primary-400">Fedora Software</span> in Iran
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
