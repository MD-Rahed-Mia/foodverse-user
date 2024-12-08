import { Button, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { api_path_url, authToken } from "../../secret";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function ReviewItem({ detail }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starCounter, setStarCounter] = useState(0); // Initialize with 0 to show no rating initially
  const [comment, setComment] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // handle star click
  function handleStar(starValue) {
    console.log(`Star clicked: ${starValue}`);
    setStarCounter(starValue); // Update the selected star rating
  }

  // handle comment
  function handleComment(e) {
    const value = e.target.value;
    setComment(value);
  }

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= starCounter ? (
        <FaStar
          key={i}
          className="text-yellow-500 cursor-pointer"
          onClick={() => handleStar(i)}
        />
      ) : (
        <FaRegStar
          key={i}
          className="cursor-pointer"
          onClick={() => handleStar(i)}
        />
      ),
    );
  }

  // handle review
  async function handleReview() {
    try {
      const id = Cookies.get("id");

      if (!id) {
        return false;
      }

      if (starCounter === 0) {
        toast.error("please select star.");
        return;
      }

      if (comment.length <= 3) {
        toast.error("very short comment. Please add some more.");
        return;
      }

      const { data } = await axios.post(
        `${api_path_url}/restaurant/review/create-review?id=${detail.restaurantId}`,
        {
          rating: starCounter,
          userId: id,
          comment: comment,
        },
        {
          headers: {
            "x-auth-token": authToken,
          },
        },
      );

      console.log(data);

      if (data.success) {
        toast.success("Thank you.");
        setComment("");
        setStarCounter(0);
        setIsModalOpen(false);
      } else {
        toast.error("something went wrong. Please try again.");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Review
      </Button>
      <Modal
        title="Submit Review"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className=" flex justify-center items-center py-8">
          <div className="bg-white w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-lg p-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Rate Your Experience
              </h2>
              <p className="text-gray-500">Your feedback helps us improve!</p>
            </div>

            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="text-gray-600">Rating:</div>
              {stars}
            </div>

            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-gray-600 font-semibold"
              >
                Leave a Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comments here..."
                maxLength={250}
                onChange={handleComment}
                value={comment}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 focus:outline-none"
                onClick={handleReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ReviewItem;
