#import libraries
import pandas as pd
import sys
import numpy as np
import json

def get_statistic_measures(dataset, column):
    return 0
    
#read dataset using pandas library, this is a csv with measures to training a dataset based on response
dataset = pd.read_csv(sys.argv[1], sep=",")

#get response dataset
response = dataset['response']

#remove columns not used to training
dataset.drop(columns=['response', 'id'], inplace=True)

#apply scale process






