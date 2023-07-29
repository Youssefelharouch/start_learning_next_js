import { readFile, readdir } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
import qs from "qs";

export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}

export const getReview = async (slug) => {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content, { headerIds: false, mangle: false });
  return { slug, title, date, image, body };
};

/* slug: 'stardew-valley',
title: 'Stardew Valley',
date: '2022-05-04',
image: '/images/stardew-valley.jpg'*/

export const getReviews = async () => {
  const url = "http://localhost:1337/api/reviews"
 + "?" +
  qs.stringify({
    fields:['slug','title','subtitle','publishedAt'],
    populate: {image:{fields:['url']}},
    //only first 6 elements
    pagination:{pageSize:6},
    sort:['publishedAt:desc']
  },{encodeValuesOnly: true});
  
const response = await fetch(url);
const {data} = await response.json();
const myslugs = data.map(({attributes}) => {
  return  {
    slug :attributes.slug,
    slug :attributes.title,
    slug :attributes.date,
  };
})
console.log(myslugs);

};











export async function getSlugs() {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}
