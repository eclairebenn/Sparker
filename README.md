This application utilizes the PERN Stack - PostgreSQL, Express, Node, and React with TypeScript. This app's API is created with Sequelize ORM.

# Sparker

## Get Started

To get started with this example, clone the repository and install the
dependencies.

```bash
$ git clone ...
$ cd sparker
$ npm install
```

Edit the .env file with your database connection info. 
```.env
DB_HOST=localhost
DB_USER=postgres
DB_PASS=password
```

## Entity Relationship Diagram:
<img width="765" alt="SparkerDiagram" src="https://user-images.githubusercontent.com/36554841/148226025-cafecd0b-b9a9-4279-8d4e-6e79987f03eb.png">

## Sequelize User Model:
```ts
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 50],
        },
      },
      salt: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  //Hash Password Before User Creation
  User.beforeCreate(async function (user: UserModel) {
    const salt = crypto.randomBytes(16).toString("hex");
    user.salt = salt;
    const hash = crypto
      .pbkdf2Sync(user.password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    user.password = hash;
  });
      static associate(models: any) {
      //define association here
      User.belongsToMany(models.Project, {
        through: "ProjectBackings",
      });
      User.hasMany(models.Project);
    }
```
## User Routes
- `GET` [`api/users`]()
- `GET` [`api/users/:id`]()
- `PUT` [`api/users/:id`]()
- `DELETE` [`api/users/:id`]()
- `POST` [`api/users/signup`]()
- `POST` [`api/users/login`]()
    ```ts
      export const signup = async (req: Request, res: Response) => {
        try {
          const model = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          };

          try {
            const user = await db.User.create(model);
            console.log("user Created");
            return res.status(201).json(user);
          } catch (error) {
            console.log(error);
            return res.status(500).json(error);
          }
        } catch (error) {
          return res.status(500).json(error);
        }
      };

      export const login = async (req: Request, res: Response) => {
        try {
          let message = "";
          const user = await db.User.findOne({ where: { email: req.body.email } });
          const hash = crypto
            .pbkdf2Sync(req.body.password, user.salt, 1000, 64, `sha512`)
            .toString(`hex`);
          if (hash === user.password) {
            return res.status(200).json(user);
          } else {
            message = "Incorrect Password";
          }

          res.status(401).json(message);
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
      };
    ```

    Sample Response:

    ```json
        {
        "id": "f05b4c56-88ad-4ff0-bd50-435669145ace",
        "name": "Sarah Johnson",
        "email": "sjohnson@gmail.com",
        "password": "7edd54f7c90ef53e685462c625e6175a7d68f3a856cb710d2d581ce282ed0eabc0e31add9573075b1cb9ac2e499da5efb2007daff0ed6d9c8135497c54628115",
        "salt": "81f49c52fa037e0300a7730abadb3558",
        "createdAt": "2022-01-05T13:15:16.159Z",
        "updatedAt": "2022-01-05T13:15:16.159Z",
        "Projects": []
        }
    ```

## Sequelize Project Model

```ts
 Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      goal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      funds: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  static associate(models: any) {
      //define association here
      Project.belongsToMany(models.User, {
        through: "ProjectBackings",
      });
      Project.belongsTo(models.User, {
        foreignKey: "CreatorId",
      });
    }
```
## Project Routes
- `GET` [`api/projects`]()
- `GET` [`api/projects/:id`]()
- `PUT` [`api/projects/:id`]()
- `DELETE` [`api/projects/:id`]()
- `POST` [`api/projects/create`]()

    ```ts
      export const findAll = async (req: Request, res: Response, next: any) => {
        const filter = req.query;
        try {
          const projects = await db.Project.findAll({
            include: {
              model: db.Category,
            },
            where: {
              filter,
            },
          });
          return res.status(200).json(projects);
        } catch (error) {
          return res.status(500).json(error);
        }
      };
      export const create = async (req: Request, res: Response) => {
        try {
          const model = {
            title: req.body.title,
            active: req.body.active,
          };

          try {
            const project = await db.Project.create(model);
            console.log("Project Created");
            return res.status(201).json(project);
          } catch (error) {
            return res.status(500).json(error);
          }
        } catch (error) {
          return res.status(500).json(error);
        }
      };
    ```

    Sample Response:

    ```json
    [{

      "id": 1,
      "title": "Laser Ruler",
      "category": "Technology",
      "description": "Duis tincidunt scelerisque nibh bibendum dapibus. Fusce eget neque venenatis, imperdiet orci quis, tempor felis. Suspendisse sapien turpis, viverra at            commodo quis, facilisis et urna. In viverra elementum tempus. Phasellus quis mauris eros. Quisque interdum, ligula ut ullamcorper pulvinar, diam arcu dignissim ante, in          tincidunt tortor sapien id dolor. Phasellus sem arcu, bibendum eget massa a, facilisis congue felis.",
      "img_url": "https://media.istockphoto.com/photos/laser-measurement-during-renovation-construction-tools-and-equipment-picture-id1175242238?k=20&m=1175242238&s=612x612&w=0&h=oq-HRxWuBl-_oT3RWEEvdewfU_gI_1bJKMfXK3rOEcA=",
      "active": true,
      "goal": "10000",
      "funds": "0",
      "createdAt": "2022-01-05T13:15:16.160Z",
      "updatedAt": "2022-01-05T13:15:16.160Z",
      "CreatorId": "9f2fc5fb-96c4-4945-ba88-07345616719b"

    },
    {
      "id": 2,
      "title": "Electric Cat Food Feeder",
      "category": "Pets",
      "description": "Aenean in lorem eget mauris varius dignissim ac et sapien. Morbi tristique maximus diam in placerat. Donec id dolor volutpat, semper erat non, posuere            nibh. Ut aliquet, ipsum nec dictum tincidunt, justo mi faucibus urna, a facilisis est nulla at mi. Fusce a efficitur eros. Nunc a malesuada risus. Donec tempor sapien            quis leo bibendum luctus. Vestibulum a interdum arcu, suscipit pellentesque justo. Vestibulum feugiat sollicitudin elit, eu tempus velit lacinia at.",
      "img_url": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSn4ueTW4I_qKrJktJgBRgTLST93vV4In_1OKrc_at8JDeVZIuklOsNbeepjVC3g2pr-s-ve3zxcb9oBckmrWZTveVVMaujkPDccqzciXtfzAgSqm4YrMu98A&usqp=CAE",
      "active": false,
      "goal": "6000",
      "funds": "8762.3",
      "createdAt": "2022-01-05T13:15:16.161Z",
      "updatedAt": "2022-01-05T13:15:16.161Z",
      "CreatorId": "f05b4c56-88ad-4ff0-bd50-435669145ace",
  }]
    ```
## Project Backings Sequelize Model

```ts
  ProjectBacking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ProjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProjectBacking",
    }
  );
```
