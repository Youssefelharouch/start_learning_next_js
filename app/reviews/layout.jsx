import Link from "next/link";

export default function ReviewLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul className="flex flex-col gap-3">
            <li className="bg-white border w-80 rounded shadow hover:shadow-xl" >
              <Link href="/reviews/hollow-knight">
                <img
                  src="/images/hollow-knight.jpg"
                  alt=""
                  width="320"
                  height="180"
                  className="rounded-t"
                />
                <h2 className="text-center py-1 " >hollow Knight</h2>
                
              </Link>
            </li>


            <li className="bg-white border w-80 rounded shadow hover:shadow-xl" >
              <Link href="/reviews/stardew-valley">
                <img
                  src="/images/stardew-valley.jpg"
                  alt=""
                  width="320"
                  height="180"
                  className="rounded-t"
                />
                <h2 className="text-center py-1 " >Stardew-valley</h2>
                
              </Link>
            </li>
      
          </ul>
        </nav>
      </header>
      <div style={{ display: "flex" }}>
        {/* <div style={{ border: "solid red 1px" }}>[review sidebar]</div> */}
        <div>{children}</div>
      </div>
    </>
  );
}
