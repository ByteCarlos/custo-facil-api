import jwt from 'jsonwebtoken';

interface TokenParams {
    [key: string]: any;
}

export const generateToken = (params: TokenParams = {}): string => {
    return jwt.sign({ params }, process.env.AUTH_SECRET as string, { 
        expiresIn: 86400, 
    });
}