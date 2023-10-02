import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "../../component/Modal";
import Spinner from "../../component/spinner";

const Word = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [word, setWord] = useState({
    name: "",
    meaning: "",
  });
  const router = useRouter();
  const { alphabet } = router.query;

  useEffect(() => {
    // Fetch data from the API route
    console.log(alphabet);
    if (!!alphabet) {
      fetch(`/api/getDatabyId/${alphabet}`)
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
          console.log(responseData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [alphabet]);

  function getKeys(value) {
    return Object.keys(value).sort();
  }
  const handleOpen = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);
  const handleClick = (value) => {
    setWord(() => ({
      name: value,
      meaning: data.words[value],
    }));
    handleOpen();
  };
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
        {isLoading && <Spinner />}
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
