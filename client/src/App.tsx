import React, { useState, useEffect, FC, ReactElement } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";
import NavBar from "./components/common/NavBar";

const App: FC<any> = (): ReactElement => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://finalspaceapi.com/api/v0/character/?limit=12")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  interface characterAttr {
    name: string;
    species: string;
    img_url: string;
    status: string;
  }
  return (
    <div className="App">
      <Container>
        <NavBar></NavBar>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h2"
          align="center"
        >
          React MUI Example Start
          {data.map((character: characterAttr) => (
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={character.img_url} />
              <CardContent>
                <Typography color="primary" variant="h5">
                  {character.name}
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  {character.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Typography>
      </Container>
    </div>
  );
};

export default App;
