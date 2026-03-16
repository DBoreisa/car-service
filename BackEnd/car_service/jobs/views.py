from rest_framework.viewsets import ModelViewSet
from .models import Job
from .serializers import JobSerializer
from rest_framework.permissions import IsAuthenticated

class JobViewSet(ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated] # default

    def get_queryset(self):
        user = self.request.user
        # Admin see all jobs
        if user.role == 'ADMIN':
            return Job.objects.all()
        # Mechanics see only their assigned jobs
        if user.role == 'MECHANIC':
            return Job.objects.filter(mechanic=user)
        # Customers see only jobs for their vehicles
        else:
            return Job.objects.filter(vehicle__owner=user)
