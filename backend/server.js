const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

app.use(cors({}));

const mydb = new sqlite3.Database('./my-database.db', (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to database');
    }
})


app.get('/Home', (req, res) =>{
    const sql = 'SELECT * FROM tbl_list';
    mydb.all(sql, (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(rows);
    })
})

app.post('/addTask', (req, res) => {
    const { task, status, description, uid } = req.body;
    const sql = "INSERT INTO tbl_list (task, status, description, user_id) VALUES ( ?, ?, ?,?)";
    const value = [task, status, description, uid];

    mydb.run(sql, value, function(error) {
        if (error) {
            return res.status(500).json(error);
        }
        return res.json({ id: this.lastID });
    });
});

app.delete('/Home/:id', (req, res) => {
    const sql = 'DELETE FROM tbl_list WHERE id = ?';
    const id = req.params.id;

    mydb.run(sql, [id], function(error) {
        if (error) {
            return res.status(500).json(error);
        }
        return res.json({ message: 'Task deleted', changes: this.changes });
    })

})


app.post('/', (req, res) => {
    const sql = "SELECT id FROM tbl_user WHERE `email` = ? AND `password` = ?";
  
    mydb.all(sql, [req.body.email, req.body.password], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error", error: err });
      }
      // Check if user exists
      if (rows.length > 0) {
        const user = rows[0];
        return res.json({
            message: "success",
            userId: user.id,
        })
      } else {
        // Send response when credentials are invalid
        return res.status(401).json({ message: "Invalid email or password" });
      }
    });
  });
  


app.listen(8081, () => {
    console.log('Listening on port 8081');
    console.log("HOLA");
});