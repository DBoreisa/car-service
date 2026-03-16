from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    estimated_duration = models.DurationField()

    def __str__(self): 
        return f"{self.name} - ${self.price}"

        

    
