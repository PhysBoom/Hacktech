import React from "react";
import toast from "react-hot-toast";

// The simple [svg     message] toast
export const TextNotify = (message, type) => 
  toast.custom(
    (t) => (
      <div className="flex flex-row justify-between items-center shadow p-3 bg-white translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out space-x-3">
        {type === "error" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-red-500 fill-current"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.5 16.084l-1.403 1.416-4.09-4.096-4.102 4.096-1.405-1.405 4.093-4.092-4.093-4.098 1.405-1.405 4.088 4.089 4.091-4.089 1.416 1.403-4.092 4.087 4.092 4.094z"/></svg>}
        {type === "success" && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-green-500 fill-current"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>}
        <span class="whitespace-pre text-sm text-black font-semibold">{message}</span>
      </div>
  ),
  { id: btoa(Math.random().toString()).substr(10, 5), position: "top-right" }
);