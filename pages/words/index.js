import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../../component/spinner";
import clientPromise from "../../lib/mongodb";

const Words = ({data_server}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Fetch data from the API route
  //   fetch("/api/getData")
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       setData(responseData);
  //       console.log(responseData);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  console.log(data_server);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Words in Database</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          flexWrap: "wrap",
          gap: "25px",
        }}
      >
        {isLoading && <Spinner />}
        {!!data_server &&
          data_server
            .sort((a, b) => a.alphabet.localeCompare(b.alphabet))
            ?.map((item) => (
              <div
                key={item?._id}
                style={{
                  background: "rgb(215, 224, 230)",
                  borderRadius: "8px",
                  minWidth: "80px",
                  cursor: "pointer",
                }}
              >
                <Link
                  href={"/words/[alphabet]"}
                  as={`/words/${item?.alphabet}`}
                >
                  <h3
                    style={{
                      padding: "10px 14px",
                      fontWeight: 700,
                      color: "rgba(76, 132, 235, 0.801)",
                    }}
                  >
                    {item?.alphabet}
                  </h3>
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Words;

export async function getStaticProps() {
  const client = await clientPromise
  const db = client.db("words")
  const dataFromDb = await db.collection("alphabets").find({}).toArray();
return {
  props: {
    data_server:  JSON.parse(JSON.stringify(dataFromDb))

  }
}
}