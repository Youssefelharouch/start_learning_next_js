import Heading from '../../components/Heading'
import Link from "next/link";
import { getReviews, getSlugs } from '../../lib/reviews';

export const generateStaticParams = async () => {
  const slugs = await getSlugs();
  return slugs.map(slug=>{ slug });

}

export default async function ReviewsPage() {
  const reviews = await getReviews();
  console.log('rendreing');
  return (
    <>   
      <Heading>{reviews.title}</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review) => (
          <li key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <img src={review.image} alt=""
                width="320" height="180" className="rounded-t"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
