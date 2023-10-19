from django.contrib import admin
from company.models import Company


class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'timezone', 'language', 'created_at', 'updated_at')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    list_per_page = 10

admin.site.register(Company, CompanyAdmin)