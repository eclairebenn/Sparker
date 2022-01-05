import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";

import projectRoutes from "./server/routes/project.routes";
const app = express();
const port = process.env.PORT || 3000;

import db from "./server/models";
// import { projectbackings } from "./seeders/projectbackings";
// import { projects } from "./seeders/projects";
// import { users } from "./seeders/users";

//Seed Functions
// const createUsers = () => {
//   users.map((user) => {
//     db.User.create(user);
//   });
// };
// const createProjects = () => {
//   projects.map((project) => {
//     db.Project.create(project);
//   });
// };
// const createProjectBackings = () => {
//   projectbackings.map((projectbacking) => {
//     db.ProjectBacking.create(projectbacking);
//   });
// };

// createProjectBackings();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/projects", projectRoutes);

app.get("/users", (req, res) => {
  db.User.findAll({
    include: {
      model: db.Project,
    },
  })
    .then((result: object) => res.json(result))
    .catch((err: object) => console.error(err));
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
