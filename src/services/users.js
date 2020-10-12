import UserSchema from "../models/users.js";

function login(req, res) {
  const { email, password } = req.body;
  UserSchema.findOne({ email }).exec((err, user) => {
    if (err) return res.status(500).send({ message: "An error occured" });
    if (!user) {
      return res.status(400).send({ message: "The username does not exist" });
    }
    user.comparePassword(password, (error, match) => {
      if (!match) {
        res.status(400).send({ message: "The password is invalid" });
      } else if (match) {
        res.status(200).send({
          message: "The username and password combination is correct!",
        });
      }
    });
  });
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

export { login, register };
