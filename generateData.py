# Generates test data to test the dynamic display of the web interface
from datetime import datetime
from time import sleep
import random
import string
import sys


def randStr(chars=string.ascii_uppercase + string.digits, N=10):
    return ''.join(random.choice(chars) for _ in range(N))

#print("Timestamp", str(datetime.now().strftime("%H:%M:%S")), randStr(N=10))

f = open("testdata.txt", "w")

f.write("Timestamp: ")
f.write(str(datetime.now().strftime("%H:%M:%S")))
f.write(str(" " + randStr(N=10)))
f.flush()
f.close()
