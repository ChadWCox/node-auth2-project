const User = require('../users/user-modal');

module.exports = async (req, res, next) => {
    const { username } = req.body;

    try {
        const rows = await User.findBy({ username: username })
        if (rows.length) {
            req.userData = rows[0]
            next()
        } else {
            res.status(401).json('User not found.')
        }
    } catch (e) {
        res.status(500).json( e.message )
    }
};