'''
Author: your name
Date: 2021-04-08 18:01:59
LastEditTime: 2021-04-10 15:36:11
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
my_memory = db.yg_memory


cpu_info = {'user': 0,  'system': 0,  'idle': 0,  'percent': 0}

s = sched.scheduler(time.time, time.sleep)


def get_cpu_info():
    cpu_times = psutil.cpu_times()
    my_cpu.insert_one({
        "user": cpu_times.user,
        "system": cpu_times.system,
        "idle": cpu_times.idle,
        "percent": psutil.cpu_percent(interval=2),
        "time": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })
    print("cpu Time:", datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))


def perform1(inc):
    s.enter(inc, 0, perform1, (inc,))
    get_cpu_info()


def get_memory_info():
    mem_info = psutil.virtual_memory()
    my_memory.insert_one({
        "total": mem_info.total,
        "available": mem_info.available,
        "percent": mem_info.percent,
        "used": mem_info.used,
        "free": mem_info.free,
        "time": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })
    print("memory Time:", datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))


def perform2(inc):
    s.enter(inc, 0, perform2, (inc,))
    get_memory_info()


def mymain(func, inc=2):
    if func == "1":
        s.enter(0, 0, perform1, (30,))  # 每隔30秒执行一次perform1
    if func == "2":
        s.enter(0, 0, perform2, (60,))  # 每隔60秒执行一次perform2


if __name__ == '__main__':
    mymain('1')
    mymain('2')
    s.run()
