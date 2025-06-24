import { Repository } from 'typeorm';
import { Task } from './tasks/entities/task.entity';
import { CreateTaskDto } from './tasks/dto/create-task.dto';
import { UpdateTaskDto } from './tasks/dto/update-task.dto';
export declare class AppService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    findAllTasks(): Promise<Task[]>;
    findOneTask(id: number): Promise<Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    removeTask(id: number): Promise<void>;
    findTasksBySubject(subject: string): Promise<Task[]>;
}
