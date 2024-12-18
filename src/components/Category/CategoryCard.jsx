import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      to={`/category/${category.name}`}
      key={category._id}
      className="flex flex-col items-center"
    >
      <img
        src={category.thumbnail || "./img/Add1.jpg"}
        alt={category.name}
        className="w-14 h-14 sm:w-20 sm:h-20 rounded-full shadow-md object-cover"
      />
      <span className="mt-2 text-sm sm:text-base font-medium text-gray-700">
        {category.name}
      </span>
    </Link>
  );
}

export default CategoryCard;
