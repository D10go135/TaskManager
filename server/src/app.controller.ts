import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTaskDto } from './tasks/dto/create-task.dto';
import { UpdateTaskDto } from './tasks/dto/update-task.dto';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.appService.createTask(createTaskDto);
  }

  @Get()
  findAll(@Query('subject') subject?: string) {
    if (subject) {
      return this.appService.findTasksBySubject(subject);
    }
    return this.appService.findAllTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOneTask(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.appService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.removeTask(+id);
  }
}