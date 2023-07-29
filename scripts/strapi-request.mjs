import { writeFileSync } from "node:fs";
import qs from "qs";

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
const body = await response.json();
const formated = JSON.stringify(body, null, 2);
const file = "scripts/strapi-response.json";
writeFileSync(file, formated, "utf-8");
