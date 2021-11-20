const CoralMarketContract = artifacts.require("CoralMarketContract");

module.exports = function (deployer) {
  deployer.deploy(CoralMarketContract);
};
