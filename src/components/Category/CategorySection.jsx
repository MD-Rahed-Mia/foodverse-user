import React, { useEffect, useState } from "react";
import { api_path_url, authToken } from "../../secret";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading";

export default function CategorySection() {
  // loading
  const [loading, setLoading] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function getCategoryList() {
      setLoading(true);
      try {
        const { data } = await axios.get(`${api_path_url}/category/all`, {
          headers: {
            "x-auth-token": authToken,
          },
        });
        console.log("Categories:", data);

        if (data) {
          setCategory(data.result);
        }

        setLoading(false);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.warn("Request canceled:", error.message);
        } else {
          console.error("Error fetching categories:", error);
        }
      }
    }

    getCategoryList();
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {category?.map((ctg, index) => {
            if (!ctg.isPopular) {
              return false;
            }
            if (index > 7) {
              return false;
            }
            return (
              <Link
                to={`/category/${ctg.name}`}
                key={index}
                className="flex flex-col items-center"
              >
                <img
                  src={ctg.thumbnail || "./img/Add1.jpg"}
                  alt={ctg.name}
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full shadow-md object-cover"
                />
                <span className="mt-2 text-sm sm:text-base font-medium text-gray-700">
                  {ctg.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
