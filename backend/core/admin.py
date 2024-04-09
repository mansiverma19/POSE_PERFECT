from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin


class CustomExercise(admin.ModelAdmin):
    list_display = ("POSE", "VIEW", 'ORIENTATION','KNEE','HIP',	'TORSO','SHOULDER','ELBOW','ANKLE','NECK','WRIST')

# Register your models here.
admin.site.register(Exercise,CustomExercise)
admin.site.register(Yoga,CustomExercise)
admin.site.register(ExerciseProfile)
admin.site.register(YogaProfile)