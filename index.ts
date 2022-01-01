import express from "express";
const app = express();
const port = process.env.PORT || 3000;

import db from "./models";
import { projectbackings } from "./seeders/projectbackings";
import { projects } from "./seeders/projects";
import { users } from "./seeders/users";

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

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
