import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../../public/Logo2.png";

export const Navbar = () => {
  return (
    <nav aria-label="Main navigation" className="absolute max-lg:hidden top-0 left-0 w-full z-50 px-4 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center justify-center bg-white/10 backdrop-blur-sm w-10 h-10 border border-white/10 rounded-xl"
        >
          <Image src={Logo} alt="Shahin" className="w-6 h-7" />
        </Link>
        <Link
          href="/menu"
          className="flex items-center bg-[#C49A6C] hover:bg-[#b08a5f] text-black font-medium rounded-xl px-4 h-10"
        >
          Menu
        </Link>
      </div>
    </nav>
  );
};
