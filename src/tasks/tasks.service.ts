import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-dto';

//In the service class is where you write your business logic
@Injectable()
export class TasksService {
   private tasks: Task[] = []

   getAllTasks(): Task[]{
       return this.tasks
   }

   getTasksWithFilter(filterDto: GetTasksFilterDto): Task[]{
      const { status, search } = filterDto
      let tasks = this.getAllTasks()
      if(status){
         tasks = tasks.filter(task => task.status === status)
      }

      if(search){
         tasks = tasks.filter(task => 
            task.title.includes(search) ||
            task.description.includes(search))
      }

      return tasks
   }

   getTaskById(id: string): Task{
      const data = this.tasks.find(task => task.id === id)
      if(!data){
         //using default msg
         //throw new NotFoundException()

         //custom msg
         throw new NotFoundException(`Task with ID "${id}" not found`)
      }
      return data
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

   updateTaskStatus(id: string, status: TaskStatus): Task{
      const task = this.getTaskById(id)
      task.status = status
      return task
   }

   deleteTaskById(id: string): void { 
      //am using the filter method of javascript...so basically when the task.id is not equal to the id keep the 
      //task else filter out 
        const data = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== data.id)
   }

}
