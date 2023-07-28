
export default async function ReviewLayout({ children }) {
  return (
    <>
    
      <div>
        {/* <div style={{ border: "solid red 1px" }}>[review sidebar]</div> */}
        <div>{children}</div>
      </div>
    </>
  );
}
//  style={{ display: "flex" }}