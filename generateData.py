# Generates test data to test the dynamic display of the web interface
from datetime import datetime
from datetime import timedelta
from time import sleep, time
import random
import string
import json
from tkinter import W



def randStr(chars=string.ascii_uppercase + string.digits, N=10):
    return ''.join(random.choice(chars) for _ in range(N))

FILENAME = "./testdata.txt"
MAX_MINUTE_INTERVAL = 30;
#print("Timestamp", str(datetime.now().strftime("%H:%M:%S")), randStr(N=10))

# f = open("testdata.txt", "w")

# f.write("Timestamp: ")
# f.write(str(datetime.now().strftime("%H:%M:%S")))
# f.write(" " + str(random.randint(1,10)))
# f.flush()
# f.close()
# while True:
# sleep(2)

minTime = datetime.now() - timedelta(seconds=30) 
#firstTime = firstDataTime - timedelta(minutes = 10)
maxTime = minTime + timedelta(minutes=1)
with open(FILENAME, 'w') as file:
    pass

while True:
    currentTime = datetime.now()
    
    if currentTime >= maxTime:
        print("Removing line")
        with open(FILENAME, 'r+') as fp:
            fp.flush()
            lines = fp.readlines()
            fp.seek(0)
            fp.truncate()
            
            for number, line in enumerate(lines):
                jsonLine = json.loads(line)
                time = jsonLine["General"]["timestamp"]
                
                
                if datetime.strptime(time, "%Y-%m-%d %H:%M:%S.%f") < maxTime and minTime < datetime.strptime(time, "%Y-%m-%d %H:%M:%S.%f"):
                    print(number)
                    fp.write(line)
                    
            
    
            
        
        maxTime += timedelta(seconds=MAX_MINUTE_INTERVAL)
        minTime = maxTime - timedelta(seconds= MAX_MINUTE_INTERVAL)
        
    data = {
        "General": {
            "timestamp": str(datetime.now()),
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
            "adseasdt": 3,
            "dgasdin": 00.5
        },
        "Test4": {
            "sj13t": 1,
            "d123n": 00.5
        },
    }

    with open(FILENAME, "a") as writeFile:
        writeFile.write(json.dumps(data) +'\n')
        writeFile.flush()
    print(currentTime, "Writing to file")
    sleep(10)
