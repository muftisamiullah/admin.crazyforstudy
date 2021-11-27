const mongoose = require("mongoose");

const SubSubjectSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  sub_subject: {
    type: String,
    required: true,
    unique: true,
  },
  qa_seo_details: Object,
  textbook_seo_details: Object,
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  content: {
    bannerText: { type: String, required: true },
    questionHeading: { type: String, required: true },
    questionSubHeading: { type: String, required: true },
    aboutHeading: { type: String, required: true },
    aboutContent: { type: String, required: true },   
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SubSubject", SubSubjectSchema);
