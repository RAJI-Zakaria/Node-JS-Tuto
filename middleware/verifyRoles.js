const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        let rolesArray = [...allowedRoles];
        //check if the passed role.s match.s the user role.s ==> return true  ===> next()
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);//Unauthorized
        next();
    }
}

module.exports = verifyRoles