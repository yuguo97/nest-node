/*
 * @Author: your name
 * @Date: 2021-03-18 15:37:22
 * @LastEditTime: 2021-04-10 11:19:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \github\login-node\src\users\users.entity.ts
 */
import { Column, Tree, Entity, PrimaryGeneratedColumn, BaseEntity, Timestamp} from 'typeorm';
@Entity("sys_menus")
export class MenusEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', comment: '菜单名字', name: 'name'})
  name: string;

  @Column({type:'varchar', comment: '菜单路径', name: 'url'})
  url: string;

  @Column({type:'varchar', comment: '菜单权限', name: 'code'})
  code: string;

  @Column({type:'int', comment: '父菜单ID', name: 'pid'})
  pid: number;

  @Column({type:'int', comment: '菜单排序', name: 'order'})
  order: number;

  @Column({type:'varchar', comment: '菜单图标', name: 'icon'})
  icon: string;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createAt: Timestamp;

  @Column({
    type: 'timestamp',
    onUpdate: 'current_timestamp',
    default: () => 'current_timestamp',
  })
  updateAt: Timestamp;
}
