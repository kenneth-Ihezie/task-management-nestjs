export interface Task{
    // The only constraint here is that each model must have a string field named id.
    //while using firestore
    id: string
    title: string
    description: string
    status: TaskStatus
}


export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}