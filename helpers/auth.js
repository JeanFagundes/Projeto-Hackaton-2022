// eslint-disable-next-line func-names
module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userid;

  if (!userId) {
    res.json("Usuario invalido");
  }

  next();
};
