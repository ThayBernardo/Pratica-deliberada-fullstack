from django.urls import path, include
from rest_framework import routers
from user.views import UserViewSet

router = routers.DefaultRouter()
router.register('', UserViewSet, basename='user')

app_name = "user"
urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/detail', UserViewSet.as_view({'get': 'get_by_id'})),
    path('create', UserViewSet.as_view({'post': 'create'})),
    path('<int:pk>/update', UserViewSet.as_view({'put': 'update'})),
    path('<int:pk>/delete', UserViewSet.as_view({'delete': 'delete'})),
    path('<str:email>', UserViewSet.as_view({'get': 'get_by_email'})),
    path('verify_password/<str:email>/<str:password>', UserViewSet.as_view({'get': 'verify_user_password'})),
]
