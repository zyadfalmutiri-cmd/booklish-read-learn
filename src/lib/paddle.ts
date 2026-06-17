 import { useEffect } from "react";

declare global {
  interface Window {
    Paddle?: any;
  }
}

export function usePaddle() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    script.onload = () => {
      if (window.Paddle) {
        window.Paddle.Setup({
          token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
          environment: "sandbox",
        });
      }
    };

    document.body.appendChild(script);
  }, []);
}