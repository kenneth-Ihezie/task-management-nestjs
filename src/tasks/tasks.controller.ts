import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
     //dependecy injection in nestjs is done within a class constructor
     constructor(private taskService: TasksService){}

     @Get()
     //param level validation pipe
     getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[]{         
      //we are checking if filterDto is empty then call getAllTasks else call getTaskWithFilter
      if(Object.keys(filterDto).length){
        return this.taskService.getTasksWithFilter(filterDto)
      } else {
        return this.taskService.getAllTasks()
      }
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
    //handler level validation pipe
    @UsePipes(ValidationPipe)
    createNewTask(@Body() createTaskDto: CreateTaskDto): Task {
      return this.taskService.createNewTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
      return this.taskService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    //param level validation pipe
    updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe)status: TaskStatus): Task{
      return this.taskService.updateTaskStatus(id, status)
    }
}
