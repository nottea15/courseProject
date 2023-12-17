import express from "express";

import authentication from "./authentication";
import users from "./users";
import intersection from "./intersection";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  intersection(router);
  return router;
};
