require("dotenv").config({ path: "./.env" });


var ImageKit = require("imagekit");
exports.initImageKit = function () {
  var imagekit = new ImageKit({
    publicKey: process.env.PUBLICKEY_IMAGEKIT,
    privateKey: process.env.PRIVATEKEY_IMAGEKIT,
    urlEndpoint: process.env.URL_ENDPOINT_IMAGEKIT,
  });
  return imagekit;
};
