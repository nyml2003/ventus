from django.contrib import admin

# Register your models here.

from blog.models import Article, Author, Category, Folder, Tag, Friend

admin.site.register(Article)
admin.site.register(Author)
admin.site.register(Category)
admin.site.register(Folder)
admin.site.register(Tag)
admin.site.register(Friend)