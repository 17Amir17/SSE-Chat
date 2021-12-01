function userRequest(req, res, next) {
  const user = req.headers.user;
  console.log(user);
}

module.exports = userRequest;
