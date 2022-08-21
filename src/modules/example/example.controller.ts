import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { interval, map, Observable } from 'rxjs';
import { ParseIntPipe } from '@/common/pipes/parse-int.pipe';
import { ValidationPipe } from '@/common/pipes/validation.pipe';
import * as Joi from 'joi';
import { JoiValidationPipe } from '@/common/pipes/joi-validation.pipe';
import { Role } from '@/common/decorator/role.decorator';
import { RoleGuard } from '@/common/guard/role-guard';
import { AuthGuard } from '@nestjs/passport';

const createCatSchema = Joi.object({
  name: Joi.string().required(),
});
interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}
@Controller('example')
// 注入守卫
@UseGuards(RoleGuard)
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(10000).pipe(map(() => ({ data: { hello: 'world' } })));
  }
  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.exampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.exampleService.findOne(+id);
  }

  @Patch(':id')
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  update(
    @Param('id') id: number,
    @Body()
    updateExampleDto: UpdateExampleDto,
  ) {
    return this.exampleService.update(+id, updateExampleDto);
  }

  @Delete(':id')
  @Role('admin', 'guest')
  remove(@Param('id') id: string) {
    return this.exampleService.remove(+id);
  }
}
