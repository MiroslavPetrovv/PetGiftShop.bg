"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export const Navbar = () => {
  const pathname = usePathname();
  const { items } = useCartStore();
  
  // Calculate total cart count
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", icon: ShoppingBag },
    { name: "My Orders", path: "/checkout", icon: ShoppingCart, badge: cartCount },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="PetGiftShop Logo"
              className="w-18 h-18 group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <span className="text-2xl font-bold text-gray-900">PetGiftShop</span>
              <p className="text-xs text-gray-500 -mt-1">Custom Pet Gifts</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link key={item.path} href={item.path}>
                  <button
                    className={`relative p-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};