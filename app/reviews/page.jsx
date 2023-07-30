import Heading from "../../components/Heading";
import Link from "next/link";
import { getReviews, getSlugs } from "../../lib/reviews";
import Image from "next/image";

// export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Reviews",
};

export default async function ReviewsPage({searchParams}) {
  const page = parsePageParams(searchParams);
  const reviews = await getReviews(6);
  return (
    <>
      <Heading>Reviews</Heading>

      <div className="flex gap-2 pb-3">
        <Link href={`/reviews?page=${page-1}`}>&lt;</Link>
        <span>Page {page}</span>
        <Link href={`/reviews?page=${page+1}`}>&rt;</Link>
      </div>

      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt=""
                width="320"
                height="180"
                className="rounded-t"
                priority={index === 0}
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

const parsePageParams = (paramsvalue) => {
  if(paramsvalue) {
    const page = parseInt(paramsvalue);
    if(isFinite(page) && page>0) {
      return  page;
    }
  }
}