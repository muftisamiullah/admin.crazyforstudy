const Book = require('../../models/admin/Book.js');
const Student = require('../../models/student/Student');

const addReview = async (req, res) => {
    try {
        if(req.body.name == ""){
            return res.status(405).json({
                error: true,
                message: "Name can't be empty"
            });
        }
        const student = await Student.findOne({ _id: req.body.userId },{ __v: 0 })
        const content = {rating: req.body.rating,review: req.body.review, userName:req.body.name, image:student.img};
        const filter = {ISBN13: req.params.isbn};
        var Content = await Book.findOne(filter);
        Content.reviews.push(content);
        await Content.save();

        return res.status(201).json({
            error: false,
            message: "Review Added"
        });
    } catch (error) {
        res.status(409).json({
            message: "Error occured",
            errors: error.message
        });
    }
}

module.exports = {
    addReview,
}