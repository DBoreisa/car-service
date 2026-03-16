from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'estimated_duration')
    search_fields = ('name',)
    
