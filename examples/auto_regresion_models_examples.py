#An autoregression model makes an assumption that the observations at previous time steps are useful to predict the value at the next time step.
	
from pandas import read_csv
from matplotlib import pyplot
from pandas.plotting import lag_plot
from pandas.plotting import autocorrelation_plot
from statsmodels.graphics.tsaplots import plot_acf

series = read_csv('https://raw.githubusercontent.com/jbrownlee/Datasets/master/daily-min-temperatures.csv', header=0, index_col=0)
print(series.head())

#show time serie
series.plot()
pyplot.show()

#show scatter plot to demonstrate autocorrelation
lag_plot(series)
pyplot.show()

#show autocorrelation scatter
autocorrelation_plot(series)
pyplot.show()

#show another version of correlation models
plot_acf(series, lags=31)
pyplot.show()
