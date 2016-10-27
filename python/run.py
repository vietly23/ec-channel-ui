import threading
import sys
import time

from Raven import Raven
from MySQLHelper import MySQLHelper

SECOND = 1
MINUTE = 60 * SECOND
HOUR = 60 * MINUTE
DAY = 24 * HOUR

class DataDaemon:
	"""
	Multithreading data gathering.
	"""
	def __init__(self, run):
		self.__run = run
		self.__raven = Raven()
		self.__db = MySQLHelper()
		self.__running = False

	def storeRavenData(self):
		try:
			if not self.__raven.exists():
				self.__raven.refresh()
			if self.__running and self.__raven.exists():
				GET_DEMAND = {'Name':'get_instantaneous_demand'}
				self.__raven.write(GET_DEMAND)
				time.sleep(.1)  
				XMLresponse = self.__raven.read()
				if (XMLresponse.tag != 'InstantaneousDemand'):
					data = (-1,-1,-1,self.__run)
				else:
					attributes = list(XMLresponse)
					attribute_list = [3,4,5]
					# XML frag contains hex, convert to decimal
					data = tuple(int(attributes[i].text, 16) for i in attribute_list)
					data += (self.__run,)
				print(data)
				self.__db.insertDemandData(data)
				threading.Timer(7 * SECOND, self.storeRavenData).start()
		except:
			print(sys.exc_info(), file=sys.stderr)

	def start(self):
		self.__running = True
		self.storeRavenData()

	def stop(self):
		self.__running = False

if __name__ == '__main__':
	RUN_NAME = input('What would you like to title this run? ')
	input('Press enter to begin run.')
	for i in range(3,0,-1):
		print('{}...'.format(i))
		time.sleep(1)
	a = DataDaemon(RUN_NAME)
	a.start()
