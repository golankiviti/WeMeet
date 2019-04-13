// this service is responsible for the tokens check from the client

const Users = require('../data/index').schemas.users;

const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');

const secret = 'weMeet';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            // get id from the payload token
            Users.findById(payload.id)
                .then(user => {
                    if (user) {
                        return done(null, {
                            id: user.id,
                            email: user.local.email,
                        });
                    }
                    return done(null, false);
                }).catch(err => done(err));
        })
    );
};

module.exports.secret = secret;