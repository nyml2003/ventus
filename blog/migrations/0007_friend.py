# Generated by Django 4.2.4 on 2023-12-10 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_rename_created_at_article_create_time_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('nickname', models.CharField(blank=True, max_length=50, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatar')),
                ('brief', models.TextField(blank=True, null=True)),
                ('url', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
