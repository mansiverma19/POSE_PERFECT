# from auth.serializers import RegisterSerializer
# from rest_framework import serializers,viewsets
# from django.contrib.auth import authenticate
# # Create your views here.

# class RegisterViewset(viewsets.ViewSet):
# 	permission_classes = (permissions.AllowAny,)
# 	http_method_names = ['post']       
# 	def post(self, request):                                                                                                                                                           def post(self, request):
# 		input_data = request.data
# 		serializer = UserRegisterSerializer(data=input_data)
# 		if serializer.is_valid(raise_exception=True):
# 			user = serializer.create(input_data)
# 			if user:
# 				# refresh = RefreshToken.for_user(user)
# 				res = {
# 					"user": serializer.data,
# 				}
# 				return Response(res, status=status.HTTP_201_CREATED)
# 		return Response(status=status.HTTP_400_BAD_REQUEST)

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from user.models import User  # Assuming your User model is in auth.models
from auth.serializers import RegisterSerializer,LoginSerializer
# from user.serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView, TokenBlacklistView

class RegisterViewSet(viewsets.ModelViewSet,TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    http_method_names = ['post']
    serializer_class = RegisterSerializer


    def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        print('........... Request Data:', request.data, '...............')
        if serializer.is_valid():
            user = serializer.save()
            if user:
                print('.........','User Saved','............')
                # refresh = RefreshToken.for_user(user)

                res = {
                    # "access": str(refresh.access_token),
                    # "refresh": str(refresh),
                    "user": serializer.data,
                }
                print("##########",res,"###########")
                return Response(res, status=status.HTTP_201_CREATED)
        else:
            print('Errors:', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        print(".............serializer.validated_data",serializer.validated_data,".................")
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        print(".............refresh_data",serializer.validated_data,".................")

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class BlacklistTokenViewSet(viewsets.ViewSet, TokenBlacklistView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

            
        return Response(serializer.validated_data, status=status.HTTP_205_RESET_CONTENT)