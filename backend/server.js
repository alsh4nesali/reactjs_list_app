const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

app.use(cors({}));

const mydb = new sqlite3.Database('./todolistdb.db', (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to database');
    }
})


app.get('/Home', (req, res) => {
    const userId = req.query.userId;
    const sql = 'SELECT * FROM tbl_list WHERE user_id = ? ORDER BY order_index'; // Order by the saved index
    mydb.all(sql, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(rows);
    });
});


app.post('/addTask', (req, res) => {
    const { task, status, description, user_id, taskDate } = req.body;
    const sql = "INSERT INTO tbl_list (task, status, description, date_added, user_id) VALUES ( ?, ?,?, ?,?)";
    const value = [task, status, description, taskDate, user_id];

    mydb.run(sql, value, function(error) {
        if (error) {
            console.error("SQL Error: ", error.message);
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
  

app.put('/Home/saveOrder', (req, res) => {
    const userId = req.query.userId;
    const orderedList = req.body;

    // Use a SQL transaction to update the order_index for each item in orderedList
    const updateOrderQueries = orderedList.map((item, index) => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE tbl_list SET order_index = ? WHERE id = ? AND user_id = ? AND status != 3';
            mydb.run(sql, [index, item.id, userId], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    // Run all updates in parallel and send a response once done
    Promise.all(updateOrderQueries)
        .then(() => res.json({ message: 'Order saved successfully' }))
        .catch(error => {
            console.error("Failed to save order:", error);
            res.status(500).json({ message: 'Failed to save order', error });
        });
});




app.listen(8081, () => {
    console.log('Listening on port 8081');
    console.log("HOLA");
});