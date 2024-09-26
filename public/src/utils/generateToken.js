import jwt from 'jsonwebtoken';
export const generateToken = (params = {}) => {
    return jwt.sign({ params }, process.env.AUTH_SECRET, {
        expiresIn: 86400,
    });
};
//# sourceMappingURL=generateToken.js.map