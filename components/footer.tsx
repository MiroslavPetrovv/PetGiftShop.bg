export const  Footer =() => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <img
              src="/logo.jpg"
              alt="PetGiftShop Logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-900">PetGiftShop</span>
          </div>

          <p className="text-gray-600">
            Creating beautiful memories with your beloved pets
          </p>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PetGiftShop. Made with love for pet owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
