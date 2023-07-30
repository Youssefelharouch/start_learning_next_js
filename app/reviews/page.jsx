import Heading from "../../components/Heading";
import Link from "next/link";
import { getReviews, getSlugs } from "../../lib/reviews";
import Image from "next/image";
import Paginition from "../../components/Paginition";
export const metadata = {
  title: "Reviews",
};

export default async function ReviewsPage({ searchParams }) {

  

  const page = parsePageParams(searchParams.page);
  const PAGE_SIZE = 6;
  const {reviews,pageCount} = await getReviews(PAGE_SIZE, page);
  console.log("[reviewPage log ]", page);
  return (
    <>
      <Heading>Reviews</Heading>

      <Paginition href={"/reviews"} page={page} pageCount ={pageCount}   />
       
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
  if (paramsvalue) {
    const page = parseInt(paramsvalue);

    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
};