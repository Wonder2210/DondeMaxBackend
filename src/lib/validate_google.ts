// @ts-nocheck
import { AuthenticationError } from "apollo-server";
import { OAuth2Client } from "google-auth-library";
import { Customer } from "../database/models";
import * as dotenv from "dotenv";
import { SessionUser } from "../__generated";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const getUser = async (auth: string): Promise<AuthenticationError| SessionUser>=> {
    if (!auth) {
      throw new AuthenticationError('you must be logged in!');
    }
  
    const token = auth.split('Bearer ')[1];
    if (!token) throw new AuthenticationError('you should provide a token!');
  
    const payload = await client.verifyIdToken({
        idToken:token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const user = payload.getPayload();

    if(!user){
        console.log(user)
        throw new AuthenticationError('you must be logged in!');
    }

   
        const customer = await Customer.query().where("email",user.email).first();
        
  
        if(!customer){
            const newCustomer = await Customer.query().insert({
                email: user.email,
                googleId: user.sub,
                lastName: user.family_name,
                name:user.given_name,
                image:user.picture
            })
            return newCustomer;
        }
        return customer;
  
    
  };

  export default getUser;