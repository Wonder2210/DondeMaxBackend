// @ts-nocheck
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { SessionUser } from "../__generated";

dotenv.config();

const getUser = async (auth: string): Promise<AuthenticationError| SessionUser>=> {
    if (!auth) {
      throw new AuthenticationError('you must be logged in!');
    }
  
    const token = auth.split('Bearer ')[1];
    if (!token) throw new AuthenticationError('you should provide a token!');
  
    const user = await jwt.verify(token, process.env.SECRET || "221099", (err, decoded) => {
      if (err) throw new AuthenticationError('invalid token!');
      return decoded;
    });
    return user;
  };

  export default getUser;