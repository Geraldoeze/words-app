import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../../component/spinner";


const Words = ({data, error}) => {
  
  useEffect(() => {
    if (!!error) {
      setError({ bool: true, response: "An error Occured. Try again" });
    }
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

export async function getStaticProps() {
  try {
    const request = await fetch(`${process.env.BACKEND_SERVER}/alphabets`);
    
    if (!request.ok) {
      console.error("Error fetching data. Status:", request.status, request.statusText);
      return {
        props: {
          data: null,
          error: {
            status: request.status,
            message: request.statusText,
          },
        },
      };
    }

    const result = await request.json();
    console.log(result);

    return {
      props: {
        data: result,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        data: null,
        error: {
          status: 500, // Internal Server Error
          message: "Internal Server Error",
        },
      },
    };
  }
}
