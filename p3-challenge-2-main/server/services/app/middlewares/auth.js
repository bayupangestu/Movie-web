const { readToken } = require("../helper/jwt");
const { User, Product } = require("../models/");

async function authentication(req, res, next) {
  try {
    const { accesstoken } = req.headers;
    //Cek token valid atau tidak
    const payload = readToken(accesstoken);

    //Cek data user valid atau tidak
    //Sebenernya blm paham process dibawah utk apa
    //Mungkin biar lebih aman payload yang di sign adalah id dan email, agar process dibawah jadi lebih berguna, hacker mesti nyocokin id dan email, gacuma id doang.
    //lagi pula di soal email juga diminta unique
    const userTrue = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });
    if (!userTrue) {
      throw "TokenError";
    }

    req.accessedUser = {
      id: userTrue.id,
      email: userTrue.email,
      name: userTrue.username,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function isAdmin(req, res, next) {
  const { id } = req.params;
  try {
    // const productById = await Product.findByPk(id);
    // if (!productById) {
    //   throw "DataNotFound";
    // }
    const userAccessed = await User.findOne({
      where: {
        id: req.accessedUser.id,
        email: req.accessedUser.email,
      },
    });
    if (!userAccessed) {
      throw "TokenError";
    }
    // if (req.method === "PATCH" && userAccessed.role !== "admin") {
    //   throw "Forbidden";
    // }
    if (userAccessed.role !== "admin") {
      throw "Forbidden";
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  isAdmin,
};
