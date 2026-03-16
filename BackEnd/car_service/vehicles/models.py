from django.db import models

class Vehicle(models.Model):
    vin = models.CharField(max_length=17, unique=True, db_index=True)
    plate_number = models.CharField(max_length=15)
    brand = models.CharField(max_length=20)
    model = models.CharField(max_length=20)
    year = models.PositiveIntegerField()
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='vehicles') # related_name creates one to many relationship
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.brand} {self.model} ({self.plate_number})"



