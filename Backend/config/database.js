const mongoose = require("mongoose");

const connectDatabase = () =>{
    main()
    .then(() => {
        console.log("Connection is successfully established");
    })
    // .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URL);

}
}

module.exports = connectDatabase


