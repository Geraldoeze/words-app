import { useEffect, useState } from "react";
import Modal from "../component/Modal";
``;

const Random = ({ data, errors }) => {
  const [randomPair, setRandomPair] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState({
    bool: false,
    response: "",
  });

  useEffect(() => {
    getRandomPair(data);
    if (!!errors) {
      setError({ bool: true, response: "An error Occured. Try again" });
    }
  }, []);

  console.log(data, randomPair);

  const getRandomPair = (wordData) => {
    const wordKeys = Object.keys(wordData);
    const randomKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];
    setRandomPair({ key: randomKey, value: wordData[randomKey] });
  };
  const handleOpen = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);
  return (
    <div style={{ textAlign: "center" }}>
      {openModal && (
        <Modal
          onClose={closeModal}
          header={randomPair?.key}
          meaning={randomPair?.value}
        />
      )}
      <h1>Random Word</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!!data && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "rgb(215, 224, 230)",
                borderRadius: "8px",
                minWidth: "80px",
                margin: "0 auto",
                cursor: "pointer",
              }}
            >
              <h3
                style={{
                  padding: "10px 14px",
                  fontWeight: 700,
                  color: "rgba(76, 132, 235, 0.801)",
                }}
              >
                {randomPair?.key}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "1rem",
              }}
            >
              <button onClick={handleOpen}>Reveal</button>
              <button onClick={() => getRandomPair(data)}>Next</button>
            </div>
          </div>
        )}
        {error?.bool && (
          <div>
            <h2 style={{ color: "red" }}>An Error Occured.</h2>
            <h3 style={{ color: "red" }}>{error.response}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Random;
export async function getStaticProps() {
  try {
    const request = await fetch(`${process.env.BACKEND_SERVER}/random`);
    
    if (!request.ok) {
      console.error("Error fetching data. Status:", request.status, request.statusText);
      return {
        props: {
          data: null,
          errors: {
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
        errors: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        data: null,
        errors: {
          status: 500, // Internal Server Error
          message: "Internal Server Error",
        },
      },
    };
  }
}
