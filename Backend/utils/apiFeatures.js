//api features
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    //search features
    // const results = search("cat"); //pattern follow
    // console.log(results);  -->> Output: ["cat", "kittycat", "kitten"]
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i", //case incentive  A and a
            }
        } : {}
        //if keyword present then search case insensitively ,if keyword is not present then find all products
        console.log(keyword)

        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr }
        //we can't copy a object directly(as ti copy the reference and if we change some thing then the original object will be changed) so we use spread to copy.
        //removing field

        //remove some fields for category
        const removeFields = ["keyword", "page", "limit"]; // filter work only for category so removing  those keywords
        removeFields.forEach(key => delete queryCopy[key])

        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy) //convert in string
        // This allows for filtering data based on a range of numbers in MongoDB queries.
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); //in mongodb number should be $
        //   - 'gt' becomes '$gt' (greater than) - 'gte' becomes '$gte' (greater than or equal to)
        //   - 'lt' becomes '$lt' (less than)  - 'lte' becomes '$lte' (less than or equal to)

        this.query = this.query.find(JSON.parse(queryStr)); //convert in obj and then filter 

        return this;
    }
    //pagination
    pagination(resultPerPage) {
        // Extract the current page number from the query string or default to 1
        const currentPage = Number(this.queryStr.page) || 1;
        // Calculate the number of documents to skip based on the current page and the results per page
        const skip = resultPerPage * (currentPage - 1);
        // Apply the limit and skip operations to the MongoDB query
        // This limits the number of results per page and skips the appropriate number of documents
        this.query = this.query.limit(resultPerPage).skip(skip);
        // Return 'this' to allow for method chaining
        return this;

        // Example:
        // If there are 20 products in the database and we want to display 10 products per page:
        // - On page 1, skip 0 products (1 - 1) * 10 = 0, so display the 1st 10 products (indexes 0-9).
        // - On page 2, skip 10 products (2 - 1) * 10 = 10, so display the 11th to 20th products (indexes 10-19).
    }
    
}

module.exports = ApiFeatures;