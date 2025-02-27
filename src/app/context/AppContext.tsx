"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

// Define the type for the context value
interface AppContextType {
  cartCount: number;
  addToCart: {};
  removeFromCart: (id: number) => void;
  getCartCount: () => void;
  cartItems: [];
}

// Create Context with default value as `null`
const AppContext = createContext<AppContextType | null>(null);

// Provider Component
export function AppProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<any>([]);

  useEffect(() => {
    getCartCount();
  }, [cartCount]);

  const addToCart = (detail: any) => {
    let storedCarts: any = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const existing = storedCarts.find(
      (value: any, key: number) => value?.detail?.id === detail?.id
    );
    if (existing) {
      existing.quantity = parseInt(existing?.quantity) + 1;
    } else {
      storedCarts.push({
        detail: detail,
        quantity: 1,
      });
    }
    sessionStorage.setItem("cart", JSON.stringify(storedCarts));
    toastr();
    getCartCount();
  };
  const removeFromCart = (key: number) => {
    let storedCarts: any = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const existing = storedCarts.find((value: any, key: number) => key === key);

    if (existing) {
      existing.quantity = parseInt(existing?.quantity) - 1;
      if (existing.quantity <= 0) {
        storedCarts.splice(key, 1);
      }
    } else {
      storedCarts.splice(key, 1);
    }

    sessionStorage.setItem("cart", JSON.stringify(storedCarts));
    getCartCount();
  };
  const getCartCount = () => {
    let storedCarts: any = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCartCount(storedCarts.length);
    setCartItems(storedCarts);
  };

  const toastr = () => {
    toast.success("Added to cart!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <AppContext.Provider
      value={{
        cartCount,
        addToCart,
        removeFromCart,
        getCartCount,
        cartItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook to Use Context (With Type Safety)
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
