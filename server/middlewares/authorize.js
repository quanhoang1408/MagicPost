const authorize = (permissions) => {
    return (req, res, next) => {
        const { user } = req;
        if (user && permissions.includes(user.role)) {
            next();
        } else {
            res.status(403).json({ message: "Unauthorized" });
        }
    };
}

module.exports = authorize;