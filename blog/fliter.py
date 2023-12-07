from django_filters import rest_framework as filters
from blog.models import Article
from django.db.models import Q


class ArticleBaseFilter(filters.FilterSet):
    keyword = filters.CharFilter(method='search_keyword')
    category = filters.CharFilter(field_name='category__name', lookup_expr='icontains')
    tag = filters.CharFilter(field_name='tag__name', lookup_expr='icontains')
    created_time = filters.DateFromToRangeFilter(field_name='created_at')

    class Meta:
        model = Article
        fields = ('keyword', 'category', 'tag', 'folder', 'created_at')

    def search_keyword(self, queryset, name, value):
        return queryset.filter(Q(title__icontains=value) | Q(content__icontains=value))


