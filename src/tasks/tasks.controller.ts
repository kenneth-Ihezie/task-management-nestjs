import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
     //dependecy injection in nestjs is done within a class constructor
     constructor(private taskService: TasksService){}

     @Get()
     getAllTasks(): Task[]{
         return this.taskService.getAllTasks()
     }

    //Am using getting all the body params
    //  @Post()
    //  createNewTask(@Body() body){
    //    console.log(body);
    //  }

    //Below am using the body annotation with key
    // @Post()
    // createNewTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ): Task {
    //   return this.taskService.createNewTask(title, description)
    // }

    //Am now using dto
    @Post()
    createNewTask(@Body() createTaskDto: CreateTaskDto): Task {
      return this.taskService.createNewTask(createTaskDto)
    }
}
