import mongoose from "mongoose";
import UserSchema from "../models/users.js";
// import generate_token from "../helpers/generate_token";

function login(req, res) {
  res.send("Welcome to the login");
  // const { username, password } = req.body;
  // UserSchema.findOne({ username }).exec((err, user) => {
  //   if (err) res.status(400).send({ message: "An error occured" });
  //   else if (user) {
  //     if (user.password == password) {
  //       var token = generate_token(username, user._id, user.role);
  //       res
  //         .status(200)
  //         .send({ message: "user login successful", token: token });
  //     } else {
  //       res.status(400).send({ message: "Wrong password" });
  //     }
  //   } else res.status(400).send({ message: "username is not registered" });
  // });
}

function register(req, res) {
  const user = new UserSchema();
  const {
    name: { first_name, last_name },
    email,
    password,
  } = req.body;
  UserSchema.findOne({ email }).exec((err, existing_user) => {
    console.log(existing_user, err);
    if (err) res.status(400).send({ message: "An error occured" });
    else if (existing_user) {
      res.status(400).send({ message: `email: ${email} already exists` });
    } else {
      user.name = { first_name, last_name };
      user.email = email;
      user.password = password;
    }

    user
      .save()
      .then((item) => {
        //         var token = generate_token(username, item._id, user.role);
        res.status(200).send({
          message: `Account for ${email} created`,
          //           token: token,
        });
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });
}

// getUser(req, res) {
//   if (req.params.id) {
//     let id = req.params.id;
//     if (req.user_id == id || req.role == "admin") {
//       UserSchema.findById(id).exec((error, user) => {
//         if (error) res.status(400).send({ message: "An error occured" });
//         else if (user) {
//           res
//             .status(200)
//             .send({ message: `User fetched successfully`, data: user });
//         }
//       });
//     } else
//       return res
//         .status(403)
//         .send({ message: "Not authorized to access the method" });
//   } else if (req.role == "admin") {
//     UserSchema.find().exec((err, users) => {
//       if (err) res.status(400).send({ message: "An error occured" });
//       else if (users) {
//         res
//           .status(200)
//           .send({ message: `Users fetched successfully`, data: users });
//       }
//     });
//   } else
//     return res
//       .status(403)
//       .send({ message: "Only admins have access to this method" });
// }

//   updateUser(req, res) {
//     const user = new UserSchema();
//     let id = req.params.id;
//     const { role } = req.body;

//     UserSchema.findById(id).exec((error, user) => {
//       if (user) {
//         if (req.user_id == id) {
//           if (role) {
//             return res
//               .status(403)
//               .send({ message: "User not allowed to modify a role" });
//           } else {
//             UserSchema.findByIdAndUpdate(id, req.body).exec((error, user) => {
//               if (error) res.status(400).send({ message: "An error occured" });
//               else if (!error)
//                 res.status(200).send({ message: "user data updated" });
//             });
//           }
//         } else if (req.role == "admin") {
//           UserSchema.findByIdAndUpdate(id, req.body).exec((error, user) => {
//             if (error) res.status(400).send({ message: "An error occured" });
//             else if (user)
//               res.status(200).send({ message: "user upgraded to admin" });
//           });
//         } else {
//           return res.status(403).send({ message: "not authorised" });
//         }
//       } else if (error) res.status(400).send({ message: "An error occured" });
//       else res.status(404).send({ message: "user not found" });
//     });
//   }
// }

export { login, register };
