const express = require("express");
const router = express.Router();

// GET/todo -> get all todos
router.get("/", (req, res) => {
  req.conn.query("SELECT * FROM todoapi", (error, result) => {
    if (error) {
      res.status(500).send("Error while retrieving todos.");
    }
    result.rows.length > 0
      ? res.json(result.rows)
      : res.json("There are no todos.");
  });
});

// POST/todo -> add new todo (Form url or JSON)
router.post("/", (req, res) => {
  const todo = req.body.title;
  req.conn.query(
    "INSERT INTO todoapi (title) VALUES ($1)",
    [todo],
    (error, result) => {
      if (error) {
        res.status(500).send("Error while adding todo.");
      }
      res.json("Todo inserted successfully.");
    }
  );
});

// PATCH/PUT -> to update todo on given ID
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const title = req.body.title;
  req.conn.query(
    "UPDATE todoapi SET title=$1 WHERE id=$2",
    [title, id],
    (error, result) => {
      if (error) {
        res.status(500).send("Error while updating todo.");
      }
      result.rowCount > 0
        ? res.json("Todo updated successfully.")
        : res.json("No todo found with provided ID.");
    }
  );
});

// DELETE -> remove particular todo on given id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  req.conn.query("DELETE FROM todoapi WHERE id=$1", [id], (error, result) => {
    if (error) {
      res.status(500).send("Error while deleting todo.");
    }
    result.rowCount > 0
      ? res.json("Todo deleted successfully.")
      : res.json("No todo found with provided ID.");
  });
});

// GET/todo/:id -> return only todo which id matched
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  req.conn.query("SELECT * FROM todoapi WHERE id=$1", [id], (error, result) => {
    if (error) {
      res.status(500).json("Error while retrieving todo.");
    }
    result.rows.length > 0
      ? res.json(result.rows)
      : res.json("No todo found with provided ID.");
  });
});

module.exports = router;
