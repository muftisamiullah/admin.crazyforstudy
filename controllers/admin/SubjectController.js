const subject = require("../../models/admin/Subject.js");
const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });
const mongoose = require("mongoose");

const getAllSubject = async (req, res) => {
  try {
    const Subjects = await subject.find({}, { __v: 0 }).sort({
      subject: 1,
    });
    return res.status(200).json({
      total: Subjects.length,
      data: Subjects,
    });
  } catch (error) {
    res.status(409).json({
      message: "Error occured",
      errors: error.message,
    });
  }
};
const createSubject = async (req, res) => {
  const data = req.body;
  const subject_name = data.subject;
  const SubjectData = subject_name.split(", ");
  let FinalData = [];

  try {
    await SubjectData.forEach((sub) => {
      FinalData.push({ subject: sub });
    });

    await subject
      .insertMany(FinalData)
      .then(
        res.status(201).json({
          messgae: "subject Inserted",
        })
      )
      .catch((error) => {
        res.status(409).json({
          message: "Error occured while Inserting Data",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: "Error occured",
      errors: error.message,
    });
  }
};
const updateSubject = async (req, res) => {
  console.log("req: " + JSON.stringify(req.body));
  try {
    await subject
      .findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((response) => {
        return res.status(202).json({
          message: "subject, Updated successfully33",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error Found",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const SaveContent = async (req, res) => {
  try {
    await subject
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { content: req.body } }
      )
      .then((response) => {
        return res.status(202).json({
          message: "Content, Successfully Saved",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error Found",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const getContent = async (req, res) => {
  try {
    await subject
      .findById(req.params.id, { content: 1 })
      .then((response) => {
        return res.status(202).json({
          message: "Content Found",
          data: response,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error Found",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const SaveReviews = async (req, res) => {
  try {
    
    req.body.img_path = req.file && req.file.filename ? req.file.filename : ''
    const item = await subject.findById(req.params.id);
    if (item && item.reviews) {
      if (item.reviews.length < 5) {
        item.reviews.push(req.body);
      } else {
        return res.status(400).json({
          message: "Can not add more reviews",
          errors: "Error",
        });
      }

      await item.save().then((result) => {
        res.status(202).json({
          message: "Review saved successfully!",
          data: req.body,
        });
      });
    } else {
      return res.status(500).json({
        message: "Could not found record",
        errors: "Error",
      });
    }
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const getReview = async (req, res) => {
  try {
    console.log(req.params);
    await subject
      .find(
        { _id: req.params.id },
        { reviews: { $elemMatch: { _id: req.params.reviewId } } }
      )
      .then((response) => {
        return res.status(202).json({
          message: "Review Found",
          data: response,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error Found",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    req.body.img_path = req.file && req.file.filename ? req.file.filename : req.body.img_path    
    await subject
      .updateMany(
        { _id: req.params.id, "reviews._id": req.params.reviewId },
        { $set: { "reviews.$[e]": req.body } },
        {
          arrayFilters: [{ "e._id": req.params.reviewId }],
        }
      )
      .then((response) => {
        return res.status(202).json({
          message: "Review Found",
          data: response,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error Found",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    
    await subject
      .updateMany(
        { _id: req.params.id, "reviews._id": req.params.reviewId },
        { $pull:  {"reviews":{"_id": req.params.reviewId } } },
        
      )
      .then((response) => {
        return res.status(202).json({
          message: "Review Deleted",
          data: response,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error Found",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const updateQASeoSubject = async (req, res) => {
  console.log("req: " + JSON.stringify(req.body));
  try {
    await subject
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { qa_seo_details: req.body } }
      )
      .then((response) => {
        return res.status(202).json({
          message: "subject, Updated successfully33",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error Found",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const updateTextBookSeoSubject = async (req, res) => {
  console.log("req: " + JSON.stringify(req.body));
  try {
    await subject
      .findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { textbook_seo_details: req.body } }
      )
      .then((response) => {
        return res.status(202).json({
          message: "subject, Updated successfully33",
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error Found",
          errors: error.message,
        });
      });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

const deleteSubject = async (req, res) => {
  const id = req.params.id;
  try {
    await subject.deleteOne({ _id: id }).then((response) => {
      return res.status(201).json({
        message: "subject, deleted successfully",
      });
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
const viewSubject = async (req, res) => {
  try {
    const Subject = await subject.findOne({ _id: req.params.id }, { __v: 0 });
    return res.status(200).json({
      data: Subject,
    });
  } catch (error) {
    res.status(409).json({
      message: "Error occured",
      errors: error.message,
    });
  }
};

module.exports = {
  getAllSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  viewSubject,
  updateQASeoSubject,
  updateTextBookSeoSubject,
  SaveContent,
  getContent,
  SaveReviews,
  updateReview,
  getReview,
  deleteReview
};
