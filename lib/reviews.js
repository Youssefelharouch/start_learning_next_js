import { readFile, readdir } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
import qs from "qs";
const CMS_URL = 'http://localhost:1337';

export async function getFeaturedReview() {
  const reviews = await getReviews();
  return reviews[0];
}

export const getReview = async (slug) => {
  // const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  // const {
  //   content,
  //   data: { title, date, image },
  // } = matter(text);
  // const body = marked(content, { headerIds: false, mangle: false });
  // return { slug, title, date, image, body };

  const url = `${CMS_URL}/api/reviews`
  + "?" +
   qs.stringify({
    filters:{slug:{$eq:slug}},
    fields:['slug','title','subtitle','publishedAt','body'],
    populate: {image:{fields:['url']}},
    pagination:{pageSize:1,withCount:false},
   },{encodeValuesOnly: true});
   console.log('getReview',url);
 const response = await fetch(url);
 const {data} = await response.json();
 const {attributes}  = data[0];
 
 return {
  slug :attributes.slug,
  title :attributes.title,
  date :attributes.publishedAt.slice(0,'yyy-mmm-dd'.length),
  image:CMS_URL + attributes.image.data.attributes.url,
  body:marked(attributes.body, { headerIds: false, mangle: false })
 };
};


export const getReviews = async () => {
  const url = `${CMS_URL}/api/reviews`
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
const myattributes = data.map(({attributes}) => {
  return  {
    slug :attributes.slug,
    title :attributes.title,
    date :attributes.publishedAt.slice(0,'yyy-mmm-dd'.length),
    image:CMS_URL + attributes.image.data.attributes.url
  };
})
return myattributes;

};

export async function getSlugs() {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}
