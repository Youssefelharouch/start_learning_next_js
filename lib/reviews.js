import { readFile, readdir } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
import qs from "qs";
const CMS_URL = "http://localhost:1337";

export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}

export const getReview = async (slug) => {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
    const item = data[0];

  return {

    ...toReview(item),
    body: marked(item.attributes.body, { headerIds: false, mangle: false }),
  };
};

export const getReviews = async () => {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    //only first 6 elements
    pagination: { pageSize: 6 },
    sort: ["publishedAt:desc"],
  });
  const myattributes = data.map(toReview);
  return myattributes;
};

export async function getSlugs() {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}




const fetchReviews = async (params) => {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(params, { encodeValuesOnly: true });
  console.log("[fetchReviews]", url);
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
};


const toReview = (item) => {
  const {attributes}=item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyy-mmm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
  }
}