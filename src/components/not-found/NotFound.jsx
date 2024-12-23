import React from "react";
import { TbError404 } from "react-icons/tb";
export default function NotFound() {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <TbError404 className="text-6xl font-bold "/>
      <h1 className="text-xl font-semibold">No items found.</h1>
    </div>
  );
}
