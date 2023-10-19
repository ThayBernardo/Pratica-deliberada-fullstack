from django.urls import path, include
from rest_framework import routers
from document.views import DocumentViewSet


router = routers.DefaultRouter()
router.register('', DocumentViewSet, basename='document')

app_name = "document"
urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/detail', DocumentViewSet.as_view({'get': 'get_by_id'})),
    path('create', DocumentViewSet.as_view({'post': 'create'})),
    path('<int:pk>/update', DocumentViewSet.as_view({'put': 'update'})),
    path('<int:pk>/delete', DocumentViewSet.as_view({'delete': 'delete'})),
    path('all_documents_by_user/<str:email>', DocumentViewSet.as_view({'get': 'get_docs_by_user_email'}))
]