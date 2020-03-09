const mongoose = require('mongoose');

function dbConnect() {
    const options = {   useUnifiedTopology:true, 
                        useNewUrlParser:true, 
                        useCreateIndex:true,
                        useFindAndModify: false 
                    };
    mongoose.connect(process.env.DB_URL, options, err =>{
        if(err) throw err;
        else console.log('Connected to DB...')
    });
}

module.exports = dbConnect;