const express = require("express");
const router = express.Router();

// GET/todo -> get all todos
// POST/todo -> add new todo (Form url or JSON)
// PATCH/PUT -> to update todo on given ID
// DELETE -> remove particular todo on given id
// GET/todo/:id -> return only todo which id matched

router.get("/", (req, res) => {
  res.status(200).json([
    {
      firstName: "Prashil",
      lastName: "Aryal",
    },
  ]);
});

// router.get("/:id", (req, res) => {
//   console.log(req.params);

//   res.status(200).json([
//     {
//       firstName: "Prashil",
//       lastName: "aryal",
//     },
//   ]);
// });
module.exports = router;
