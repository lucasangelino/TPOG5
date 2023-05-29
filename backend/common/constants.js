require("dotenv").config();

const RoleEnum = ["", "student", "teacher"];

const auth = {
  type: "OAuth2",
  user: "gaxelac@gmail.com",
  clientId: process.env.GMAIL_API_KEY,
  clientSecret: process.env.GMAIL_API_SECRET,
  refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
};

const mailoptions = {
  from: "gaxelac@gmail.com",
  to: "gaxelac@gmail.com",
  subject: "Registracion en proceso",
};


module.exports = {
  auth,
  mailoptions,
  RoleEnum: RoleEnum,
  defaultProfileTeacherImage: "http://res.cloudinary.com/dvjdc3ssy/image/upload/v1668894991/dohnmb6blyd2ei1bjha7.png",
  defaultProfileStudentImage: "https://res.cloudinary.com/dvjdc3ssy/image/upload/v1668894850/rjhj017czkwubzqiw9uu.png",
};
