/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,

  attributes: {
    name: {
      type: 'text',
      required: true,
      unique: true
    },
    firstname: {
      type: 'text',
      defaultsTo: ''
    },
    lastname: {
      type: 'text',
      defaultsTo: ''
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'text',
      required: true,
    },
    role: {
      type: 'string',
    },

    toJson: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj._csrf;
      delete obj.encryptedPassword;
      return obj;
    }
  },

  beforeCreate: function (values, next) {
    var bcrypt = require('bcrypt');
    if (!values.password || values.password != values.confirmation) {
      return next({err: ["Password doesn't match password confirmation!"]});
    }

    User.findOneByEmail(values.email, function(err, user) {
      if(err) return next(err);
      if(user) {
        var noAccountError = [{name: 'email', message: 'The email address ' + values.email + ' is registered'}];
        return next(noAccountError);
      }
    })

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err)

      bcrypt.hash(values.password, salt, function passwordEncrypted(err, encryptedPassword) {
        if (err) return next(err);
        values.password = encryptedPassword;
        values.online = true;
        next();
      })
    })
  },

  validPassword: function(password, user, cb) {
    var bcrypt = require('bcrypt');
    bcrypt.compare(password, user.password, function(err, match) {
      if (err) cb(err);

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  }
};

