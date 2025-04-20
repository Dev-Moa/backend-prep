import express from "express";
import {getAllUsers,getUser,createUsers,updateUsers,deleteUsers} from "../controllers/userController.js"
const router = express.Router();

router.route("/").get(getAllUsers).post(createUsers);
router.route("/:id/").get(getUser).patch(updateUsers).delete(deleteUsers);

export default router;
