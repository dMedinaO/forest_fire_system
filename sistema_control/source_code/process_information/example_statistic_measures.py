import pandas as pd
import numpy as np
import json
import sys

def get_statistic_values(measure, dataset):

    average = float(np.mean(dataset[measure]))
    std_value = float(np.std(dataset[measure]))
    min_value = float(np.min(dataset[measure]))
    max_value = float(np.max(dataset[measure]))

    return {"average":average, "std": std_value, "min_value":min_value, "max_value":max_value}

#read csv
dataset = pd.read_csv("../../../measures_data/measures_data.csv")
filter_by_machine = int(sys.argv[1])#1 yes, 0 not

#using numpy to get some statistics and save information using a dictionary
list_measures = ['temp', 'hum', 'velocity']

dict_response = {}

if filter_by_machine == 1:
    
    #get unique machine on dataset
    machines = dataset['id_machine'].unique()

    for machine in machines:
        data_filter = dataset.loc[dataset['id_machine'] == machine]
        data_filter.reset_index(inplace=True)
    
        dict_measures = {}
        for measure in list_measures:
            dict_measures.update({measure:get_statistic_values(measure, data_filter)})
        
        dict_response.update({machine: dict_measures})
else:

    for measure in list_measures:
        dict_response.update({measure: get_statistic_values(measure, dataset)})

print(dict_response)