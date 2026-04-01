from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.viewsets import ModelViewSet

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth import get_user_model

from .serializers import CustomTokenObtainPairSerializer, UserSerializer

User = get_user_model()

class LogoutView(APIView):
    permission_classes = (IsAuthenticated)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"detail": "Successfully logged out."},
                status=status.HTTP_205_RESET_CONTENT
            )
        
        except Exception:
            return Response(
                {"detail": "Invalid refresh token."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Admin sees all users
        if user.role == "ADMIN":
            return User.objects.all()

        # Normal user sees only themselves
        return User.objects.filter(id=user.id)
    
    def perform_create(self, serializer):
        if self.request.user.role != "ADMIN":
            raise PermissionDenied("You do not have permission to create a user.")
        
        serializer.save()

    def perform_update(self, serializer):
        user = self.get_object()

        if self.request.user.role != "ADMIN" and self.request.user != user:
            raise PermissionDenied("You do not have permission to edit this user.")
        
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user.role != "ADMIN":
            raise PermissionDenied("You do not have permission to delete this user.")
        
        instance.delete()