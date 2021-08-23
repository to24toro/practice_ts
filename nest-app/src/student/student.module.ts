import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ValidStudentMiddleware } from 'src/common/middleware/validStudent.middleware';
import { StundentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  exports: [StudentService],
  controllers: [StundentController],
  providers: [StudentService],
})
export class StudentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidStudentMiddleware).forRoutes({
      path: 'student/:studentId',
      method: RequestMethod.PUT,
    });
  }
}
