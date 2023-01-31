'use client';
import React from "react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
          console.log('logout');
        }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Log out
    </button>
  );
}
