import pandas as pd
import sys
from datetime import datetime
import os

line_value = sys.argv[1]

#split line
measures_values = line_value.split(":")

#array mustbe the next values:
#ID, temp, hum, dir viento, vel viento

#get current date
now = datetime.now()
dt_string = now.strftime("%Y/%m/%d")
hour_string = now.strftime("%H:%M:%S")

#save new measure
new_measures = [dt_string, hour_string] + measures_values
matrix_data = [new_measures]
data_to_export = pd.DataFrame(matrix_data, columns=['date', 'hour', 'id_machine', 'temp', 'hum', 'direction', 'velocity'])

#ask if file exist on path 
list_files = os.listdir("../../../measures_data/")

#adding data depending of the update or create
if len(list_files)>0:
    data_actual = pd.read_csv("../../../measures_data/measures_data.csv")

    data_append = data_to_export.append(data_actual)
    data_append.to_csv("../../../measures_data/measures_data.csv", index=False)

else:
    data_to_export.to_csv("../../../measures_data/measures_data.csv", index=False)


