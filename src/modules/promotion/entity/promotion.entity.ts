import { Entity, Column, JoinColumn, Index, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
/**
 * NestJS CRUD
 */
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CourseEntity } from '../../course/entity/course.entity';
const { CREATE, UPDATE } = CrudValidationGroups;

@Entity({
  name: 'promotions',
})
export class PromotionEntity extends CommonEntity {
  /**
   * Coupon Code
   */
  @Index()
  @Column({ type: 'text', nullable: true })
  @IsOptional({ groups: [UPDATE] })
  @IsOptional({ groups: [CREATE] })
  coupon: string;

  /**
   * On Course
   */
  @Index()
  @ManyToOne(() => CourseEntity, (course) => course.purchases)
  @JoinColumn({ name: 'courseId' })
  @IsNotEmpty({ groups: [CREATE] })
  course: string;

  /**
   * Link to Pay way
   */
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'text' })
  paymentLink: string;

  /**
   * From
   */
  @Column({ type: 'date' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  from: Date;

  /**
   * From
   */
  @Column({ type: 'date' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  to: Date;
}
