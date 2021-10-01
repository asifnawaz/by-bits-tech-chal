import express from "express"
import Wireframe from "./Wireframe.js"
import UserFrame from "./Userstory.js"
import Userstory from "../Userstory.js"


const router = express.Router()

router.route("/").get(Wireframe)
router.route("/userstory").get(Userstory.getUserStory)

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router