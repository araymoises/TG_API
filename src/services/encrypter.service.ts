import bcrypt from 'bcryptjs';
export default async (password: String): Promise<String> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}