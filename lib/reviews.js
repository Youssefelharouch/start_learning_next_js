import { marked } from "marked";
// import matter from "gray-matter";
import qs from "qs";
const CMS_URL = "http://localhost:1337";

export const getReview = async (slug) => {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  const item = data[0];
  if (data.length === 0) {
    return null;
  }
  return {
    ...toReview(item),
    body: marked(item.attributes.body, { headerIds: false, mangle: false }),
  };
};

export const getReviews = async (pageSize) => {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    //only first 6 elements
    pagination: { pageSize },
    sort: ["publishedAt:desc"],
  });
  const myattributes = data.map(toReview);
  return myattributes;
};

export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return data.map((item) => item.attributes.slug);
}

const fetchReviews = async (params) => {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(params, { encodeValuesOnly: true });
  //next can add his own revalidate option to the server 
    const response = await fetch(url,{
    next: {
        revalidate:30,
    }
  }); 
  /*=========this will make our pages dynamic the same effect force-dynamic  ======  */
  // const response = await fetch(url,{
  //   cache:'no-store',
  // });

  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
};

const toReview = (item) => {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyy-mmm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
    subtitle:attributes.subtitle,
  };
};
