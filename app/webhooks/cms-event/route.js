import { NextResponse } from "next/server"

export  const POST = async(request) => {
  const pyload = await request.json();
  console.log(pyload);
  return new Response(null,{status:204});
}
