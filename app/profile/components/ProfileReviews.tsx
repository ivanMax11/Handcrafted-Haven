import React from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Carlos",
    rating: 5,
    comment: "Exellent seller, products arrived quickly and in perfect condition.",
  },
  {
    id: 2,
    name: "Ana",
    rating: 4,
    comment: "Very good customer service, although shipping took a little while..",
  },
  {
    id: 3,
    name: "Pedro",
    rating: 5,
    comment: "Totally recommend this seller! Great products and fast shipping.",
  },
];

const ProfileReviews = () => {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

      {/* Promedio de calificación */}
      <div className="flex items-center">
        <span className="text-xl font-semibold mr-2">Grade point average:</span>
        <span className="text-yellow-500">{averageRating.toFixed(1)} ⭐</span>
      </div>

      {/* Lista de reseñas */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">{review.name}</span>
              <span className="text-yellow-500">{review.rating} ⭐</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileReviews;
