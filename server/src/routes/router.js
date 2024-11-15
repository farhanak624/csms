const { Router } = require("express");
const userController = require("../users/controllers/controller");

const router = Router();

router.post("/login", userController.login);
router.post("/signup", userController.createUser);
router.get("/search", userController.verifyToken, userController.searchUser);
router.post("/applicant-register",userController.verifyToken,userController.applicantRegister )
router.get("/get-applicant-data",userController.verifyToken,userController.getUsers)

module.exports = router;
