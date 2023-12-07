from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, editable=False, verbose_name='更新时间')

    class Meta:
        abstract = True
