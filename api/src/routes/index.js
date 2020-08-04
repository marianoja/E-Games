const { Router } = require("express");
// import all routers;
const authRouter = require("./auth.js");
const productRouter = require("./product.js");
const catalogueRouter = require("./catalogue.js");
const searchByKeyRouter = require("./searchByKey.js");
const categoriesRouter = require("./categories.js");
const UserRoutes = require("./UserRoutes.js");
const OrderRouter = require("./Order.js");
const ReviewRouter = require("./Review.js");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const crypto = require("crypto");
const CheckOutRouter = require("./checkout.js")
const { User } = require("../models/index.js");


const router = Router();

passport.use(
	new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
		},
		(email, password, done) => {
			// console.log('email', email, 'password', password);
			User.findOne({
					where: {
						email: email
					}
				})
				.then(user => {
					if (!user) {
						return done(null, false, {
							message: 'Wrong email',
						});
					}
					if (!user.checkPassword(password)) {
						return done(null, false, {
							message: 'Incorrect password',
						});
					}
					return done(null, user);
				})
				.catch(err => {
					if (err) {
						return done(err);
					}
				});
		},
	),
);



// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use("/auth", authRouter);
router.use("/catalogue", catalogueRouter);
router.use("/product", productRouter);
router.use("/search", searchByKeyRouter);
router.use("/categories", categoriesRouter);
router.use("/user", UserRoutes);
router.use("/order", OrderRouter);
router.use("/review", ReviewRouter);
router.use("/checkout", CheckOutRouter)


module.exports = router;
