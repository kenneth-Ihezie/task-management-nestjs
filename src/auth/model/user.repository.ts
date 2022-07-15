import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCrendentialsDto } from "../dto/auth.credentials.dto";
import { User } from "./user.entity";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository{
    private users: User[] = []
    //for duplicate usernames
    private userNameCheck: Map<string, string> = new Map()

    async signUp(authCrendentialsDto: AuthCrendentialsDto): Promise<void>{
       const { username, pass } = authCrendentialsDto
       
        if(this.userNameCheck.get(username)){
           throw new ConflictException('Username already exits')
        } else {
            const salt = await bcrypt.genSalt();

            const user = {
                id: uuid(),
                userName: username,
                password: await this.hashPassword(pass, salt),
                salt: salt
            }

            this.userNameCheck.set(username, username)
            await this.users.push(user)
        }

        console.log(this.users);
        
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt)
    }
}


//next video validating passwords.