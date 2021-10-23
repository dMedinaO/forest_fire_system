#modulos necesarios para trabajar
import pandas as pd
import sys
import numpy as np

#scikit modules to use
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_validate
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier

#to get metrics
from sklearn.metrics import accuracy_score
from sklearn.metrics import f1_score
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score

def make_dict_performance(scores):

    dict_value = {key_value:np.mean(scores[key_value]) for key_value in scores}
    return dict_value

def get_measures(real_response, predict_response):

    accuracy = accuracy_score(real_response, predict_response)
    fscore = f1_score(real_response, predict_response, average='weighted')
    precision = precision_score(real_response, predict_response, average='weighted')
    recall = recall_score(real_response, predict_response, average='weighted')

    row_value = [accuracy, fscore, precision, recall]

    return row_value

#command run: python3 exploring_classification_model.py dataset_to_process

#lectura de dataset
dataset = pd.read_csv(sys.argv[1])

print("Process dataset")

#separar columna respuesta de columnas de datos
response = dataset['response']#la columma respuesta se llama response, si tiene otro nombre deben cambiarlo
dataset_not_response = dataset.drop(columns=['response'])

#separar entre entrenamiento y validacion, este proceso normalmente se ocupa en proporciones de 70:30 o 80:20 dependiendo de la cantidad de los datos
X_train, X_test, y_train, y_test = train_test_split(dataset_not_response, response, test_size=0.20)

#exploring different algorithms and hyperparameters to train the predictive model
summary_exploring_process = []#save the results using a matrix to export to csv files

#we use the next scores to evaluate the performance of the model
scoring = ['precision_weighted', 'recall_weighted', 'accuracy', 'f1_weighted']

#NOTE: all models are generated of equal form, in particular to prevent the overfitting we apply cross validation strategies

#exploring support vector machine
print("SVM exploration strategies")
for kernel in ['linear', 'poly', 'rbf', 'sigmoid']:

    print("Training with kernel: ", kernel)
    try:
        clf_model = SVC(kernel=kernel)
        clf_model.fit(X_train, y_train)
        scores = cross_validate(clf_model, X_train, y_train, scoring=scoring, cv=10)#you can change the number of validations decrease the param cv
        dict_response = make_dict_performance(scores)
        
        #get testing metrics
        response_testing = clf_model.predict(X_test)
        metrics_testing = get_measures(y_test, response_testing)

        #create row to save information
        training = "Params:kernel:{}".format(kernel)
        #'test_precision_weighted': 1.0, 'test_recall_weighted': 1.0, 'test_accuracy': 1.0, 'test_f1_weighted': 1.0}
        row_value = ["SVM", training, dict_response['fit_time'], dict_response['score_time'], dict_response['test_precision_weighted'], dict_response['test_recall_weighted'], dict_response['test_accuracy'], dict_response['test_f1_weighted']]
        row_value = row_value + metrics_testing
        summary_exploring_process.append(row_value)

    except:
        pass

print("Exploring RF")

for criterion in ['gini', 'entropy']:
    for n_estimators in [10, 50, 100, 150, 200, 250, 500, 1000]:

        try:
            clf_model = RandomForestClassifier(n_estimators=n_estimators, criterion=criterion,n_jobs=-1)
            clf_model.fit(X_train, y_train)
            scores = cross_validate(clf_model, X_train, y_train, scoring=scoring, cv=10)#you can change the number of validations decrease the param cv
            dict_response = make_dict_performance(scores)
            
            #get testing metrics
            response_testing = clf_model.predict(X_test)
            metrics_testing = get_measures(y_test, response_testing)

            #create row to save information
            training = "Params:n_estimators:{}-criterion:{}".format(n_estimators, criterion)
            #'test_precision_weighted': 1.0, 'test_recall_weighted': 1.0, 'test_accuracy': 1.0, 'test_f1_weighted': 1.0}
            row_value = ["RF", training, dict_response['fit_time'], dict_response['score_time'], dict_response['test_precision_weighted'], dict_response['test_recall_weighted'], dict_response['test_accuracy'], dict_response['test_f1_weighted']]
            row_value = row_value + metrics_testing
            summary_exploring_process.append(row_value)
        except:
            pass

print("Exploring KNN")
for n in range(3, 10):
    clf_model = KNeighborsClassifier(n_neighbors=n, n_jobs=-1)
    clf_model.fit(X_train, y_train)
    scores = cross_validate(clf_model, X_train, y_train, scoring=scoring, cv=10)#you can change the number of validations decrease the param cv
    dict_response = make_dict_performance(scores)
    
    #get testing metrics
    response_testing = clf_model.predict(X_test)
    metrics_testing = get_measures(y_test, response_testing)

    #create row to save information
    training = "Params:n_neighbors:{}".format(n)
    #'test_precision_weighted': 1.0, 'test_recall_weighted': 1.0, 'test_accuracy': 1.0, 'test_f1_weighted': 1.0}
    row_value = ["KNN", training, dict_response['fit_time'], dict_response['score_time'], dict_response['test_precision_weighted'], dict_response['test_recall_weighted'], dict_response['test_accuracy'], dict_response['test_f1_weighted']]
    row_value = row_value + metrics_testing
    summary_exploring_process.append(row_value)

df_export = pd.DataFrame(summary_exploring_process, columns=['algorithm', 'params', 'fit_time', 'scoring_time', 'test_precision_weighted', 'test_recall_weighted', 'test_accuracy', 'test_f1_weighted', 'accuracy', 'fscore', 'precision', 'recall'])
df_export.to_csv("summary_exploring_training_models.csv", index=False)
