from django.core.management.base import BaseCommand
from core.models import *
import pandas as pd

class Command(BaseCommand):
    help = 'Insert data from DataFrame to database'
    def handle(self, *args, **kwargs):
        print('start inserting')
        # Your DataFrame
        Model_nm = Yoga
        df = pd.read_csv(r'S:\My Project\PosePerfect\backend\core\management\commands\exercise.csv')
        count = len(Model_nm.objects.all())
    
       
        # Insert data into database
        for i in range(count,2):
            row = df.iloc[i]
            my_model_instance = Model_nm(
                POSE=row['EXERCISE NAME'],
                VIEW=row['VIEW'],
                ORIENTATION=row['ORIENTATION'],
                KNEE=row['KNEE'],
                HIP=row['HIP'],
                TORSO=row['TORSO'],
                SHOULDER=row['SHOULDER'],
                ELBOW=row['ELBOW'],
                ANKLE=row['ANKLE'],
                NECK=row['NECK'],
                WRIST=row['WRIST'],
                LEFT_ANKLE_AR =row['LEFT_ANKLE_AR'],
                RIGHT_ANKLE_AR = row['RIGHT_ANKLE_AR'],
                LEFT_KNEE_AR = row['LEFT_KNEE_AR'],
                RIGHT_KNEE_AR = row['RIGHT_KNEE_AR'],	
                HIP_AR = row['HIP_AR'],
                LEFT_TORSO_AR = row['LEFT_TORSO_AR'],
                RIGHT_TORSO_AR = row['RIGHT_TORSO_AR'],
                LEFT_SHOULDER_AR = row['LEFT_SHOULDER_AR'],
                RIGHT_SHOULDER_AR =	row['RIGHT_SHOULDER_AR'],
                LEFT_ELBOW_AR = row['LEFT_ELBOW_AR'],
                RIGHT_ELBOW_AR = row['RIGHT_ELBOW_AR'],
                LEFT_WRIST_AR = row['LEFT_WRIST_AR'],
                RIGHT_WRIST_AR = row['RIGHT_WRIST_AR']
                # Add more fields as needed
            )
            my_model_instance.save()
        print('Successfully inserted data into yoga table')
        self.stdout.write(self.style.SUCCESS('Data inserted successfully'))