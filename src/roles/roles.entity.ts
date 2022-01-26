/*
 * @Author: your name
 * @Date: 2021-03-18 15:37:22
 * @LastEditTime: 2021-04-08 14:30:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\login-node\src\users\users.entity.ts
 */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, Timestamp, OneToMany, JoinColumn} from 'typeorm';
import { UsersEntity } from '../users/users.entity'
@Entity("sys_roles")
export class RolesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', comment: '角色名称', name: 'name'})
  name: string;

  @Column({type:'varchar', comment: '角色标识', name: 'ident'})
  ident: string;

  @Column({type:'varchar', default: null, comment: '角色描述', name: 'description'})
  description: string;


  @OneToMany( () => UsersEntity, UsersEntity => UsersEntity.role )
  @JoinColumn({ name: 'userId' })
  user: UsersEntity[];
  
  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createAt: Timestamp;

  @Column({
    type: 'timestamp',
    onUpdate: 'current_timestamp',
    default: () => 'current_timestamp',
  })
  updateAt: Timestamp;
}
