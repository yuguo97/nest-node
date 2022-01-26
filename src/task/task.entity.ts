import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, Timestamp, OneToMany, JoinColumn} from 'typeorm';
@Entity("mon_task")
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      type:'varchar', 
      comment: '任务名称',
      default: '采集',
      name: 'name'
  })
  name: string;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createAt: Timestamp;

  @Column({
    type: 'timestamp',
    onUpdate: 'current_timestamp',
    default: () => 'current_timestamp',
  })
  updateAt: Timestamp;
}