from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from blog.fliter import ArticleBaseFilter
from blog.models import Article
from blog.serializers import ArticleBaseSerializer, ArticleCreateSerializer


class ArticleList(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleBaseSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filter_class = ArticleBaseFilter
    ordering_fields = ('created_at',)
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ArticleDetail(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleBaseSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ArticleCreate(CreateAPIView):
    serializer_class = ArticleCreateSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ArticleUpdate(UpdateAPIView):
    serializer_class = ArticleCreateSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ArticleDelete(DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleBaseSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
