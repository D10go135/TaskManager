import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ default: 'medium' })
  priority: string; // 'low', 'medium', 'high'

  @Column()
  subject: string; // Matemática, Português, etc.

  @Column({ default: 'homework' })
  type: string; // 'homework', 'test', 'project'
}