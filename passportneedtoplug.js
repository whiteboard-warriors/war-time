//////////////html routes file///////////////////////////

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Requiring our custom middleware for checking if a user isn't logged in
const isNotAuthenticated = require('../config/middleware/isNotAuthenticated');

// redirect to homepage if they are logged in
router.route(['/signup', '/login']).get(isNotAuthenticated);

// redirect to login page if not logged in
router.route(['/', 'ALL OTHER PRIVATE HTML ROUTES HERE']).get(isAuthenticated);

// example authenticated routing:

// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

/////////API ROUTES FILE/////////////////////////
const passport = require('../config/passport');

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// put    passport.authenticate("local")
// after login route   router.post("/api/login", INSERT HERE, function)

// user isAuthenticatedData in same spot but for all private routes
