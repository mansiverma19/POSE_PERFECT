from rest_framework import serializers
from .models import *


class ExerciseProfileSerializer(serializers.ModelSerializer):
    # pose_profile = ExerciseSerializer()
    class Meta:
        model = ExerciseProfile
        fields = '__all__'


class ExerciseSerializer(serializers.ModelSerializer):
    exercise_profile = ExerciseProfileSerializer()
    class Meta:
        model = Exercise
        fields = "__all__"


class YogaProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = YogaProfile
        fields = '__all__'

class YogaSerializer(serializers.ModelSerializer):
    yoga_profile = YogaProfileSerializer()
    class Meta():
        model = Yoga
        fields = "__all__"