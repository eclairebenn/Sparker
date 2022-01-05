import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useParams } from "react-router";

const post = {
  description: "Description thing here",
  image:
    "https://ksr-ugc.imgix.net/assets/035/699/118/ba8fec44db6a114ff4a4c43eafb189b6_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1637958050&auto=format&frame=1&q=92&s=4fc3ac2286b6001844b5a51ba9a05a97",
  imageText: "Alt image text",
  linkText: "Link",
  title: "Title",
};

export default function ProjectPage() {
  const { title } = useParams();
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={post.image}
          alt={post.imageText}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
            <Typography variant="h6" gutterBottom>
              Project Title
            </Typography>
            <Typography>This project does this cool thing. Fund me!</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
