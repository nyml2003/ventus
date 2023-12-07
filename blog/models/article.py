from django.db import models
from .base import BaseModel
from mptt.models import TreeForeignKey
from .author import Author
from .tag import Tag
from .category import Category
from .folder import Folder


class Article(BaseModel):
    title = models.CharField(max_length=20, verbose_name='标题')
    content = models.TextField(verbose_name='内容')
    folder = TreeForeignKey(Folder, null=True, blank=True, related_name='articles', verbose_name='目录', on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, verbose_name='标签', blank=True)
    author = models.ForeignKey(Author, verbose_name='作者', on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(Category, verbose_name='分类', on_delete=models.SET_NULL, null=True, blank=True)
    is_top = models.BooleanField(default=False, verbose_name='置顶')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = '文章'
        verbose_name_plural = '文章'
        unique_together = ('title', 'folder')

    def save(self, *args, **kwargs):
        if self.folder_id is None:
            self.folder_id = 0
        super().save(*args, **kwargs)
