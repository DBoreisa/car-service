from django.contrib import admin
from .models import Vehicle

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('vin', 'plate_number', 'brand', 'model', 'year', 'owner', 'created_at')
    search_fields = ('vin', 'plate_number', 'brand', 'model', 'owner__username', 'owner__email')
    list_filter = ('brand', 'year', 'created_at')
    