const body_parser = require('body-parser'),
    express = require('express'),
    flags = require('flags'),
    sqlite3 = require('sqlite3').verbose(),
    fs = require('fs');

var app = express();

app.use(require('cors')());
app.use(body_parser.json());

flags.defineBoolean('debug');
flags.parse();

if (flags.get('debug')) {
	console.log('Running in debug mode');
	var debug = true;
}

function connectDB() {
    let db = new sqlite3.Database('./dn.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        if (debug) {console.log('Connected to the datanation database.');}
    });
	return db;
}

function closeDB(db) {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        if (debug) {console.log('Close the database connection.');}
    });
}

// files POST
app.post('/files', function(req, res) {
    if (debug) {console.log(req.body);}

	let db = connectDB();

    db.run(`INSERT INTO FILES(fileLink,fileName,fileType,fileCategory,fileUploadedTimestamp,fileUploadedUser,fileSize,fileDescription) VALUES(?,?,?,?,?,?,?,?)`, [req.body.fileLink, req.body.fileName, req.body.fileType, req.body.fileCategory, req.body.fileUploadedTimestamp, req.body.fileUploadedUser, req.body.fileSize, req.body.fileDescription], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        if (debug) {console.log(`A row has been inserted with rowid ${this.lastID}`);}
        res.sendStatus(200)
    });

    closeDB(db);
})

// files DELETE
app.get('/files/delete', function(req, res) {
    if (debug) {console.log(req.body);}

	let db = connectDB();

    db.run(`DELETE FROM FILES WHERE fileLink=?`, [req.query.fileLink], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        if (debug) {console.log(`A row has been deleted with rowid ${this.lastID}`);}
        res.sendStatus(200)
    });
    closeDB(db);
})

// files DEAD
app.post('/files/dead', function(req, res) {
    if (debug) {console.log(req.body);}

	let db = connectDB();

    db.run(`UPDATE FILES SET fileDead=? WHERE fileLink=?`, [req.body.fileDead, req.body.fileLink], function(err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        if (debug) {console.log(`A row has been updated with rowid ${this.lastID}`);}
        res.sendStatus(200)
    });
    closeDB(db);
})

// files GET
app.get('/files', function(req, res) {
    let db = connectDB();
    if (req.query.fileLink) {
        db.serialize(() => {
            db.get(`SELECT * FROM FILES WHERE fileLink=?`, [req.query.fileLink], (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (debug) {console.log("Someone Requested a single row");}
                res.send(row);
            });
        });

        console.log('Requesting a single file')
    } else {
        db.serialize(() => {
            db.all(`SELECT fileLink,fileName,fileType,fileDescription FROM FILES`, (err, rows) => {
                if (err) {
                    console.error(err.message);
                }
                if (debug) {console.log("Someone Requested all rows");}
                res.send(rows);
            });
        });
    }
    closeDB(db);
    })

// start the server
var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Skylink repo app listening at http://%s:%s", host, port)
})
