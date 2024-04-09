from django.core.management.base import BaseCommand
from core.models import *
import pandas as pd
from .ml import main
import ast

class Command(BaseCommand):
    help = 'Insert data from DataFrame to database'
    def handle(self, *args, **kwargs):
        print('start inserting')
        # Your DataFrame
        Model_nm = Exercise
        Pose_nm = 'Barbell Bench Press'
        df = pd.read_csv(r'C:\Users\mansi\VS Code Program\project\Django project\Pose Perfect\backend\core\management\commands\exercise.csv')
        # print(df)
        row = df[df['EXERCISE NAME']==Pose_nm]
        # print(row)
        dict = {}
        dict['POSE']=row['EXERCISE NAME'][0]
        dict['VIEW'] = row['VIEW'][0]
        dict['ORIENTATION'] = row['ORIENTATION'][0]
        for i in list(row.keys()[3:]):
            dict[i] = row[i][0]
        main(dict)
            
    