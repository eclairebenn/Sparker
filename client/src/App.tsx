import React, { FC, ReactElement } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// import useStyles from "./styles";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Blog from "./components/splash/Blog";
import SignIn from "./components/user/SignIn";
import SignUp from "./components/user/SignUp";
import ProjectPage from "./components/projects/projectPage";
import Checkout from "./components/checkout/Checkout";
import CheckoutForm from "./components/checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_3KRw1ytAKSdp7LbuctfPm9xb");

const App: FC<any> = (): ReactElement => {
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
  const options = {
    clientSecret: "{{CLIENT_SECRET}}",
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Container>
          <NavBar sections={sections}></NavBar>
          <Routes>
            <Route path="/project/:title">
              <ProjectPage></ProjectPage>
            </Route>
            <Route path="/signin">
              <SignIn></SignIn>
            </Route>
            <Route path="/signup">
              <SignUp></SignUp>
            </Route>
            <Route path="/checkout">
              <Checkout></Checkout>
            </Route>
            <Route path="/">
              <Blog></Blog>
            </Route>
          </Routes>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm></CheckoutForm>
          </Elements>
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
