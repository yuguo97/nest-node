/*
 * @Author: your name
 * @Date: 2021-03-18 15:37:22
 * @LastEditTime: 2021-03-25 14:23:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\login-node\src\users\users.entity.ts
 */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, Timestamp, ManyToOne,JoinColumn} from 'typeorm';
import { RolesEntity } from '../roles/roles.entity'


@Entity("sys_users")
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type:'varchar', 
    comment: '用户账号', 
    name: 'username'
  })
  username: string;
  
  @Column({
    type:'varchar', 
    name: 'nickname', 
    default: "游客",
    length: 32,
    comment: '用户名称'
  })
  nickname: string;

  @Column({
    type:'varchar', 
    name:'password', 
    comment: '用户密码'
  })
  password: string;


  @Column({ 
    comment: '用户年龄',
    default: 18,
  })
  age: number;

  @Column({ 
    nullable: true, 
    length: 20, 
    comment: '用户手机号码'
  })
  public phoneNum: string

  @Column({ 
    nullable: true, 
    length: 200, 
    comment: '邮箱地址' 
  })
  public email: string

  @Column({
    type:'varchar', 
    name: 'avatar', 
    comment: '用户头像',
    default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  })
  avatar: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: () => 1,
    name: 'isSuper',
    comment: '是否为超级管理员,0表示是，1表示否',
  })
  isSuper: number;


  @ManyToOne(() => RolesEntity, RolesEntity => RolesEntity.user)
  @JoinColumn({ name: 'roleId' })
  role: RolesEntity;

  @Column({ 
    type: 'timestamp', 
    default: () => 'current_timestamp' 
  })
  createAt: Timestamp;

  @Column({
    type: 'timestamp',
    onUpdate: 'current_timestamp',
    default: () => 'current_timestamp',
  })
  updateAt: Timestamp;
}

