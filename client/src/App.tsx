import React, { FC, ReactElement } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// import useStyles from "./styles";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Blog from "./components/splash/Blog";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
const App: FC<any> = (): ReactElement => {
  // const classes = useStyles();
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://finalspaceapi.com/api/v0/character/?limit=12")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  // interface characterAttr {
  //   name: string;
  //   species: string;
  //   img_url: string;
  //   status: string;
  // }
  const sections = [
    { title: "Technology", url: "#" },
    { title: "Art and Design", url: "#" },
    { title: "Film", url: "#" },
    { title: "Games", url: "#" },
    { title: "Music", url: "#" },
    { title: "Pets", url: "#" },
    { title: "Science", url: "#" },
    { title: "Health", url: "#" },
    { title: "Fashion", url: "#" },
    { title: "Travel", url: "#" },
  ];
  return (
    <BrowserRouter>
      <div className="App">
        <Container>
          <NavBar sections={sections}></NavBar>
          <Routes>
            <Route path="/project/:title"></Route>
            <Route path="/signin">
              <SignIn></SignIn>
            </Route>
            <Route path="/signup">
              <SignUp></SignUp>
            </Route>
            <Route path="/">
              <Blog></Blog>
            </Route>
          </Routes>
          <Footer
            title="Sparker"
            description="Let us know how we are doing!"
          ></Footer>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
