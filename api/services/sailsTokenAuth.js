var jwt = require('jsonwebtoken');

// With this method we generate a new token based on payload we want to put on it
module.exports = {
  issueToken: function(payload) {
    return jwt.sign(
      payload, // This is the payload we want to put inside the token
      sails.config.TOKEN_SECRET || "oursecret" // Secret string which will be used to sign the token
    );
  },

  // Here we verify that the token we received on a request hasn't be tampered with.
  verifyToken: function(token, verified) {
    return jwt.verify(
      token, // The token to be verified
      sails.config.TOKEN_SECRET || "oursecret", // The secret we use to sign it.
      {}, // Options, none in this case
      verified // The callback to be called when the verification is done.
    );
  }
};
