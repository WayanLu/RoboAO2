# Generates test data to test the dynamic display of the web interface
from datetime import datetime
from time import sleep
import random
import string
import json


def randStr(chars=string.ascii_uppercase + string.digits, N=10):
    return ''.join(random.choice(chars) for _ in range(N))

#print("Timestamp", str(datetime.now().strftime("%H:%M:%S")), randStr(N=10))

# f = open("testdata.txt", "w")

# f.write("Timestamp: ")
# f.write(str(datetime.now().strftime("%H:%M:%S")))
# f.write(" " + str(random.randint(1,10)))
# f.flush()
# f.close()
# while True:
# sleep(2)
data = {
    "General": {
        "timestamp": str(datetime.now().strftime("%H:%M:%S")),
        "project": randStr(),
        "name": randStr(),
        "state": randStr()
    },
    "Object": {
        "ra": randStr(),
        "dec": randStr(),
        "epoch": random.randint(1,10),
        "mag": random.randint(1,20)
    },
    "Observation" :{
        "exposure" : randStr(),
        "filter": random.randint(1,5)
    },
    "Test1": {
        "sasd": 1,
        "dpasn": 00.5
    },
    "Test2": {
        "sgft": 1,
        "dadsn": 00.5
    },
    "Test3": {
        "adset": 1,
        "dgasdin": 00.5
    },
    "Test4": {
        "sj13t": 1,
        "d123n": 00.5
    },
}

with open("testdata.txt", "w") as writeFile:
    writeFile.write(json.dumps(data))
    writeFile.flush()
        