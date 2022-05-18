import { IsNotEmpty } from "class-validator"

export class CreateTaskDto {
   @IsNotEmpty()
   title: string
   
   @IsNotEmpty()
   description: string
}

//nextjs validation pipes validates an argument before its sent to the handler(controller method)
//three types of pipes:
//1: handler level pipes: validates all incoming https request comming to the handler
//2: param level pipes: validate the argument for only a specific param
//3: global level pipes: validates all incoming request into the application
//examples of builtin in pipes
//validation pipes
//parseInt pipes
//here we are using @IsNotEmpty().....visit link to see all validation annotations:  https://github.com/typestack/class-validator#validation-decorators