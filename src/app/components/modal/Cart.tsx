export default function Cart() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {/* 🏷️ Modal Box */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <span>x</span>

        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md">
          Checkout
        </button>
      </div>
    </div>
  );
}
