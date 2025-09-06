const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const isValidToken = await jwt.verify(token, process.env.JWT_SECRET);

        if (!isValidToken) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        if(req?.params?.id && req?.params?.id !== isValidToken?.user?._id) {
            return res.status(401).send({ message: "Unauthorized to perform this action" });
        }

        req.user = isValidToken?.user;

        next();
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized" });
    }
}


module.exports = { authenticate };