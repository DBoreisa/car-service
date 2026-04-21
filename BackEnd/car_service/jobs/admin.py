from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'vehicle', 'get_customer', 'mechanic', 'status', 'created_at')
    search_fields = ('vehicle__vin', 'vehicle__owner__email', 'mechanic__email')
    list_filter = ('status', 'created_at')

    def get_customer(self, obj):
        return obj.vehicle.owner.email
