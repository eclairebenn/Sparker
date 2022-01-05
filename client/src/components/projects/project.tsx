import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function Project() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            alt="Ted talk"
            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={"Ted"}
        subheader={"5 hours ago"}
      />

      <CardMedia
        component="img"
        height="180"
        image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
        alt="Nicola Sturgeon on a TED talk stage"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" component="p">
          {
            "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
          }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function ProjectList() {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} sm={6} md={4}>
        <Project />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Project />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Project />
      </Grid>
    </Grid>
  );
}
