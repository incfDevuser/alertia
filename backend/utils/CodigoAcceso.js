import crypto from 'crypto';

export const generarCodigoAcceso = () => {
    return crypto.randomBytes(5).toString('hex').toUpperCase();
}