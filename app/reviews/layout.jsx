
import Link from 'next/link'

export default function ReviewLayout({ children }) {
  return (
    <>
    <header >
    <nav>
      <ul>
        <li>
          <Link href="/reviews/hollow-knight">hollow Knight</Link>
        </li>
        <li>
          <Link href="/reviews/stardew-valley">stardew Valley</Link>
        </li>             
      </ul>
      </nav>
  </header>
    <div style={{ display: "flex" }}>
      <div style={{ border: "solid red 1px" }}>[review sidebar]</div>
      <div>{children}</div>
    </div>
    </>
  );
}
