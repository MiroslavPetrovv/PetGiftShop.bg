"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart, Minus, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const price = product.default_price as Stripe.Price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: price.unit_amount as number,
        imageUrl: product.images ? product.images[0] : null,
        quantity: 1,
      });
    }
    setQuantity(1); // Reset quantity after adding to cart
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Image Section */}
            <div className="relative bg-gradient-to-br from-blue-50 to-white aspect-square lg:aspect-auto lg:min-h-[450px]">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-blue-200" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Product Info Section */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center space-y-4">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-3">
                  <span className="text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Premium Product
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                
                {product.description && (
                  <p className="text-base text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Price */}
              {price && price.unit_amount && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-3xl font-bold text-gray-900">
                    ${(price.unit_amount / 100).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Price per item</p>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="text-xl font-bold text-gray-900 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseQuantity}
                    className="h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              {price && price.unit_amount && (
                <div className="bg-blue-50 rounded-2xl p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Total Price</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${((price.unit_amount / 100) * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-5 text-base font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>

              {/* Additional Info */}
              <div className="pt-4 border-t border-gray-100 space-y-1.5">
                <div className="flex items-center text-xs text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mr-2" />
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mr-2" />
                  30-day money-back guarantee
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mr-2" />
                  Handcrafted with love
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};