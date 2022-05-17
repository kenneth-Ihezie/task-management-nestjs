import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
     //dependecy injection in nestjs is done within a class constructor
     constructor(private taskService: TasksService){}

     @Get()
     getAllTasks(): Task[]{
         return this.taskService.getAllTasks()
     }

     @Get('/:id')
     getTaskById(@Param('id') id: string): Task{       
       return this.taskService.getTaskById(id)
     }

    //Am using getting all the body params
    //  @Post()
    //  createNewTask(@Body() body){*
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

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
      return this.taskService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status')status: TaskStatus): Task{
      return this.taskService.updateTaskStatus(id, status)
    }
}
