import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

//In the service class is where you write your business logic
@Injectable()
export class TasksService {
   private tasks: Task[] = []

   getAllTasks(): Task[]{
       return this.tasks
   }

   createNewTask(createTaskDto: CreateTaskDto): Task {
       const { title, description } = createTaskDto

       const task: Task = {
          id: uuid(),
          title,
          description,
          status: TaskStatus.OPEN
        }

      this.tasks.push(task)
      //its good practice to always return a new resource because frontend developers like it. why
      //becuase whenever a new resource is created instead sending another get request to retrive it..we return it..
      //which also reduce load on our backend application 
      return task
   }
}
