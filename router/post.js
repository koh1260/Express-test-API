const express = require("express");
const router = express.Router();
// const db = require("../db");
const { postsView } = require("../post/controllers");

// function getPostSearchQuery(rows) {
//   let query = "";
//   for (let i = 0; i < Object.keys(rows).length; i++) {
//     query += `SELECT * FROM post WHERE user_id = ${rows[i].follower};`;
//   }
//   return query;
// }
// function postArrayConcat(rows) {
//   const posts = [];
//   for (let i = 0; i < rows.length; i++) {
//     posts.push(...rows[i]);
//   }

//   return posts;
// }

// router.post("/", (req, res) => {
//   const user_id = req.body.user_id;

//   db.query(
//     "SELECT follower FROM follow WHERE following = ?",
//     user_id,
//     (err, rows) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).send("Bad request");
//       }
//       const query = getPostSearchQuery(rows);
//       db.query(query, (err, rows) => {
//         if (err) {
//           console.log(err);
//           return res.status(400).send("Bad request");
//         }
//         const posts = postArrayConcat(rows);
//         return res.status(200).json(posts);
//       });
//     }
//   );
// });

router.post('/test', (req,res) => {
    postsView(req, res);
});

module.exports = router;
