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

        queryset = Job.objects.select_related(
            'vehicle', 'vehicle__owner', 'mechanic'
        ).prefetch_related('services')

        if user.role == 'ADMIN':
            return queryset

        if user.role == 'MECHANIC':
            return queryset.filter(mechanic=user)

        return queryset.filter(vehicle__owner=user)
