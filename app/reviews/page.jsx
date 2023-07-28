import Heading from '../../components/Heading'
import Link from "next/link";
import { getReviews } from '../../lib/reviews';



export default async function ReviewsPage() {
  const reviews = await getReviews();
  console.log('[reviewsPage] reviews : ',reviews)
  return (
    <>   
      <Heading>Reviews</Heading>
      <header>
        <nav>
          <ul className="flex flex-col gap-3">
            {reviews.map((review) => {
                <li key={review.slug} className="bg-white border w-80 rounded shadow hover:shadow-xl">
                <Link href={`/reviews/${review.slug}`}>
                  <img
                    src={review.image}
                    alt=""
                    width="320"
                    height="180"
                    className="rounded-t"
                  />
                  <h2 className="font-semibold font-orbitron text-center py-1 ">
                    {review.title}
                  </h2>
                </Link>
              </li>
            })}         

          </ul>
        </nav>
      </header>
    </>
  );
}
