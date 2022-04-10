import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { Todo } from './interfaces/Todo';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private todosRepo: Repository<TodoEntity>,
  ) {}

  async getTodos(): Promise<TodoEntity[]> {
    return await this.todosRepo.find();
  }

  async getTodo(id: string) {
    const todo = await this.todosRepo.findOne(id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async createTodo(dto: CreateTodoDto) {
    const todo = this.todosRepo.create(dto as any);
    return await this.todosRepo.save(todo);
  }

  async editTodo(id: string, newTodo: Todo): Promise<TodoEntity> {
    const todo = await this.todosRepo.findOne(id);
    if (!todo) throw new NotFoundException('Todo does not exist');

    const editedTodo = Object.assign(todo, newTodo);
    return await this.todosRepo.save(editedTodo);
  }

  async deleteTodo(id: string) {
    const todo = await this.todosRepo.findOne(id);
    if (!todo) throw new NotFoundException('Todo does not exist');

    return await this.todosRepo.remove(todo);
  }
}
