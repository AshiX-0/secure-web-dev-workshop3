function roleAuthorization(roles) {
    return function(req, res, next) {
        if (roles.includes(req.user?.role)) {
            return next();
        }
        return res.status(403).send('You lack the necessary permissions to access this resource');
    }
}

module.exports = roleAuthorization;