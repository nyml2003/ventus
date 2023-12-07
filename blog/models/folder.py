from django.db.models.signals import post_migrate
from django.dispatch import receiver
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from django.db import models


class Folder(MPTTModel):
    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='children',
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class MPTTMeta:
        order_insertion_by = ['name']

    class Meta:
        verbose_name = '目录'
        verbose_name_plural = '目录'
        unique_together = ('parent', 'name')

    def save(self, *args, **kwargs):
        if self.parent_id is None:
            self.parent_id = 0
        if self.parent_id == self.id:
            raise ValueError('父目录不能是自己')
        super().save(*args, **kwargs)


@receiver(post_migrate)
def create_root_folder(sender, **kwargs):
    if Folder.objects.filter(pk=0).exists():
        return
    Folder.objects.create(
        id=0,
        name='root',
        parent=None,
    )


