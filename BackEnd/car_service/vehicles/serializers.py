from rest_framework import serializers
from .models import Vehicle

class VehicleSerializer(serializers.ModelSerializer):
    owner_email = serializers.ReadOnlyField(source='owner.email') # include owner's email in the serialized output
    
    class Meta:
        model = Vehicle
        fields = ['id', 'vin', 'plate_number', 'brand', 'model', 'year', 'owner_email', "owner"] 