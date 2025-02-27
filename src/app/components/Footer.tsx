export default function Footer() {
  return (
    <div className="flex flex-row  bg-gray-100 p-10 md:p-20 h-80">
      <div className="flex flex-col md:flex-row md:justify-between justify-center md:mt-0 md:w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between gap-4 relative">
            <div>
              <span>Subscribe to our newsletter</span>
              <div className="flex flex-row gap-2 items-center">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="p-2 rounded-lg border"
                />
                <button
                  type="button"
                  className="rounded-full bg-gray-900 text-white p-1 w-28 h-10 hover:bg-gray-700"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex flex-col gap-2 mt-14 text-sm">
                <span>© 2024 UrbanVibe</span>
                <span>Delightful commerce for everyone</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-20 md:mr-10 mt-8 md:mt-0">
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-bold">Products</span>
            <span>Apparel</span>
            <span>Accessories</span>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-bold">Support</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>
    </div>
  );
}
