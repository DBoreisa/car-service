from rest_framework.viewsets import ModelViewSet
from .models import Vehicle
from .serializers import VehicleSerializer
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsAdmin, IsCustomer

class VehicleViewSet(ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated] # default

    def get_queryset(self):
        user = self.request.user
        # Admin see all vehicles
        if user.role == 'ADMIN':
            return Vehicle.objects.all()
        # Customers see only their vehicles
        return Vehicle.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        # Set the owner to the current user when creating a vehicle
        serializer.save(owner=self.request.user)