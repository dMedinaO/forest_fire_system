import pandas as pd
import sys
import random

def create_random_measure(min_value, max_value):

    return random.randrange(min_value, max_value)

#get number examples to simulate
number_examples = 1*60*24*365#simulating a year
matrix_data = []

print("Process {} random measures".format(number_examples))
for i in range(number_examples):

    #random measures
    temp_value = create_random_measure(0, 100)
    hum_value = create_random_measure(0, 100)
    velocity_value = create_random_measure(0, 100)
    atm_value = create_random_measure(0, 100)
    response = create_random_measure(0,2)
    direction_value = create_random_measure(0, 5)#only four types of directions
    
    #insert into row values
    row = [i, temp_value, hum_value, direction_value, velocity_value, atm_value, response]

    #insert into matrix to export
    matrix_data.append(row)

print("Export to dataset")
#generate a dataset with simulated values
dataset = pd.DataFrame(matrix_data, columns=['id', 'temp', 'hum', 'direction', 'velocity', 'atm', 'response'])

#export to csv file
dataset.to_csv("random_measures_to_test.csv", index=False)