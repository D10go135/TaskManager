import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks/entities/task.entity';
import { CreateTaskDto } from './tasks/dto/create-task.dto';
import { UpdateTaskDto } from './tasks/dto/update-task.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async findAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find({ order: { dueDate: 'ASC' } });
  }

  async findOneTask(id: number): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.tasksRepository.findOne({ where: { id } });
  }

  async removeTask(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async findTasksBySubject(subject: string): Promise<Task[]> {
    return this.tasksRepository.find({ 
      where: { subject },
      order: { dueDate: 'ASC' }
    });
  }
}