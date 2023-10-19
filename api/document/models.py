from django.db import models


class Document(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    updated_at = models.DateTimeField(auto_now=True, blank=False, null=False)
    limit_date = models.DateField(blank=True, null=True)
    signed = models.BooleanField(default=False)
    company = models.ForeignKey('company.Company', on_delete=models.CASCADE)
    created_by = models.ForeignKey('user.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.name