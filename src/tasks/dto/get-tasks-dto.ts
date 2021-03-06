import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../model/task.model";

export class GetTasksFilterDto{
    @IsOptional()
    //array of allowed validators
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search: string
}