const app = require('./app')
const database = require('./models').database;

// Sync all models that aren't already in the database
(async () => {
    await database.sync(); 
    console.log("all tables synchonised")
})();

app.listen(3000,() => {
	console.log(`server listening on port 3000`)
})
