import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/Todo';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async getTodos() {
    const data = await this.todoService.getTodos();
    return {
      message: 'Todos retrieved successfuly',
      data,
    };
  }

  @Get(':todoId')
  async getTodo(@Param('todoId') todoId: string) {
    return await this.todoService.getTodo(todoId);
  }

  @Post()
  async createTodo(@Body() todo: CreateTodoDto) {
    return await this.todoService.createTodo(todo);
  }

  @Put(':id')
  async updateTask(@Body() todo: Todo, @Param('id') id: string) {
    const data = await this.todoService.editTodo(id, todo);

    return { message: 'Todo updated successfully', data };
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    const data = await this.todoService.deleteTodo(id);
    return { message: 'Post deleted', data };
  }
}
