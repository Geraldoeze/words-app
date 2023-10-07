import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../../component/spinner";
import { apiGetAllAlphabets } from "../../api/fetchData";

const Words = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    bool: false,
    response: "",
  });

  useEffect(() => {
    const fetch = async () => {
      const result = await apiGetAllAlphabets();
      if (result?.status != 200) {
        setError({ bool: true, response: "An error Occured. Try again" });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setData(result?.data);
        setError({ bool: false, response: "" });
      }
    };

    fetch();
  }, []);

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
        {error?.bool && (
          <div>
            <h2 style={{ color: "red" }}>An Error Occured.</h2>
            <h3 style={{ color: "red" }}>{error?.response}</h3>
          </div>
        )}
        {!!data &&
          data
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
