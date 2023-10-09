import { useRouter } from "next/router";

const Header = () => {
  const routes = useRouter();
  
const changePage = (path) => routes.push(path)
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <h3 onClick={() => changePage('/')} style={{cursor:'pointer', color: `${routes?.pathname == "/" && "grey"}` }}>Home</h3>
      <h3 onClick={() => changePage('/words')} style={{cursor:'pointer', color: `${routes?.pathname == "/words" && "grey"}` }}>
        Words
      </h3>
      <h3 onClick={() => changePage('/random')} style={{cursor:'pointer', color: `${routes?.pathname == "/random" && "grey"}` }}>
        Random
      </h3>
    </div>
  );
};

export default Header;
