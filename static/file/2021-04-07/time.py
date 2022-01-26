'''
Author: your name
Date: 2021-04-08 18:01:59
LastEditTime: 2021-04-09 15:09:50
LastEditors: Please set LastEditors
Description: In User Settings Edit
FilePath: \github\test\time.py
'''
import time
import sched
import datetime


import psutil
from pymongo import MongoClient
conn = MongoClient('localhost', 27017)
db = conn.yuguo  # 连接mydb数据库，没有则自动创建
my_cpu = db.yg_cpu


cpu_info = {'user': 0,  'system': 0,  'idle': 0,  'percent': 0}
s = sched.scheduler(time.time, time.sleep)


def get_cpu_info():
    cpu_times = psutil.cpu_times()
    cpu_info['user'] = cpu_times.user
    cpu_info['system'] = cpu_times.system
    cpu_info['idle'] = cpu_times.idle
    cpu_info['percent'] = psutil.cpu_percent(interval=2)


def event_fun1():
    get_cpu_info()
    cpu_user = cpu_info['user']
    cpu_system = cpu_info['system']
    cpu_idle = cpu_info['idle']
    cpu_status = cpu_info['percent']
    my_cpu.save({
        "user": cpu_user,
        "system": cpu_system,
        "idle": cpu_idle,
        "percent": cpu_status,
        "time": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })
    print("保存成功!")


def perform1(inc):
    s.enter(inc, 0, perform1, (inc,))
    event_fun1()


def event_fun2():
    print("func2 Time:", datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))


def perform2(inc):
    s.enter(inc, 0, perform2, (inc,))
    event_fun2()


def mymain(func, inc=2):
    if func == "1":
        s.enter(0, 0, perform1, (30,))  # 每隔10秒执行一次perform1
    if func == "2":
        s.enter(0, 0, perform2, (10,))  # 每隔20秒执行一次perform2


if __name__ == '__main__':
    mymain('1')
    s.run()
