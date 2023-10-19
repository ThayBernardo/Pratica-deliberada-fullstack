from django.urls import path, include
from rest_framework import routers
from company.views import CompanyViewSet


router = routers.DefaultRouter()
router.register('', CompanyViewSet, basename='company')

app_name = "company"
urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/detail', CompanyViewSet.as_view({'get': 'get_by_id'})),
    path('create', CompanyViewSet.as_view({'post': 'create'})),
    path('<int:pk>/update', CompanyViewSet.as_view({'put': 'update'})),
    path('<int:pk>/delete', CompanyViewSet.as_view({'delete': 'delete'})),
    path('<int:user_id>/companys', CompanyViewSet.as_view({'get': 'get_company_by_user_id'}))
]