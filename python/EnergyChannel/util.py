import json
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import subprocess
import sys
from time import sleep

try:
    from SQLiteHelper import SQLiteHelper
# For running unittests
except ImportError:
    from EnergyChannel import SQLiteHelper


OPEN_WEATHER_API_KEY = 'ae23bafc16276180b27331823588973e'
OPEN_WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?'
COUNTRY_CODE = 'us'

def storeInstantDemand(raven):
    """
    This is where we handle the asynchronous I/O. For example, it may be
    a 'select()'.
    One important thing to remember is that the thread has to yield
    control.
    """
    db = SQLiteHelper('energy_channel.db')
    try:
        GET_DEMAND = {'Name':'get_instantaneous_demand'}
        raven.write(GET_DEMAND)
        # Waits for RAVEn to respond
        sleep(.1)  
        XMLresponse = raven.read()
        attributes = XMLresponse.getchildren()
        attribute_list = [3,4,5,2]
        # XML frag contains hex, convert to decimal
        data = tuple(int(attributes[i].text, 16) for i in attribute_list)
        db.insert_data(data)
    except Exception as e:
        print(e)
    db.close()

def getWeather(zipcode:int) -> float:
    """
    Updates weather using OpenWeather.  Returns an float representing 
    temperature in Fahrenheit.  Assumes that zipcode is in the US.
    """
    
    params = urllib.parse.urlencode(
            {'zip' : '{},{}'.format(zipcode, COUNTRY_CODE),
                'APPID' : OPEN_WEATHER_API_KEY,
                'units' : 'imperial'})
    url = OPEN_WEATHER_URL + params
    with urllib.request.urlopen(url) as f:
        data = json.loads(f.read().decode('utf-8'))
    return data['main']['temp']

if __name__ == '__main__':
    pass
