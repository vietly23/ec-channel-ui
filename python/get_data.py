import random
import json

if __name__ == '__main__':
	current_demand = int((random.random() * 5 + 9) * 100) / 100
	air_conditioning = round(random.random() * 10, 2) + 20
	lighting =  round(random.random() * 5, 2) + 15
	home_appliance = round(random.random() * 7, 2) + 48
	misc = round(random.random() * 4, 2) + 5
	power_consumption = [
			{'name' : 'current_demand', 'value' : current_demand}, 
			{'name' : 'air_conditioning', 'value' : air_conditioning},
			{'name' : 'lighting', 'value' : lighting},
			{'name' :'home_appliances', 'value' : home_appliance},
			{'name' : 'misc', 'value' : misc}
			]
	print(json.dumps(power_consumption))
	
