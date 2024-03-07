const mongoose = require("mongoose");

const connectDatabase = () =>{
    main()
    .then(() => {
        console.log("Connection is successfully established");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Github-E-Commerce');
}
}

module.exports = connectDatabase


