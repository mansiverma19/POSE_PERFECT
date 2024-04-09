from user.serializers import UserSerializer
from rest_framework import serializers
from user.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("firstname","lastname","email","password","age","contact","address","gender","height","weight")
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user
        # user_obj = User.objects.create_user(firstname=input_data['firstname'],lastname=input_data['lastname'],email=input_data['emailid'], password=input_data['password'],age=input_data['age'],contact=input_data['contact'],address=input_data['location'],gender=input_data['gender'],height=input_data['height'],weight=input_data['weight']) 
        # user_obj.save()
        # return user_obj

class LoginSerializer(TokenObtainPairSerializer):
    # token_class = RefreshToken

    
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['access'] = str(refresh.access_token)
        data['refresh'] = str(refresh)
        data['user'] = UserSerializer(self.user).data

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

