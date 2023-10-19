from django.db import models
from django.utils import timezone
from django.core.validators import MinLengthValidator


class User(models.Model):
    email = models.CharField(max_length=255, blank=False, null=False)
    password_reseted_at = models.DateTimeField(default=timezone.now)
    verified_email = models.BooleanField(default=False)
    password = models.CharField(max_length=255, blank=False, null=False, validators=[MinLengthValidator(6)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    company = models.OneToOneField('company.Company', on_delete=models.CASCADE, related_name='user', blank=True, null=True)
    documents = models.ManyToManyField('document.Document')

    
    def save(self, *args, **kwargs):
        if self.pk:
            original = User.objects.get(pk=self.pk)
            if original.password != self.password:
                self.password_reseted_at = timezone.now
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.email