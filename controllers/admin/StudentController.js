const Student = require('../../models/student/Student.js');
const TextBooks = require('../../models/admin/TextBook.js');

const getAllStudents = async (req, res) => {
    try {
        let pageno = parseInt(req.params.pageno);
        let limit = parseInt(req.params.limit);
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'itemsList',
            limit: 'perPage',
            page: 'currentPage',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'pageCount',
            pagingCounter: 'slNo',
            meta: 'paginator',
            };
        const options = {
            page: pageno,
            limit: limit,
            customLabels: myCustomLabels,
            collation: {
                locale: 'en',
            },
        };
    
        await Student.paginate({},options).then(result => {
            return res.status(200).json({
                data: result.itemsList,
                itemCount: result.paginator.itemCount,
                perPage: result.paginator.perPage,
                currentPage: result.paginator.currentPage,
                pageCount: result.paginator.pageCount,
                next: result.paginator.next,
                prev: result.paginator.prev,
                slNo: result.paginator.slNo,
                hasNextPage: result.paginator.hasNextPage,
                hasPrevPage: result.paginator.hasPrevPage
            });
        });
    
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

const getAllCollegeTextBooks = async (req, res) => {
    try {
        let pageno = parseInt(req.params.pageno);
        let limit = parseInt(req.params.limit);
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'itemsList',
            limit: 'perPage',
            page: 'currentPage',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'pageCount',
            pagingCounter: 'slNo',
            meta: 'paginator', 
          };
        const options = {
            page: pageno,
            limit: limit,
            customLabels: myCustomLabels,
            collation: {
              locale: 'en',
            },
            sort: {
                created_at: -1 
            }
        };
        let query = {inStock:req.params.filter === "in-stock" ? true : false}  

        await TextBooks.paginate(query, options).then(result => {
            return res.status(200).json({
                data: result.itemsList,
                itemCount: result.paginator.itemCount,
                perPage: result.paginator.perPage,
                currentPage: result.paginator.currentPage,
                pageCount: result.paginator.pageCount,
                next: result.paginator.next,
                prev: result.paginator.prev,
                slNo: result.paginator.slNo,
                hasNextPage: result.paginator.hasNextPage,
                hasPrevPage: result.paginator.hasPrevPage
            });
        });
    } catch (error) {
        console.log(error)
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

const getSingleCollegeTextBooks = async (req, res) => {
    try {
        const query = {inStock:req.params.filter === "in-stock" ? true : false, isbn: req.params.isbn, _id: req.params.id}  
        const tbs = await TextBooks.findOne(query);
        return res.status(200).json({
            data: tbs,
        });
    } catch (error) {
        console.log(error)
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}
const updateSingleCollegeTextBooks = async (req, res) => {
    try {
        console.log(req.body, req.params)
        let update = req.body
        update.inStock = true;
        delete update.user_Id;
        const response = await TextBooks.findByIdAndUpdate({ _id: req.params.id }, update);
        if(response){
            return res.status(201).json({
                message: "Successfull"
            })
        }
    } catch (error) {
        console.log(error)
        res.send({
            error: true,
            code: 501,
            message: error.message
        })
    }
}

module.exports = {
    getAllStudents,
    getAllCollegeTextBooks,
    getSingleCollegeTextBooks,
    updateSingleCollegeTextBooks,
}