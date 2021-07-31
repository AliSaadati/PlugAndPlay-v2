const express = require('express');
const bodyParser = require('body-parser');
// const axios = require('axios');
const path = require('path');

require('dotenv').config()

const app = express();
const mysql = require('mysql');
const {Pool} = require('pg');

const pool = new Pool({
    user: "wtvnabiswstedv",
    password: "d4dea5f25a05e8c0a210838db533ad07e9ec5aeca21a8d1ce460f0575f5e61bf",
    host: "ec2-52-23-45-36.compute-1.amazonaws.com",
    port: 5432,
    database: "d3vb25770p0ub0",
    ssl: {
        rejectUnauthorized: false
      },
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0
    })

// client
//     .connect()
//     .then(() => console.log("Connected Successfully") )
//     .then(() => client.query("Insert into A_TRAINER values ($1, $2, $3)", [10, "Max", 100]))
//     .then(() => client.query("SELECT * FROM A_TRAINER"))
//     .then(results => console.table(results.rows))
//     .catch(e => console.log(e))
//     .finally(() => client.end());

var _ = require('lodash')

function promiseCreator(query) {
    var p = new Promise((resolve, reject) => {
        pool.query(query, (error, result) => {
            if (error) 
                reject(error);
            else 
                resolve(result.rows);
        })

    })
    return p;
}



// Data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/** MySQL Database Connection 
 * 
