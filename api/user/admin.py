from django.contrib import admin
from user.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'password_reseted_at', 'verified_email', 'password', 'created_at', 'updated_at')
    list_display_links = ('email',)
    search_fields = ('email',)
    list_per_page = 10

# Modelo/config model admin
admin.site.register(User, UserAdmin)