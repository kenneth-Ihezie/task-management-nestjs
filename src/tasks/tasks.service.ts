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

   getTaskById(id: string): Task{
      console.log(this.tasks.find(task => task.id === id));
      return this.tasks.find(task => task.id === id)
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

   deleteTaskById(id: string): void { 
      //am using the filter method of javascript...so basically when the task.id is not equal to the id keep the 
      //task else filter out 
       this.tasks = this.tasks.filter(task => task.id !== id)
   }
   
}
