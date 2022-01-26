import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, Timestamp, OneToMany, JoinColumn} from 'typeorm';
@Entity("mon_timed")
export class TimedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      type:'varchar', 
      comment: '任务名称',
      default: '采集',
      name: 'name'
  })
  name: string;

  @Column({type:'varchar', comment: '内存大小', name: 'totalmem'})
  totalmem: string;

  @Column({type:'varchar', comment: '空闲内存', name: 'freeMem'})
  freeMem: string;
  
  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createAt: Timestamp;

  @Column({
    type: 'timestamp',
    onUpdate: 'current_timestamp',
    default: () => 'current_timestamp',
  })
  updateAt: Timestamp;
}