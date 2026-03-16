from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'vehicle', 'customer', 'mechanic', 'status', 'created_at')
    search_fields = ('vehicle__vin', 'customer__email', 'mechanic__email')
    list_filter = ('status', 'created_at')
