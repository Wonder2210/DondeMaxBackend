import bcrypt from 'bcrypt'

export default async (plain_password:string,hash_password:string)=>{
    const verification = await bcrypt.compare(plain_password,hash_password);
    return verification;
}