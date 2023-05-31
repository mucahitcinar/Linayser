import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
  linkedinId: {
    type: String,
    required: false,
    unique: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"]
  },
  profilePicture: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: false,
  },
  experience: {
    type: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    required: false,
  },
  education: {
    type: [
      {
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    required: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;