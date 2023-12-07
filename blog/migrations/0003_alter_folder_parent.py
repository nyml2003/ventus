# Generated by Django 4.2.4 on 2023-12-06 05:04

from django.db import migrations
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_author_options_alter_folder_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='parent',
            field=mptt.fields.TreeForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='blog.folder'),
        ),
    ]
