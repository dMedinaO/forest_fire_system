import pandas as pd
import sys

dataset = pd.read_csv(sys.argv[1], sep=",")
new_dataset = pd.DataFrame()

for value in ['PDB', 'Chain', 'Mutation', 'Wild_type', 'Position', 'Mutated', 'pH', 'DDG']:
    new_dataset[value] = dataset[value]

dataset_training = new_dataset
response = new_dataset['DDG']

dataset_training = dataset_training.drop(columns=['DDG'])



