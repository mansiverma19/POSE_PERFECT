from rest_framework.routers import SimpleRouter
from auth.views import RegisterViewSet,LoginViewSet,RefreshViewSet,BlacklistTokenViewSet

auth_router = SimpleRouter()

auth_router.register(r'auth/register',RegisterViewSet,basename='register')
auth_router.register(r'auth/login', LoginViewSet, basename='login')
auth_router.register(r'auth/refresh', RefreshViewSet, basename='refresh')
auth_router.register(r'auth/blacklist', BlacklistTokenViewSet, basename='blacklist')
