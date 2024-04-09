const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use an environment variable for your database connection string
});

module.exports = function (passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            pool.query(
                'SELECT id, username, password FROM users WHERE username = $1', [username],
                (err, results) => {
                    if (err) {
                        return done(err);
                    }
                    if (results.rows.length > 0) {
                        const user = results.rows[0];

                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) {
                                return done(err);
                            }
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                // Passwords do not match
                                return done(null, false, { message: 'Password incorrect' });
                            }
                        });
                    } else {
                        // No user found
                        return done(null, false, { message: 'No user with that username' });
                    }
                }
            );
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        pool.query('SELECT id, username FROM users WHERE id = $1', [id], (err, results) => {
            if (err) {
                return done(err);
            }
            return done(null, results.rows[0]);
        });
    });
};
