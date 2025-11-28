import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group overflow-hidden border-0 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl h-full flex flex-col">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white aspect-square">
          {product.images && product.images[0] ? (
            <Image 
              src={product.images[0]} 
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-blue-200" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="p-6 space-y-4 flex-grow flex flex-col">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 mt-auto">
            <div>
              {price && price.unit_amount && (
                <>
                  <p className="text-2xl font-bold text-gray-900">
                    ${(price.unit_amount / 100).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">Starting price</p>
                </>
              )}
            </div>
            
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300"
            >
              Customize
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};