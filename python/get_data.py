import random
import json

if __name__ == '__main__':
	current_demand = round(random.random() * 5, 2) + 9
	air_conditioning = round(random.random() * 10, 2) + 20
	lighting =  round(random.random() * 5, 2) + 15
	home_appliance = round(random.random() * 7, 2) + 48;
	misc = round(random.random() * 4, 2) + 5;
	power_consumption = {'current_demand' : current_demand, 
			'air_conditioning' : air_conditioning, 
			'lighting' : lighting,
			'home_appliances' : home_appliance,
			'misc' : misc}
	print(json.dumps(power_consumption))
	
