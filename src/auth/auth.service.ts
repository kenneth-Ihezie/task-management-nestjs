import { Injectable } from '@nestjs/common';
import { AuthCrendentialsDto } from './dto/auth.credentials.dto';
import { UserRepository } from './model/user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository){}

    async signUp(authCrendentialsDto: AuthCrendentialsDto): Promise<void>{
        return this.userRepository.signUp(authCrendentialsDto)
    }

}
