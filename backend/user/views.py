from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated,AllowAny

from .models import User
from user.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    http_method_names = ['get','post']
    serializer_class = UserSerializer
    # filter_backends = [filters.OrderingFilter]
    # ordering_fields = ['modified']
    # ordering = ['-modified']

    def get_queryset(self):
        # if sUserViewSetelf.request.user.is_superuser:
        #     return User.objects.all()
        return User.objects.filter(id=self.request.user.id)
        # return User.objects.all()

# class UserViewSet(viewsets.ModelViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()