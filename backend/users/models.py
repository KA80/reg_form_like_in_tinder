from django.db import models


class User(models.Model):
    mail = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)