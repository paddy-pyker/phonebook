const jwt = require('jsonwebtoken');

module.exports = {
    
    verifyToken(req, res, next) {

    const cookies = req.cookies;
    const token = cookies.token;

    if (!token) return res.status(401).json({status:'Access denied'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'g0m^sh!');
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (ex) {
        console.log(ex)
        res.status(400).send('Invalid token.');
    }
}

}