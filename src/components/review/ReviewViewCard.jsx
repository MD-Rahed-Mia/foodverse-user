function ReviewViewCard({ review }) {


 // console.log('reveiw is : ', review)


  return (
    <div className="w-4/5 mx-auto space-y-4 bg-white">
      <div className="flex justify-center items-center  border p-2 rounded-md bg-white shadow-md ">
        <img
          src={ review.userId === null ? "burger.png" : review.userId.image}
          alt="Girl in a jacket"
          className="h-20 w-20 rounded-full mr-2"
        />
        <div>
          <div className="text-gray-700 font-semibold text-sm">
            Rating-{" "}
            {Number.isInteger(review?.rating) ? review.rating + ".0" : review.rating}

          </div>

          <div className="flex  items-center ">
            <div ca="flex"></div>
          </div>
          <div className="text-gray-700 text-sm font-semibold">
            
          </div>
          <div className="text-gray-500 text-sm">{review?.comment}</div>
        </div>
      </div>
    </div>
  );
}

export default ReviewViewCard;
