import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server"
import { CACH_TAG_REVIEWS } from "../../../lib/reviews";

export  const POST = async(request) => {
  const pyload = await request.json();
  console.log(pyload);
  if(pyload.model === 'review'){
    revalidateTag(CACH_TAG_REVIEWS);
  }
  return new Response(null,{status:204});
}
