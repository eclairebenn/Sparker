import express from "express";
import routes from "./routes";
const app = express();
const port = process.env.PORT || 3000;

import db from "./models";
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  db.User.findAll({
    include: {
      model: db.Project,
    },
  })
    .then((result: object) => res.json(result))
    .catch((err: object) => console.error(err));
});
app.get("/projects", (req, res) => {
  db.Project.findAll({
    include: {
      model: db.User,
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
app.use("/api/v1", routes);
