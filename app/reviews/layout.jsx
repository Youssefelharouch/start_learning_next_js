export default function ReviewLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "solid red 1px" }}>[review sidebar]</div>
      <div>{children}</div>
    </div>
  );
}
