import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'escola_task_manager',
      entities: [Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}