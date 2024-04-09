from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import *
from core.serializers import *


class ExerciseViewSet(viewsets.ModelViewSet):

    permission_classes = (AllowAny,)
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()
    http_method_names = ['get','post']
    # lookup_field = None

    def create(self, request, *args, **kwargs):
        print("ttttttttttttt",request.data['POSE'])
        try:
            # Retrieve the specific exercise instance
            exercise = Exercise.objects.get(POSE=request.data['POSE'])

            # Serialize the specific exercise instance
            serializer = ExerciseSerializer(exercise)

            # Extract the data of the specific exercise from the serialized data
            specific_exercise_data = serializer.data
            print(specific_exercise_data)
            details = {}
            details = specific_exercise_data
            for key in specific_exercise_data['exercise_profile']:
                details[key] = specific_exercise_data['exercise_profile'][key]
            details['exercise_profile'] = None

            print("-----",details)
            return Response(details, status=status.HTTP_200_OK)


        except:
            return Response("No exercise found", status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'], url_path='all')
    def exercise_list(self, request):
        print("*","        ","**")

        try:
            exercises = self.get_queryset()
            # serializer = self.get_serializer(exercises, many=True)
            exercises = exercises.values_list("POSE",flat=True)
            print(exercises)
            return Response(exercises, status=status.HTTP_200_OK)
        except Exercise.DoesNotExist:
            return Response("No exercises found", status=status.HTTP_404_NOT_FOUND)


class YogaViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = YogaSerializer
    queryset = Yoga.objects.all()
    http_method_names = ['get','post']


    def create(self, request, *args, **kwargs):
        try:
            # Retrieve the specific exercise instance
            yoga = Yoga.objects.get(POSE=request.data['POSE'])

            # Serialize the specific exercise instance
            serializer = YogaSerializer(yoga)

            # Extract the data of the specific exercise from the serialized data
            specific_yoga_data = serializer.data  
            details = specific_yoga_data['yoga_profile']

            print("-----",details)
            return Response(details, status=status.HTTP_200_OK)


        except:
            return Response("No yoga found", status=status.HTTP_404_NOT_FOUND)


    @action(detail=False, methods=['get'], url_path='all')
    def yoga_list(self, request):
        try:
            yogas = self.get_queryset()
            # serializer = self.get_serializer(exercises, many=True)
            yogas = yogas.values_list("POSE",flat=True)
            print(yogas)
            return Response(yogas, status=status.HTTP_200_OK)
        except Yoga.DoesNotExist:
            return Response("No yogas found", status=status.HTTP_404_NOT_FOUND)


class PredictViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        print("ttttttttttttt",request.data['POSE'])
        try:
            # Retrieve the specific exercise instance
            exercise = Exercise.objects.get(POSE=request.data['POSE'])
            height = 185

            # Serialize the specific exercise instance
            serializer = ExerciseSerializer(exercise)

            # Extract the data of the specific exercise from the serialized data
            details = serializer.data
            details['HEIGHT'] = height
            print("-----",details)

            
            return Response(details, status=status.HTTP_200_OK)


        except:
            return Response("No exercise found", status=status.HTTP_404_NOT_FOUND)


