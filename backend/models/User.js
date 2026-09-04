const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    role: {
      type: String,
      enum: ["donor", "recipient"],
      required: true,
    },

    donorType: {
      type: String,
      enum: [
        "Restaurant",
        "Wedding Organizer",
        "Marriage Hall",
        "Birthday Party",
        "Corporate Event",
        "Individual",
      ],
      default: null,
    },

    recipientType: {
      type: String,
      enum: ["NGO", "Orphanage", "Old Age Home"],
      default: null,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    avatar: {
    type: String,
    default: null,
    },

avatarPublicId: {
  type: String,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

/*
=========================================
Hash Password Before Saving
=========================================
*/
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/*
=========================================
Compare Password
=========================================
*/
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);