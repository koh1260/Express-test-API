const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const user_id = req.body.user_id;

  db.query("SELECT follower from follow where following = ?", user_id,(err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).send("Bad request");
    };
      let query = "";
      for (let i = 0; i < Object.keys(rows).length; i++) {
        query += `SELECT * FROM post WHERE user_id = ${rows[i].follower};`;
      }
      db.query(query, (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(400).send("Bad request");
        }
        const newa = [];
        for(let i = 0; i < rows.length; i++){
            newa.push(...rows[i]);
        }
        return res.status(200).json(newa);
      });
    }
  );
});

module.exports = router;
