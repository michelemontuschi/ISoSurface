import numpy as np


import pandas as pd
from scipy.interpolate import interpn
from scipy.interpolate import griddata

import pickle
import math
import time
import tqdm


if __name__ == '__main__':
    df = pd.read_csv('./modello_area_A.xyz', header=None, index_col=False, names=['X', 'Y', 'Z', 'data'],
                     delimiter='\t')
    # print(df)

    step = 0.5
    step_z = 0.1

    Xo = (df['X'])
    Yo = (df['Y'])
    Zo = (df['Z'])



    Do = (df['data'].to_numpy())



    x_max = (max(df['X'].to_list()))
    x_min = (min(df['X'].to_list()))
    y_min = (min(df['Y'].to_list()))
    y_max = (max(df['Y'].to_list()))
    z_min = (min(df['Z'].to_list()))
    z_max = (max(df['Z'].to_list()))

    X, Y, Z = np.mgrid[x_min:x_max:0.5,y_min:y_max:0.5, z_min:z_max:0.1]
    points = np.stack((Xo, Yo, Zo), axis=-1)
    values = np.array(Do)
    request = (X, Y, Z)
    D=(griddata(points, values, request))
    D=np.nan_to_num(D, 0)

    #D = (X * X * 0.5 + Y * Y + Z * Z * 2)/100
    #D = np.sin(X*Y*Z)/((X/x_max)*(Y/y_max)*(Z/z_max))

    x=X.flatten()
    y=Y.flatten()
    z=Z.flatten()

    x = X.flatten()
    y = Y.flatten()
    z = Z.flatten()
    d = D.flatten()

    print(len(x))
    print(len(y))
    print(len(z))
    print(len(d))
    print(min(d))
    print(max(d))






