const DivePhotoToken = artifacts.require("DivePhotoToken");

module.exports = function (deployer) {
  deployer.deploy(DivePhotoToken);
};
