import Image from "next/image";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";


export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">

      {/* Hero Section */}
    <div className="bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Left Column */}
          <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full w-fit">
              <span className="text-xs font-medium text-blue-700">Premium Custom Pet Gifts</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Turn Your Pet Into
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent"> Art</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Create beautiful, personalized gifts featuring your beloved pet. 
              Custom mugs, t-shirts, and portraits crafted with love.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-5 text-base shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
              >
                <Link href="/products">Browse Products</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full px-6 py-5 text-base border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                {/* Your link here */}
              </Button>
            </div>
          </div>

          {/* Right Column */}
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6 lg:p-8">
              <div className="relative w-full max-w-sm">
                <Image
                  width={400}
                  height={400}
                  src="/portait.png"
                  alt="Royal Pet Portrait"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {products.data.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> 

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-2 hover:bg-blue-50 hover:border-blue-500 transition-all"
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>

    </div>
  );
}
