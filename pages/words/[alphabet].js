import Modal from "../../component/Modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiGetIdData } from "../../api/fetchData";
import Spinner from "../../component/spinner";
import Header from "../../component/heder";

const Word = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ bool: false, response: "" });
  const [data, setData] = useState();
  const routes = useRouter();
  const [word, setWord] = useState({
    name: "",
    meaning: "",
  });
  
  const alphabet = routes?.query.alphabet;

  useEffect(() => {
    const fetch = async () => {
      if (!!alphabet) {
        const result = await apiGetIdData(alphabet);
        if (result?.status != 200) {
          setError({ bool: true, response: "An error Occured. Try again" });
          setIsLoading(false);
        }
        setIsLoading(false);
        setData(result?.data);
      } else {
        setError({ bool: true, response: "URL Alphabet not gotten." });
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

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
    <>
    <Header />
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
        {error?.bool && (
          <div>
            <h2 style={{ color: "red" }}>URL Error</h2>
            <h3 style={{ color: "red" }}> {error?.response}</h3>
          </div>
        )}
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
    </>
  );
};

export default Word;
