/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
  login: function(req, res) {
    var name = req.param('name');
    var password = req.param('password');

    if (!name || !password) {
      return res.json(401, {err: 'username and password required'});
    }

    User.findOneByName(name, function(err, user) {
      if (err) {
        return res.json(401, 'some-error');
      }

      if (!user) {
        return res.json(401, 'user-not-found');
      }

      User.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(401, 'some-error');
        }

        if (!valid) {
          return res.json(401, 'wrong-password')
        } else {
          var payload = user;
          delete payload.password;
          payload.admin = user.admin;
          req.token = sailsTokenAuth.issueToken(payload);
          return res.json(200, {user: payload, token: req.token});
        }
      });
    })
  },

  logout: function(req, res, next) {
    console.log(req.token);
    delete req.token;
    return res.send(200);
  },

  register: function(req, res, next) {
    var params = req.allParams();

    var userObj = {
      name: params.name.trim(),
      email: params.email.trim(),
      password: params.password,
      confirmation: params.password2,
      firstname: params.firstname || '',
      lastname: params.lastname || '',
      role: params.role || 'user'
    };

    // Create user with parameters from signup form at register.ejs
    User.create(userObj, function userCreated (err, user) {
      if (err) {
        console.log(err);
        message = "There was an error when creating your account. Please try again.";
        if (err.code == "ER_DUP_ENTRY") {
          message = "An account with that username or email already exists";
        }
        return res.json(500, message)
      }

      // When first installing the application we need to give user 1 the admin
      // rights.
      User.count({}, function(r, count){
        console.log(count);
        if (count == 1) {
          user.role = 'admin';
          user.save(function(err, user) {
            if (err) {
              console.log(err);
            }

            var payload = user;
            delete payload.password;
            var toReturn = {};
            toReturn.user = user;
            if (!req.token) {
              req.token = sailsTokenAuth.issueToken(payload);
              user.token = req.token;
              toReturn.token = req.token;
            }

            User.publishCreate(user);

            return res.json(toReturn);
          });
        }
        else {
          var payload = user;
          delete payload.password;
          var toReturn = {};
          toReturn.user = user;
          if (!req.token) {
            req.token = sailsTokenAuth.issueToken(payload);
            user.token = req.token;
            toReturn.token = req.token;
          }

          User.publishCreate(user);

          return res.json(toReturn);
        }
      });
    });
  },

  exists: function(req, res, next) {
    var params = req.allParams();
    if (params.id === undefined) {
      delete params.id;
    }
    for (field in params) {
      params[field] = params[field].trim();
    }
    User.findOne(params).then(function(user) {
      if (user) {
        return res.send(412);
      }
      return res.send(200);
    })
    .caught(function(err) {
      console.log(err);
      // We send an OK back and handle the error on submission.
      return res.send(200);
    });

  },

  check: function(req, res, next) {
    var status = 401;
    var message = 'auth token invalid or expired';
    if (req.headers['x-token']) {
      token = req.headers['x-token'];
      sailsTokenAuth.verifyToken(token, function(err, payload) {
        if (err)  {
          res.json(401, 'auth token invalid or expired');
        }
        else {
          res.json(200, {user: payload, token: token});
        }
      })
    }
    else {
      res.json(401, 'no-token-provided');
    }
  },
};
