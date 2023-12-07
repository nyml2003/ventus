from .base import BaseModel
from django.db import models


class Tag(BaseModel):
    name = models.CharField(max_length=20, verbose_name='标签名', unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '标签'
        verbose_name_plural = '标签'
