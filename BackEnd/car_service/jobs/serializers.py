from rest_framework import serializers
from .models import Job 

class JobSerializer(serializers.ModelSerializer):
    vehicle_vin = serializers.ReadOnlyField(source='vehicle.vin')
    customer_email = serializers.ReadOnlyField(source='customer.email')
    mechanic_email = serializers.ReadOnlyField(source='mechanic.email')
    services_names = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = Job
        fields = [
            'id',
            'vehicle',
            'vehicle_vin',
            'customer',
            'customer_email',
            'mechanic',
            'mechanic_email',
            'services',
            'services_names',
            'status',
            'created_at',
            'started_at',
            'completed_at',
        ]