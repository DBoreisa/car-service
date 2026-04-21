from rest_framework import serializers
from .models import Job 

class JobSerializer(serializers.ModelSerializer):
    vehicle_plate = serializers.ReadOnlyField(source='vehicle.plate_number')
    vehicle_vin = serializers.ReadOnlyField(source='vehicle.vin')
    customer_email = serializers.ReadOnlyField(source='vehicle.owner.email')
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
            'vehicle_plate',
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

    def create(self, validated_data):
        services = validated_data.pop('services', [])
        job = Job.objects.create(**validated_data)
        job.services.set(services)
        return job
    
    def update(self, instance, validated_data):
        services = validated_data.pop('services', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if services is not None:
            instance.services.set(services)
            
        return instance