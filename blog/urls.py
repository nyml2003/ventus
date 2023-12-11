from django.urls import path

from blog.views import *

urlpatterns = [
    path('articles/list/', ArticleList.as_view()),
    path('articles/detail/<int:pk>/', ArticleDetail.as_view()),
    path('articles/create/', ArticleCreate.as_view()),
    path('articles/update/<int:pk>/', ArticleUpdate.as_view()),
    path('articles/delete/<int:pk>/', ArticleDelete.as_view()),
    path('folders/<int:pk>/', FolderDetail.as_view()),
    path('files/list/<int:pk>/', FileList.as_view()),
    path('friends/list/', FriendList.as_view()),
]
