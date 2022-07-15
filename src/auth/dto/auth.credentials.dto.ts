import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCrendentialsDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsNotEmpty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //validates if the password has one uppercase letter, one lowercase letter
    //one number and one special character  
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak'})
    pass: string
}