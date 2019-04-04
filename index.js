/* eslint-disable no-console */
'use strict'
const express = require('express')
const bodyp = require('body-parser')
//const sqlite = require('sqlite3')
const {Client } = require('pg')
const app = express()
//Set by express
let webport = process.env.PORT || 8080;
const client = new Client({connectionString: `${process.env.DATABASE_URL}`|| null})
console.log(`${process.env.DATABASE_URL || null}`);
client.connect(e=>{
    console.log(`Connection error : ${e} )`)
})




app.use(bodyp.urlencoded({
    extended: true
}));
app.use(bodyp.json())


const favicon = new Buffer.from('AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD8HwAA++8AAPf3AADv+wAA7/sAAP//AAD//wAA+98AAP//AAD//wAA//8AAP//AAD//wAA', 'base64'); 
app.get("/favicon.ico", function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Length', favicon.length);
    res.setHeader('Content-Type', 'image/x-icon');
    res.setHeader("Cache-Control", "public, max-age=2592000");                // expiers after a month
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    res.end(favicon);
});


app.param('action',(req,res,next,action)=>{
    switch(action){
        case 'list':
            req.action = 'list'
        break;
        case 'update':
            req.action = 'update'
        break;
        default:
            next(new Error("NUU ;-;"))

    }
    next()
})



//register user
app.put('/users',(req,res,next)=>{
    //console.log(req.body.pass)
    // Register to SQL
    res.json({"okay":"100","recorded":`${req.body.user}`})
})

//modify user data
app.post('/users/:id/:action',(req,res,next)=>{
    // Check action, and do it
})

app.get('/users/:id',(req,res,next)=>{
    res.json({
        "okay": "100",
        "action": `${req.params.id}`
    })
})

app.get('/',express.static('media'));


// 404
app.use((req,res)=>{
    res.status(404).json({
        "okay": `404`
    })
})


// Error Handle
app.use((err,req,res)=>{
    res.status(500).json({"okay": `500`,"error": `${err}`})
    //res.end();
})

app.listen(webport);
