from django.db import models

# Create your models here.
class Exercise(models.Model):
    POSE= models.CharField(primary_key=True,max_length=255, blank=False)
    VIEW =  models.CharField(max_length=255, blank=False)
    ORIENTATION = models.CharField(max_length=255, blank=False)
    KNEE = models.IntegerField(default=1,blank=False)
    HIP = models.IntegerField(default=1,blank=False)
    TORSO = models.IntegerField(default=1,blank=False)
    SHOULDER = models.IntegerField(default=1,blank=False)
    ELBOW = models.IntegerField(default=1,blank=False)
    ANKLE = models.IntegerField(default=1,blank=False)
    NECK = models.IntegerField(default=1,blank=False)
    WRIST= models.IntegerField(default=1,blank=False)
    LEFT_ANKLE_AR = models.TextField(null=True)
    RIGHT_ANKLE_AR = models.TextField(null=True)
    LEFT_KNEE_AR = models.TextField(null=True)
    RIGHT_KNEE_AR = models.TextField(null=True)
    HIP_AR = models.TextField(null=True)
    LEFT_TORSO_AR = models.TextField(null=True)
    RIGHT_TORSO_AR = models.TextField(null=True)
    LEFT_SHOULDER_AR = models.TextField(null=True)
    RIGHT_SHOULDER_AR = models.TextField(null=True)
    LEFT_ELBOW_AR = models.TextField(null=True)
    RIGHT_ELBOW_AR = models.TextField(null=True)
    LEFT_WRIST_AR = models.TextField(null=True)
    RIGHT_WRIST_AR = models.TextField(null=True)

    def __str__(self):
        return f'{self.POSE}'
class Yoga(models.Model):
    POSE= models.CharField(primary_key=True,max_length=255, blank=False)
    VIEW =  models.CharField(max_length=255, blank=False)
    ORIENTATION = models.CharField(max_length=255, blank=False)  
    KNEE = models.IntegerField(default=1,blank=False)
    HIP = models.IntegerField(default=1,blank=False)
    TORSO = models.IntegerField(default=1,blank=False)
    SHOULDER = models.IntegerField(default=1,blank=False)
    ELBOW = models.IntegerField(default=1,blank=False)
    ANKLE = models.IntegerField(default=1,blank=False)
    NECK = models.IntegerField(default=1,blank=False)
    WRIST= models.IntegerField(default=1,blank=False)
    LEFT_ANKLE_AR = models.TextField(null=True)
    RIGHT_ANKLE_AR = models.TextField(null=True)
    LEFT_KNEE_AR = models.TextField(null=True)
    RIGHT_KNEE_AR = models.TextField(null=True)
    HIP_AR = models.TextField(null=True)
    LEFT_TORSO_AR = models.TextField(null=True)
    RIGHT_TORSO_AR = models.TextField(null=True)
    LEFT_SHOULDER_AR = models.TextField(null=True)
    RIGHT_SHOULDER_AR = models.TextField(null=True)
    LEFT_ELBOW_AR = models.TextField(null=True)
    RIGHT_ELBOW_AR = models.TextField(null=True)
    LEFT_WRIST_AR = models.TextField(null=True)
    RIGHT_WRIST_AR = models.TextField(null=True)

    def __str__(self):
        return f'{self.POSE}'
    
class ExerciseProfile(models.Model):
    POSE= models.OneToOneField(Exercise, related_name="exercise_profile", on_delete=models.CASCADE)
    Description = models.TextField(null=True)
    Steps = models.TextField(null=True) 
    Advantage = models.TextField(null=True) 
    Precaution = models.TextField(null=True)
    GIF = models.TextField(null=True)

    def __str__(self):
        return f'{self.POSE.POSE}'

class YogaProfile(models.Model):
    POSE= models.OneToOneField(Yoga, related_name="yoga_profile", on_delete=models.CASCADE)
    Description = models.TextField(null=True)
    Steps = models.TextField(null=True) 
    Advantage = models.TextField(null=True)  
    Precaution = models.TextField(null=True)
    GIF = models.TextField(null=True)

    def __str__(self):
        return f'{self.POSE.POSE}'


    