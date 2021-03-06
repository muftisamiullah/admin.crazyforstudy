const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ChapterSchema = new mongoose.Schema(
  {
    old_qid: { type: String },
    section_id: { type: String },
    sub_section_id: { type: String },
    source: { type: String },
    sequence: { type: Number },
    book_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    book_name: {
      type: String,
      required: true,
    },
    book_isbn: {
      type: String,
      required: true,
    },
    chapter_no: {
      type: String,
    },
    chapter_name: {
      type: String,
    },

    section_no: {
      type: String,
    },
    section_name: {
      type: String,
    },
    excerise: {
      type: String,
    },
    problem_no: {
      type: String,
    },
    question: {
      type: String,
    },
    image: {
      type: String,
    },
    answer: {
      type: String,
    },
    another_answer: {
      type: String,
    },
    expert_answer: {
      type: String,
    },
    answer_uploaded: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    flag: {
      type: String,
      default: "notassigned",
    },
    temp_answer: {
      type: String,
    },
    option: {
      type: String,
    },
    assigned_at: {
      type: Date,
    },
    assigned_to: {
      type: mongoose.Schema.ObjectId,
    },
    tutor_name: {
      type: String,
    },
    answerRequestedIds: {
      type: Array,
    },
    answerFlag: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    autoCreate: true, // auto create collection
    autoIndex: true, // auto create indexes
  }
);

ChapterSchema.plugin(mongoosePaginate);
ChapterSchema.index({ answerFlag: 1}, { unique: false });
ChapterSchema.index({ book_isbn: 1 }, { unique: false });
ChapterSchema.index({ book_id: 1 }, { unique: false });
ChapterSchema.index({ book_isbn: 1 ,chapter_no:1 }, { unique: false });
ChapterSchema.index({ assigned_to: 1 }, { unique: false });
ChapterSchema.index({ question: "text" }, { unique: false });

module.exports = mongoose.model("Chapter", ChapterSchema);
