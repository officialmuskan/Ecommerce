class ApiFeatures{
    constructor(query, queryStr){
        this.query=query
        this.queryStr= queryStr
    }
    search(){
        const keyword = this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            }
        }:{}
        this.query = this.query.find({...keyword})
        return this
    }
    filter(){
        const queryCopy = {...this.queryStr};
        console.log(queryCopy)
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach(key=>delete queryCopy[key])
        console.log(queryCopy)
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, key=>`$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this;

    }
    pagination(resultperpage){
        const currentPage = Number(this.queryStr.page) || 1
        const skip = (currentPage - 1)*resultperpage
        this.query = this.query.limit(resultperpage).skip(skip)
        return this

    }
}
module.exports = ApiFeatures