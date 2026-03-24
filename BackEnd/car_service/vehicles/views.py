from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Vehicle
from django.db.models import Q
from .serializers import VehicleSerializer

class VehicleViewSet(ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated] # default

    def get_queryset(self):
        user = self.request.user
        queryset = Vehicle.objects.all()
        limit = self.request.query_params.get('limit')

        # only admin sees all vehicles
        if user.role != 'ADMIN':
            queryset = queryset.filter(owner=user)
        
        # Filters
        brand = self.request.query_params.get('brand')
        year = self.request.query_params.get('year')
        search = self.request.query_params.get('search')

        if search:
            queryset = queryset.filter(
                Q(brand__icontains=search) |
                Q(model__icontains=search) |
                Q(vin__icontains=search) |
                Q(plate_number__icontains=search)
            )
        
        if year:
            queryset = queryset.filter(year=year)

        # Apply limit if specified
        if limit:
            queryset = queryset[:int(limit)]

        return queryset
    
    def perform_create(self, serializer):
        # Set the owner to the current user when creating a vehicle
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        # Ensure that only the owner or admin can update the vehicle
        vehicle = self.get_object()

        if self.request.user.role != 'ADMIN' and vehicle.owner != self.request.user:
            raise PermissionDenied("You do not have permission to update this vehicle.")
        
        serializer.save() # owner stays unchanged

    def perform_destroy(self, instance):
        # Prevent users from deleting others vehicles
        if self.request.user.role != 'ADMIN' and instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to delete this vehicle.")
        
        instance.delete()
