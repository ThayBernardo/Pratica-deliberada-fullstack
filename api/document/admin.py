from django.contrib import admin
from document.models import Document


class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'deleted', 'limit_date', 'signed', 'created_at', 'updated_at', 'company')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    list_per_page = 10

admin.site.register(Document, DocumentAdmin)