// Set database connection credentials
const config = {
    host: 'riverstone.czdmfqyowbdq.us-west-1.rds.amazonaws.com',
    user: 'Ali',
    password: 'RiverStone',
    database: 'Riverstone',
    port: '3305'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;
*
*/


// Get list of all columns available 
app.get('/columns', (req, res) => {
    pool.query("select * from view_field;", (error, result) => {
        if (error) console.log(error);

        else res.send(result.rows);
    });
});

// Query all 
app.get('/rows', (req, res) => {
    pool.query("SELECT song.*, genre.name as genre, playlist.name as playlist FROM song INNER JOIN song_genre ON song.id = song_genre.song_id INNER JOIN genre ON genre.id = song_genre.genre_id INNER JOIN song_playlist ON song.id = song_playlist.song_id INNER JOIN playlist ON playlist.id = song_playlist.playlist_id;", (error, result) => {
        if (error) console.log(error);

        else {
            res.send(result.rows);
        }

    });
})

// Return list of all saved Views 
app.get('/views', (req, res) => {
    pool.query("SELECT * FROM view;", (error, result) => {
        if (error) console.log(error);

        else res.send(result.rows);
    });
})

// Return saved View data by View ID
app.get('/view/:id', (req, res) => {

    resObj = {}

    let q1 = `SELECT * FROM view where id = ${req.params.id};`;
    let q2 = `SELECT c.id as "columnID", f.id as "fieldID", f.type as "fieldType" FROM view_column as c left join view_field as f on c.view_field_id=f.id where c.view_id=${req.params.id};`;
    let q3 = `SELECT q.id as "queryID", q.view_field_id as "fieldID", q.operator, q.parameter, f.name as "fieldName", f.type as "fieldType" from view_query as q left join view_field as f on q.view_field_id = f.id where q.view_id =${req.params.id};`;

    (async () => {
        resObj.view = await promiseCreator(q1);
        resObj.columns = await promiseCreator(q2);
        resObj.queries = await promiseCreator(q3);

        res.send(resObj);
    })();

    // runQueries()
    // promiseCreator(q1)
    //     .then(r => { resObj.view = r[0]; return promiseCreator(q2); })
    //     .then(r => { resObj.columns = r; return promiseCreator(q3); })
    //     .then(r => { resObj.queries = r; return res.send(resObj) })
    //     .catch();


})

// Query operator mapping from natural english to SQL syntax
const queryOperatorMapping = {
    'equals': '=',
    'does not equal': '<>',
    'has': 'CONTAINS',
    'does not have': 'NOT CONTAINS',
    'less than': '<',
    'greater than': '>',
    'like': 'LIKE'
}

// Execute SQL query based off of queries in View
app.post('/runQuery', (req, res, next) => {


    let queryList = req.body.queries.map(query => {

        if (query.fieldType === 'text' || query.fieldType === 'varchar')
            return `${query.fieldName} ${queryOperatorMapping[query.operator]} '${query.parameter}'`
        else
            return `${query.fieldName} ${queryOperatorMapping[query.operator]} ${query.parameter}`
    }).join(' and ')

    let sql = `SELECT song.*, genre.name as genre, playlist.name as playlist FROM song INNER JOIN song_genre ON song.id = song_genre.song_id INNER JOIN genre ON genre.id = song_genre.genre_id INNER JOIN song_playlist ON song.id = song_playlist.song_id INNER JOIN playlist ON playlist.id = song_playlist.playlist_id WHERE ${queryList};`

    pool.query(sql, (error, result) => {
        if (error) console.log(error);
        else res.send(result.rows);
    });
})

//********** TODO: COMBINE 'query' INSERT and UPDATE logic into one query using mysql function */

// Save all column and query updates for a selected View
app.post('/save', (req, res, next) => {

    (async () => {

        let id = null;

        // SQL query strings
        let view_q = `SELECT * FROM view WHERE view.name = '${req.body.view.viewName}';`;
        let view_ins_q = `INSERT INTO view (name, type) values ('${req.body.view.viewName}', '${req.body.view.viewType}') ON CONFLICT DO NOTHING;`;
        let view_id_q = `Select id FROM view WHERE name='${req.body.view.viewName}';`;

        // Insert and get id for View by View Name
        promiseCreator(view_q)
            .then(r => { return promiseCreator(view_ins_q); })
            .then(r => { return promiseCreator(view_id_q); })
            .then(async r => {
                id = r[0].id;

                // Column queries
                let columnValueList = req.body.columns.map(column => {
                    return `(${id}, '${column.fieldID}')`
                }).join()

                let columnNotDeleteList = '(' + req.body.columns.map(column => {
                    return `${column.fieldID}`
                }).join() + ')'

                // Insert queries
                let queryInsList = req.body.queries.filter(query => {
                    return query.queryID < 0;
                }).map(query => {
                    return `(${id}, '${query.fieldID}', '${query.operator}', '${query.parameter}')`
                }).join()

                let queryUpdateList = req.body.queries.filter(query => {
                    return query.queryID > 0;
                }).map(query => {
                    return `(${query.queryID}, ${id}, '${query.fieldID}', '${query.operator}', '${query.parameter}')`
                }).join()

                let queryNotDeleteList = '(' + req.body.queries.map(query => {
                    return `${query.queryID}`
                }).join() + ')'

                let column_ins_q = `INSERT INTO view_column (view_id, view_field_id) values ${columnValueList}`;
                let column_del_q = `DELETE FROM view_column WHERE view_id=${id} AND view_field_id not in ${columnNotDeleteList}`

                let column_del_all_q = `DELETE FROM view_column WHERE view_id=${id}`

                let query_del_q = `DELETE FROM view_query WHERE view_id=${id} AND view_field_id not in ${queryNotDeleteList}`;

                let query_del_all_q = `DELETE FROM view_query WHERE view_id=${id}`;

                let query_ins_q = `INSERT INTO view_query (view_id, view_field_id, operator, parameter) values ${queryInsList};`;

                let query_upd_q = `INSERT INTO view_query (id, view_id, view_field_id, operator, parameter) values ${queryUpdateList} ON DUPLICATE KEY UPDATE view_field_id = values(view_field_id), operator=values(operator), parameter= VALUES(parameter);`

                if (req.body.columns.length > 0) {
                    await promiseCreator(column_del_q);
                    await promiseCreator(column_ins_q);
                }
                else {
                    await promiseCreator(column_del_all_q);
                } 

                if (req.body.queries.length > 0) {
                    await promiseCreator(query_del_q);
                    if (req.body.queries.filter(q => q.queryID < 0).length > 0)
                        await promiseCreator(query_ins_q);
                    if (req.body.queries.filter(q => q.queryID > 0).length > 0)
                        await promiseCreator(query_upd_q);
                }
                else {
                    await promiseCreator(query_del_all_q);
                }
                res.status(200).json({ status: "ok" })
            })
            .catch(console.log("Error!"))
    })();

})

// Delete View
app.delete('/delete-view', (req, res) => {
    pool.query(`DELETE FROM view WHERE id=${req.body.view.viewID};`, (error, result) => {
        if (error) console.log(error);
        else res.send(result.rows);
    })
})

// Save new View
app.post('/save-query-as', (req, res, next) => {
    pool.query("SELECT * FROM view WHERE UPPER(view.name) = UPPER(${req.body.view.name});", (error, result) => {
        if (error) console.log(error);

        else if (result.length > 0) {

        }
    })
})

app.use(express.static(`${__dirname}/application/build`));
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '/application/build/index.html')); })

console.log(process.env)

const PORT = process.env.PORT || 3001;

console.log(PORT)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
