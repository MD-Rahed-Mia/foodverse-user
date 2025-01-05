import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_path_url, authToken } from "../secret";
import CategoryCard from "./Category/CategoryCard";

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getCategoryList() {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(`${api_path_url}/category/all`, {
          headers: { "x-auth-token": authToken },
          signal,
        });

        console.log("Categories:", data);
        if (data?.result) {
          setCategories(data.result);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn("Request canceled:", error.message);
        } else {
          console.error("Error fetching categories:", error);
          setError("Failed to fetch categories. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }

    getCategoryList();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading)
    return (
      <div className="mt-20">
        <p className="text-center pt-40">Loading...</p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="pt-20"></div>
      <div>
        <h1 className="my-4 text-center">categories you will love..</h1>
      </div>
      <div className="w-full px-4 grid grid-cols-4">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((item) => (
            <CategoryCard category={item} key={item.id || item.name} />
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
}
