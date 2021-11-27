const SubSubject = require("../../models/admin/SubSubject.js");
const csv = require("csv-parser");
const fs = require("fs");

const AllSubSubject = async (req, res) => {
  try {
    const Subjects = await SubSubject.find(
      { subject_id: req.params.subject_id },
      { __v: 0 }
    ).sort({
      sub_subject: 1,
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

const createSubSubject = async (req, res) => {
  const data = req.body;
  const sub_subject = data.sub_subject;
  const SubSubjectData = sub_subject.split(",");
  let FinalData = [];

  try {
    await SubSubjectData.forEach((sub) => {
      FinalData.push({
        status: 1,
        subject_id: data.subject_id,
        subject: data.subject,
        sub_subject: sub,
      });
    });

    await SubSubject.insertMany(FinalData)
      .then(
        res.status(201).json({
          messgae: "Sub subject Inserted",
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

const uploadSubSubject = async (req, res) => {
  // return res.send(req.file);
  const data = req.body;
  let FinalData = [];

  try {
    let results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data.subsubject))
      .on("end", () => {
        results.forEach((sub) => {
          FinalData.push({
            status: 1,
            subject_id: data.subject_id,
            subject: data.subject,
            sub_subject: sub,
          });
        });
        otherFunction(res, FinalData, function () {
          console.log(req.file.path);
          fs.unlinkSync(req.file.path);
        });
      });
  } catch (error) {
    return res.status(409).json({
      message: "Error occured",
      errors: error.message,
    });
  }
};

const SaveContent = async (req, res) => {
  try {
    await SubSubject.findByIdAndUpdate(
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
    await SubSubject.findById(req.params.id, { content: 1 })
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
    req.body.img_path = req.file && req.file.filename ? req.file.filename : "";
    const item = await SubSubject.findById(req.params.id);
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
    await SubSubject.find(
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
    req.body.img_path =
      req.file && req.file.filename ? req.file.filename : req.body.img_path;
    await SubSubject.updateMany(
      { _id: req.params.id, "reviews._id": req.params.reviewId },
      { $set: { "reviews.$[e]": req.body } },
      {
        arrayFilters: [{ "e._id": req.params.reviewId }],
      }
    )
      .then((response) => {
        return res.status(202).json({
          message: "Review successfully updated",
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
      
      await SubSubject
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
  

const otherFunction = async (res, FinalData, callback) => {
  await SubSubject.insertMany(FinalData)
    .then(() => {
      res.status(200).send("Sub subject Inserted");
      callback();
    })
    .catch((error) => {
      res.status(409).json({
        message: "Error occured while Inserting Data",
        errors: error.message,
      });
    });
};

const updateSubSubject = async (req, res) => {
  try {
    await SubSubject.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((response) => {
        return res.status(201).json({
          message: "SubSubject, Updated",
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

const updateQASeoSubSubject = async (req, res) => {
  console.log("req: " + JSON.stringify(req.body));
  try {
    await SubSubject.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { qa_seo_details: req.body } }
    )
      .then((response) => {
        return res.status(202).json({
          message: "sub subject, Updated successfully33",
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

const updateTextBookSeoSubSubject = async (req, res) => {
  console.log("req: " + JSON.stringify(req.body));
  try {
    await SubSubject.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { textbook_seo_details: req.body } }
    )
      .then((response) => {
        return res.status(202).json({
          message: "sub subject, Updated successfully33",
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

const getAllSubSubject = async (req, res) => {
  try {
    const Subjects = await SubSubject.find({ status: true }, { __v: 0 });
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

const deleteSubSubject = async (req, res) => {
  const id = req.params.id;
  try {
    await SubSubject.deleteOne({ _id: id }).then((response) => {
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

const viewSubSubject = async (req, res) => {
  try {
    const Subject = await SubSubject.findOne(
      { _id: req.params.id },
      { __v: 0 }
    );
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
  AllSubSubject,
  getAllSubSubject,
  createSubSubject,
  uploadSubSubject,
  updateSubSubject,
  deleteSubSubject,
  viewSubSubject,
  updateQASeoSubSubject,
  updateTextBookSeoSubSubject,
  SaveContent,
  getContent,
  SaveReviews,
  getReview,
  updateReview,
  deleteReview
};
