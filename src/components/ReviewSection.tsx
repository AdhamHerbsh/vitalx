import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

interface ReviewSectionProps {
  productId: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Michael Johnson',
    rating: 5,
    date: '2025-11-15',
    comment: 'Absolutely fantastic quality! The build is solid and it feels premium. Worth every penny for serious training.',
    helpful: 24,
    verified: true,
  },
  {
    id: '2',
    author: 'Sarah Williams',
    rating: 4,
    date: '2025-11-10',
    comment: 'Great product overall. Delivery was fast and packaging was excellent. Only minor issue is the price point, but you get what you pay for.',
    helpful: 15,
    verified: true,
  },
  {
    id: '3',
    author: 'David Chen',
    rating: 5,
    date: '2025-11-05',
    comment: 'Best purchase I\'ve made for my home gym. The quality is commercial-grade and it\'s built to last. Highly recommend!',
    helpful: 32,
    verified: true,
  },
  {
    id: '4',
    author: 'Emily Rodriguez',
    rating: 4,
    date: '2025-10-28',
    comment: 'Very satisfied with this purchase. The product exceeded my expectations. Customer service was also very helpful.',
    helpful: 8,
    verified: false,
  },
  {
    id: '5',
    author: 'James Thompson',
    rating: 5,
    date: '2025-10-20',
    comment: 'Outstanding! This is exactly what I needed for my training routine. The attention to detail is impressive.',
    helpful: 19,
    verified: true,
  },
];

export function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    author: '',
    comment: '',
  });
  const [helpfulClicks, setHelpfulClicks] = useState<Set<string>>(new Set());

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100,
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.author || !newReview.comment) return;

    const review: Review = {
      id: Date.now().toString(),
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      helpful: 0,
      verified: false,
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, author: '', comment: '' });
  };

  const handleHelpful = (reviewId: string) => {
    if (helpfulClicks.has(reviewId)) return;
    
    setReviews(reviews.map(review =>
      review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
    ));
    setHelpfulClicks(new Set([...helpfulClicks, reviewId]));
  };

  return (
    <div className="border-t border-[#6c6c6c] pt-12">
      <h2 className="text-[#DFCC8C] mb-8">Customer Reviews</h2>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Average Rating */}
        <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
          <div className="text-center">
            <div className="text-[#DFCC8C] mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'fill-[#DFCC8C] text-[#DFCC8C]'
                      : 'text-[#6c6c6c]'
                  }`}
                />
              ))}
            </div>
            <p className="text-[#868686]">Based on {reviews.length} reviews</p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-[#9f9f9f]">{rating}</span>
                  <Star className="w-4 h-4 fill-[#DFCC8C] text-[#DFCC8C]" />
                </div>
                <div className="flex-1 h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#DFCC8C] transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-[#868686] w-12 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write a Review */}
      <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6 mb-8">
        <h3 className="text-white mb-6">Write a Review</h3>
        <form onSubmit={handleSubmitReview}>
          {/* Rating Selection */}
          <div className="mb-6">
            <label className="block text-[#9f9f9f] mb-2">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="transition-colors"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= newReview.rating
                        ? 'fill-[#DFCC8C] text-[#DFCC8C]'
                        : 'text-[#6c6c6c] hover:text-[#9f9f9f]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-[#9f9f9f] mb-2">Your Name</label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Comment Textarea */}
          <div className="mb-6">
            <label className="block text-[#9f9f9f] mb-2">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors resize-none"
              placeholder="Share your experience with this product..."
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#DFCC8C] hover:bg-[#DBC078] text-black px-6 py-3 rounded-lg transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white">{review.author}</span>
                  {review.verified && (
                    <span className="px-2 py-1 bg-[#DFCC8C]/10 border border-[#DFCC8C]/30 rounded text-[#DFCC8C]">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-[#DFCC8C] text-[#DFCC8C]'
                            : 'text-[#6c6c6c]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#868686]">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Comment */}
            <p className="text-[#9f9f9f] mb-4 leading-relaxed">{review.comment}</p>

            {/* Helpful Button */}
            <button
              onClick={() => handleHelpful(review.id)}
              disabled={helpfulClicks.has(review.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                helpfulClicks.has(review.id)
                  ? 'border-[#DFCC8C] text-[#DFCC8C]'
                  : 'border-[#6c6c6c] text-[#868686] hover:border-[#9f9f9f] hover:text-[#9f9f9f]'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              Helpful ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
