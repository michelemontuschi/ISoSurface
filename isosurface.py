import json
import os
import dash
import dash_core_components as dcc
import dash_html_components as html
import dash_bootstrap_components as dbc
import dash_table as tb
import dash_daq as daq
import dash_auth
import pandas as pd
import numpy as np
import ast
from dash.dependencies import ClientsideFunction, Input, Output,State
from flask import request
import math
import time
from scipy.interpolate import griddata



import plotly.graph_objects as go

try:
    import cPickle as pickle
except ModuleNotFoundError:
    import pickle

axis_template = {
    'showbackground': True,
    'backgroundcolor': '#303030',
    'gridcolor': 'rgb(255, 255, 255)',
    'zerolinecolor': 'rgb(255, 255, 255)',
    'title': 'Lon',
}

init_plot_layout = {
    'title': '',
    'margin': {'t': 0, 'b': 0, 'l': 0, 'r': 0},
    'font': {'size': 12, 'color': 'white'},
    'showlegend': False,
    'plot_bgcolor': '#141414',
    'paper_bgcolor': '#141414',
    'scene': {
        'xaxis': axis_template,
        'yaxis': axis_template,
        'zaxis': axis_template,

    },
}
config3d = {'editable': False,
            'scrollZoom': True,
            'displaylogo': False,
            'toImageButtonOptions': {
                'format': 'png',  # one of png, svg, jpeg, webp
                'filename': 'download',
                'height': 500,
                'width': 700,
                'scale': 1  # Multiply title/legend/axis/canvas sizes by this factor
            }
            }
config2d = {'editable': False, 'scrollZoom': True, 'displayModeBar': False, 'displaylogo': False}


app = dash.Dash(
    __name__,
    meta_tags=[
        {'name': 'viewport', 'content': 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'},
        {'name': 'theme-color', 'content': '#000000'},
        {'name': 'mobile-web-app-capable', 'content': 'yes'},
        ],


)

server = app.server

app.title = ''

app.layout = html.Div([

    html.Div(id='container', children=[
        # left column
        html.Div(id='left-column', children=[
            html.Button('Load', id='button')
        ], className='one-third30 column app__left__section', ),

        # Right Column
        html.Div(id='right-column', children=[
            html.Div(id='3D-model-div',children=[
                dcc.Loading(id='loading-sur', children=[
                        dcc.Graph(
                            id='3D-model-sur',
                            figure={
                                'data': [],
                            }, config=config3d, style={"height": "90vh", "display": "Block"})]),
            dcc.Loading(id='loading-vol', children=[
                        dcc.Graph(
                            id='3D-model-vol',
                            figure={
                                'data': [],
                            }, config=config3d, style={"height": "90vh", "display": "Block"})]),
            ]),
        ], className='two-thirds70 column app__right__section',),
    ]),
    html.Div(id='turn', children=[])
])


@app.callback([Output('3D-model-sur', 'figure'),Output('3D-model-vol', 'figure')],[Input('button', 'n_clicks')])
def load3d(nclick):
    df = pd.read_csv('./modello_area_A.xyz', header=None, index_col=False , names=['X', 'Y', 'Z', 'data'], delimiter='\t')
    #print(df)
    fig=go.Figure()


    step=0.5
    step_z=0.1

    Xo=(df['X'])
    Yo=(df['Y'])
    Zo=(df['Z'])

    Do=(df['data'].to_numpy())

    x_max = (max(df['X'].to_list()))
    x_min = (min(df['X'].to_list()))
    y_min = (min(df['Y'].to_list()))
    y_max = (max(df['Y'].to_list()))
    z_min = (min(df['Z'].to_list()))
    z_max = (max(df['Z'].to_list()))

    X, Y, Z = np.mgrid[x_min:x_max:0.5, y_min:y_max:0.5, z_min:z_max:0.1]
    points = np.stack((Xo, Yo, Zo), axis=-1)
    values = np.array(Do)
    request = (X, Y, Z)
    D=(griddata(points, values, request))
    D=np.nan_to_num(D, 0)
    x = X.flatten()
    y = Y.flatten()
    z = Z.flatten()

    d = D.flatten()


    fig_sur = go.Figure(data=go.Isosurface(
        x=x,
        y=y,
        z=z,
        value=d,
        isomin=500,
        isomax=30000,
        opacity=0.1,  # needs to be small to see through all surfaces
        surface_count=17,  # needs to be a large number for good volume rendering
    ))
    fig_sur.update_layout(title='',
                      margin=dict(t=0, b=0, l=0, r=0),
                      font=dict(size=12, color='white'),
                      showlegend=False,
                      plot_bgcolor='#303030', paper_bgcolor='#303030',
                      scene=dict(xaxis=axis_template, yaxis=axis_template, zaxis=axis_template, ),
                      hoverlabel=dict(namelength=0),
                      )
    fig_vol = go.Figure(data=go.Volume(
        x=x,
        y=y,
        z=z,
        value=d,
        isomin=500,
        isomax=30000,
        opacity=0.1,  # needs to be small to see through all surfaces
        surface_count=17,  # needs to be a large number for good volume rendering
    ))
    fig_vol.update_layout(title='',
                      margin=dict(t=0, b=0, l=0, r=0),
                      font=dict(size=12, color='white'),
                      showlegend=False,
                      plot_bgcolor='#303030', paper_bgcolor='#303030',
                      scene=dict(xaxis=axis_template, yaxis=axis_template, zaxis=axis_template, ),
                      hoverlabel=dict(namelength=0),
                      )

    return fig_sur, fig_vol




if __name__ == '__main__':
    # app.run_server()
    app.run_server(debug=True)