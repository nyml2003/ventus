from django.db import models
from .base import BaseModel


class Author(BaseModel):
    name = models.CharField(max_length=100)
    avatar_url = models.CharField(max_length=255, null=True, blank=True, default=None)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '作者'
        verbose_name_plural = '作者'