import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateTaskDto } from './tasks/dto/create-task.dto';
import { Task } from './tasks/entities/task.entity';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createTask: jest.fn(),
            findAllTasks: jest.fn(),
            findOneTask: jest.fn(),
            updateTask: jest.fn(),
            removeTask: jest.fn(),
            findTasksBySubject: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        subject: 'Math',
      };
      
      const result = new Task();
      jest.spyOn(appService, 'createTask').mockResolvedValue(result);

      expect(await appController.create(createTaskDto)).toBe(result);
      expect(appService.createTask).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [new Task()];
      jest.spyOn(appService, 'findAllTasks').mockResolvedValue(result);

      expect(await appController.findAll()).toBe(result);
    });

    it('should filter by subject when query param is provided', async () => {
      const result = [new Task()];
      const subject = 'Math';
      jest.spyOn(appService, 'findTasksBySubject').mockResolvedValue(result);

      expect(await appController.findAll(subject)).toBe(result);
      expect(appService.findTasksBySubject).toHaveBeenCalledWith(subject);
    });
  });

  // Você pode adicionar mais testes para os outros métodos (findOne, update, remove)
});