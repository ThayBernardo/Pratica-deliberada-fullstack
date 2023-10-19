from django.db import models


class Company(models.Model):
    LANGUAGES = [
        ('pt', 'Português'),
        ('en', 'English'),
        ('es', 'Español')
    ]

    name = models.CharField(max_length=255, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    updated_at = models.DateTimeField(auto_now=True, blank=False, null=False)
    timezone = models.CharField(max_length=50, default='-03:00')
    language = models.CharField(max_length=2, default='pt', choices=LANGUAGES)
    created_by = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='created_company', db_constraint=False)
    users = models.ManyToManyField('user.User', related_name='companies')
