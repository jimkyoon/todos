const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// userSchema.pre('save', function (next) {
//   const user = this;
//   bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
//     if (err) return next(err);
//     user.password = hash;
//     next();
//   });
// });

// userSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err, false);
//     return cb(null, isMatch);
//   });
// };

module.exports = mongoose.model('User', userSchema);
