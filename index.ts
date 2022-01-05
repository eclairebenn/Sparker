import express, { Router } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import projectRoutes from "./server/routes/project.routes";
import userRouter from "./server/routes/user.routes";
import db from "./server/models";
import { projectbackings } from "./server/seeders/projectbackings";
import { projects } from "./server/seeders/projects";
import { users } from "./server/seeders/users";

const router = Router();
router.use("/projects", projectRoutes);
router.use("/users", userRouter);

const app = express();
const port = process.env.PORT || 3000;
//Seed Functions
const createUsers = () => {
  users.map((user) => {
    db.User.create(user);
  });
};
const createProjects = () => {
  projects.map((project) => {
    db.Project.create(project);
  });
};
const createProjectBackings = () => {
  projectbackings.map((projectbacking) => {
    db.ProjectBacking.create(projectbacking);
  });
};

createProjectBackings();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
