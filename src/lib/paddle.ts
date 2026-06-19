import { useEffect } from "react";

declare global {
  interface Window {
    Paddle?: any;
  }
}

export function usePaddle() {
  useEffect(() => {
    if (document.querySelector('script[src*="paddle.com"]')) return;

    const token = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string | undefined;
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    script.onload = () => {
      if (window.Paddle) {
        const isSandbox = token.startsWith("test_");
        window.Paddle.Setup({
          token,
          ...(isSandbox ? { environment: "sandbox" } : {}),
        });
      }
    };

    document.body.appendChild(script);
  }, []);
}

export const PRICE_IDS = {
  monthly: import.meta.env.VITE_PADDLE_PRICE_MONTHLY as string | undefined,
  yearly: import.meta.env.VITE_PADDLE_PRICE_YEARLY as string | undefined,
};
