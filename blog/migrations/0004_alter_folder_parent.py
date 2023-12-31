# Generated by Django 4.2.4 on 2023-12-06 05:09

from django.db import migrations
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_alter_folder_parent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='parent',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='blog.folder'),
        ),
    ]
