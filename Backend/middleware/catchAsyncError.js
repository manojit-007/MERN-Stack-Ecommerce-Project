//when we req some thing to the server like add product . If we miss something during data entry then due to async func it continue the process and the process never end so we have to use some func to handle the error.

//this is work as a try catch . Here it check those error in url (enter data, id check during details and many more)

module.exports = reqHandler =>(req,res,next) =>{
    Promise.resolve(reqHandler(req,res,next)).catch(next)
}
