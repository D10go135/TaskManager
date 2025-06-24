import { AppService } from './app.service';
import { CreateTaskDto } from './tasks/dto/create-task.dto';
import { UpdateTaskDto } from './tasks/dto/update-task.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    create(createTaskDto: CreateTaskDto): Promise<import("./tasks/entities/task.entity").Task>;
    findAll(subject?: string): Promise<import("./tasks/entities/task.entity").Task[]>;
    findOne(id: string): Promise<import("./tasks/entities/task.entity").Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("./tasks/entities/task.entity").Task>;
    remove(id: string): Promise<void>;
}
