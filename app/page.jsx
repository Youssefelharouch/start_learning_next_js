'use client';

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    window.alert("welcome to the site");
  })
  console.log("[homePage] rendreing")
  return (
    <>
      <h1>Youssef Gamer</h1>
      <p>ony the best Youssef games , reviewd for you .</p>
    </>
  );
}
//http://localhost:3000