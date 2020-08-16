const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var multerS3 = require("multer-s3");

const cors = require("cors");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
var graphqlHTTP = require("express-graphql");
const uuid = require("uuid/v4");
const AWS = require("aws-sdk");
const multer = require("multer");
const url = require("url");

require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: "us-east-1",
});

app.get("/diary", function (req, res) {
  console.log("hi");
});

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  buildSchema,
  GraphQLID,
} = require("graphql");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// require routes
const Diary = require("./models/diary.model");

const PersonModel = mongoose.model("users", {
  username: String,
  password: String,
});

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

const ImageType = new GraphQLObjectType({
  name: "Images",
  fields: {
    fieldname: { type: GraphQLString },
    originalname: { type: GraphQLString },
    encoding: { type: GraphQLString },
    mimetype: { type: GraphQLString },
    size: { type: GraphQLString },
    acl: { type: GraphQLString },
    etag: { type: GraphQLString },
    location: { type: GraphQLString },
  },
});

const DiaryType = new GraphQLObjectType({
  name: "Diary",
  fields: {
    username: { type: GraphQLString },
    userID: { type: GraphQLString },
    text: { type: GraphQLString },
    title: { type: GraphQLString },
    image: { type: GraphQLList(ImageType) },
    createdAt: { type: GraphQLString },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "people",
    fields: {
      people: {
        type: GraphQLList(PersonType),
        resolve: (root, args, context, info) => {
          return PersonModel.find().exec();
        },
      },
      person: {
        type: PersonType,
        args: {
          username: { type: GraphQLNonNull(GraphQLString) },
          // id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args, context, info) => {
          return PersonModel.findOne({ username: args.username });
          // return PersonModel.findById(args.id);
        },
      },
      findDuplicate: {
        type: PersonType,
        args: {
          username: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args, context, info) => {
          return PersonModel.findOne({ username: args.username });
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      person: {
        type: PersonType,
        args: {
          username: { type: GraphQLNonNull(GraphQLString) },
          password: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args, context, info) => {
          let person = new PersonModel(args);
          return person.save();
        },
      },
    },
  }),
});

const schemafinduser = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "find user login",
    fields: {
      findUser: {
        type: PersonType,
        args: {
          username: { type: GraphQLNonNull(GraphQLString) },
          password: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args, context, info) => {
          return PersonModel.findOne({
            username: args.username,
            password: args.password,
          });
        },
      },
    },
  }),
});

const schemafindduplicateuser = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "people",
    fields: {
      findDuplicate: {
        type: PersonType,
        args: {
          username: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args, context, info) => {
          return PersonModel.findOne({ username: args.username });
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      person: {
        type: PersonType,
        args: {
          username: { type: GraphQLNonNull(GraphQLString) },
          password: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args, context, info) => {
          let person = new PersonModel(args);
          return person.save().catch((err) => err);
        },
      },
    },
  }),
});

const schemafindduplicatid = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "userID",
    fields: {
      findid: {
        type: PersonType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args, context, info) => {
          return PersonModel.findOne({ _id: args.id });
        },
      },
    },
  }),
});

const schemafinddiaries = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "Find All Diaires related to user",
    fields: {
      finddiaries: {
        type: GraphQLList(DiaryType),
        args: {
          userID: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (root, args, context, info) => {
          return Diary.find({ userID: args.userID });
        },
      },
    },
  }),
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.use(
  "/graphqlfindduplicateuser",
  expressGraphQL({
    schema: schemafindduplicateuser,
    graphiql: true,
  })
);

app.use(
  "/graphqlfinduser",
  expressGraphQL({
    schema: schemafinduser,
    graphiql: true,
  })
);

app.get("testing", (req, res) => {
  Diary.find({ userID: "5ef6b1f26469f3ad8ecb1f9b" });
});

app.use(
  "/graphqlfinduserid",
  expressGraphQL({
    schema: schemafindduplicatid,
    graphiql: true,
  })
);

app.use(
  "/graphqlcreateuser",
  expressGraphQL({
    schema: schemafindduplicateuser,
    graphiql: true,
  })
);

app.use(
  "/graphqlfinddiaries",
  expressGraphQL({
    schema: schemafinddiaries,
    graphiql: true,
  })
);

const root = {
  //     getUsers: (args, req) => queryDB(req, "select * from users").then(data => data),
  hello: () => {
    return "hello World";
  },
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "testing-us-east-testing",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

app.post("/upload", upload.array("image", 10), function (req, res, next) {
  const {
    body: { username, userID, text, title },
  } = req;
  const newDiary = new Diary({
    username,
    userID,
    text,
    title,
    image: req.files,
  });
  newDiary
    .save()
    .then((test) => res.json(test))
    .catch((err) => res.status(400).json("errorPOST" + err));
});
app.post("/deletediaries", function (req, res) {
  Diary.remove({})
    .then((user) => {
      return res.json(user);
    })
    .catch((error) => {
      console.log(error, "error");
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
