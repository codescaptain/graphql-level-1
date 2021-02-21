const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snapSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
//mongoose kayıt etmeden çnce çalışır
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   bcrypt.hash(this.password, 10).then((hash) => {
//     this.password = hash;
//     next();
//   });
// });

module.exports = mongoose.model("Snap", snapSchema);
