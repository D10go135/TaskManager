"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./tasks/entities/task.entity");
let AppService = class AppService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async createTask(createTaskDto) {
        const task = this.tasksRepository.create(createTaskDto);
        return this.tasksRepository.save(task);
    }
    async findAllTasks() {
        return this.tasksRepository.find({ order: { dueDate: 'ASC' } });
    }
    async findOneTask(id) {
        return this.tasksRepository.findOne({ where: { id } });
    }
    async updateTask(id, updateTaskDto) {
        await this.tasksRepository.update(id, updateTaskDto);
        return this.tasksRepository.findOne({ where: { id } });
    }
    async removeTask(id) {
        await this.tasksRepository.delete(id);
    }
    async findTasksBySubject(subject) {
        return this.tasksRepository.find({
            where: { subject },
            order: { dueDate: 'ASC' }
        });
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map