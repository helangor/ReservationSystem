import axios from "axios";

export function Products() {
  axios
    .get("https://localhost:44383/api/Products")
    .then((res) => console.log(res.data));

  return (
    <>
      <p>3</p>
    </>
  );
}
