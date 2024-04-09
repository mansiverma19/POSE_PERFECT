from rest_framework.routers import SimpleRouter
from core.views import ExerciseViewSet,YogaViewSet,PredictViewSet

core_router = SimpleRouter()

core_router.register(r'Exercise/details',ExerciseViewSet,basename='Exercise_details')
core_router.register(r'Yoga/details',YogaViewSet,basename='Yoga_details')
core_router.register(r'Predict',PredictViewSet,basename='predict')