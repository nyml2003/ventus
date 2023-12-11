from django.db import models
from .base import BaseModel


class Friend(BaseModel):
    nickname = models.CharField(max_length=50, null=True, blank=True)  # 昵称
    avatar = models.URLField(null=True, blank=True)  # 头像
    brief = models.TextField(null=True, blank=True)  # 个人简介
    url = models.URLField(null=True, blank=True)  # 个人网站

    class Meta:
        verbose_name = "友链"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.nickname