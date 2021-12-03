const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  name: { type: String },
  review: { type: String },
  img_path: { type: String },
  institute: { type: String },
  rating: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const SubjectSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    qa_seo_details: Object,
    textbook_seo_details: Object,
    total_books: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },

    content: {
      bannerHeading: { type: String },
      askAnExpertText: { type: String },
      collegeTextBooks: { type: String },
      question: {
        heading: { type: String },
        content: { type: String },
      },
      answer: {
        heading: { type: String },
        content: { type: String },        
      },
      feature: {
        mainHeading: { type: String },
        mainContent: { type: String },
        serviceHeading: { type: String },
        serviceContent: { type: String },
        subServiceHeading1: { type: String },
        subServiceContent1: { type: String },
        subServiceHeading2: { type: String },
        subServiceContent2: { type: String },
        subServiceHeading3: { type: String },
        subServiceContent3: { type: String },
        subServiceHeading4: { type: String },
        subServiceContent4: { type: String },
      },
    },
    reviews: [ReviewsSchema],
    qa_content:{
      bannerHeading: { type: String },
      askAnExpertText: { type: String },
      collegeTextBooks: { type: String },
      question: {
        heading: { type: String },
        content: { type: String },
      },
      answer: {
        heading: { type: String },
        content: { type: String },        
      },
      feature: {
        mainHeading: { type: String },
        mainContent: { type: String },
        serviceHeading: { type: String },
        serviceContent: { type: String },
        subServiceHeading1: { type: String },
        subServiceContent1: { type: String },
        subServiceHeading2: { type: String },
        subServiceContent2: { type: String },
        subServiceHeading3: { type: String },
        subServiceContent3: { type: String },
        subServiceHeading4: { type: String },
        subServiceContent4: { type: String },
      },
    },
    qa_reviews : [ReviewsSchema],
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    autoCreate: true,
    autoIndex: true,
  }
);

SubjectSchema.index({ subject_id: 1 }, { unique: false });
module.exports = mongoose.model("Subject", SubjectSchema);
