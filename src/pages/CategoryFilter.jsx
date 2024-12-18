import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import handleApiRequest from "../helpers/handleApiRequest";
import MenuCard from "../components/MenuCard";

export default function CategoryFilter() {
  const { category } = useParams();
  const [items, setItems] = useState(null);

  console.log(category);

  useEffect(() => {
    async function fetchData() {
      const apiResponse = await handleApiRequest(
        `/menu/filter-category?category=${category}`,
        {}
      );

      if (apiResponse?.success) {
        setItems(apiResponse.menus);
      }
    }

    fetchData();
  }, [category]);

  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <div>
      <div className="pt-24"></div>

      <div>
        {items?.length === 0 || items === null ? (
          <h1 className="text-center mt-4">No Items found.</h1>
        ) : null}
      </div>

      <div className="w-[95%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items &&
          items.map((item) => {
            return <MenuCard detail={item} key={item._id} />;
          })}
      </div>
    </div>
  );
}
