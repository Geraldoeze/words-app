import Modal from "../../component/Modal";
import { useState } from "react";
import Spinner from "../../component/spinner";

const Word = ({ data, alphabet }) => {
  const [openModal, setOpenModal] = useState(false);
  const [word, setWord] = useState({
    name: "",
    meaning: "",
  });

  // useEffect(() => {
  //   // Fetch data from the API route
  //   console.log(alphabet);
  //   if (!!alphabet) {
  //     fetch(`${alphabet}`)
  //       .then((response) => response.json())
  //       .then((responseData) => {
  //         setData(responseData);
  //         console.log(responseData);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }
  // }, [alphabet]);

  const handleOpen = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  const handleClick = (value) => {
    setWord(() => ({
      name: value,
      meaning: data.words[value],
    }));
    handleOpen();
  };

  function getKeys(value) {
    return Object.keys(value).sort();
  }

  return (
    <div style={{ textAlign: "center" }}>
      {openModal && (
        <Modal
          onClose={closeModal}
          header={word?.name}
          meaning={word?.meaning}
        />
      )}
      <h1>Words in {alphabet?.toUpperCase()} </h1>
      <div>
        {!!data && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: "30vh",
              flexWrap: "wrap",
              gap: "25px",
            }}
          >
            {getKeys(data.words).map((item) => (
              <div
                key={item}
                style={{
                  alignSelf: "flex-start",
                  background: "rgb(215, 224, 230)",
                  borderRadius: "8px",
                  minWidth: "80px",
                  cursor: "pointer",
                  minHeight: "2rem",
                }}
                onClick={() => handleClick(item)}
              >
                <h3
                  style={{
                    padding: "4px 14px",
                    fontWeight: 700,
                    margin: "10px 4px",
                    color: "rgba(76, 132, 235, 0.801)",
                  }}
                >
                  {item}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Word;

export async function getServerSideProps(context) {
  const { alphabet } = context.params;

  let error = null;
  const request = await fetch(`${process.env.BACKEND_SERVER}/get/${alphabet}`);
  const result = await request.json();
  if (request?.status != 200) {
    console.log("Error", request.message);
    error = request;
  }

  return {
    props: {
      data: result,
      alphabet: alphabet,
    },
  };
}
