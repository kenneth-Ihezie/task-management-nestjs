import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

//we are basically checking if user enter the right or wrong TaskStatus
export class TaskStatusValidationPipe implements PipeTransform{

    //readonly class means it cannot be modified even by class members
    readonly allowedStatus = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE
    ]

    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);
        console.log(metadata);
        value = value.toUpperCase()
        if(this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`)
        }

        return value
    }


    private isStatusValid(status: any): boolean{
        //index will be -1 if user enters incorrect TaskStatus
       const index = this.allowedStatus.indexOf(status)
       return index !== -1
    }
    
}