from rest_framework import serializers
from .utils import remove_markdown
from blog.models import Article, Author, Category, Folder, Tag, Friend


class ArticleBaseSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(method_name="get_author")
    brief = serializers.SerializerMethodField(method_name="get_brief")
    tags = serializers.SerializerMethodField(method_name="get_tags")
    category = serializers.SerializerMethodField(method_name="get_category")
    folder = serializers.SerializerMethodField(method_name="get_folder")
    length = serializers.SerializerMethodField(method_name="get_length")

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "brief",
            "author",
            "create_time",
            "update_time",
            "is_top",
            "tags",
            "category",
            "folder",
            "length",
        )

    def get_author(self, obj):
        return AuthorBaseSerializer(obj.author).data

    def get_brief(self, obj):
        return remove_markdown(obj.content[:200])

    def get_tags(self, obj):
        return TagBaseSerializer(obj.tags, many=True).data

    def get_category(self, obj):
        return CategoryBaseSerializer(obj.category).data

    def get_folder(self, obj):
        return FolderBaseSerializer(obj.folder).data

    def get_length(self, obj):
        return len(obj.content)


class ArticleDetailSerializer(ArticleBaseSerializer):
    
    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "brief",
            "author",
            "create_time",
            "update_time",
            "is_top",
            "tags",
            "category",
            "folder",
            "length",
            "content",
        )


class ArticleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        write_only_fields = (
            "title",
            "content",
            "author",
            "is_top",
            "tags",
            "category",
        )


class ArticleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        write_only_fields = (
            "title",
            "content",
            "is_top",
            "tags",
            "category",
        )


class AuthorBaseSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField(method_name="get_avatar")

    class Meta:
        model = Author
        fields = (
            "name",
            "avatar_url",
        )
        read_only_fields = ("name", "avatar")

    def get_avatar(self, obj):
        return obj.avatar_url if obj.avatar_url else "/media/avatar/default/default.jpg"


class CategoryBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name",)
        read_only_fields = ("name",)


class FolderBaseSerializer(serializers.ModelSerializer):
    article_count = serializers.SerializerMethodField(method_name="get_articles_count")
    folder_count = serializers.SerializerMethodField(method_name="get_folders_count")

    class Meta:
        model = Folder
        fields = (
            "id",
            "name",
            "article_count",
            "folder_count",
            "create_time",
            "update_time",
        )
        read_only_fields = (
            "id",
            "name",
        )

    def get_articles_count(self, obj):
        return obj.articles.count()
    
    def get_folders_count(self, obj):
        return obj.children.count()
    



class FolderSerializer(serializers.ModelSerializer):
    articles = serializers.SerializerMethodField()
    parent = serializers.SerializerMethodField()
    folders = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ("id", "name", "folders", "parent", "articles","create_time","update_time")
        read_only_fields = ("id", "name", "articles")

    def get_articles(self, obj):
        return ArticleBaseSerializer(obj.articles, many=True).data

    def get_parent(self, obj):
        return FolderBaseSerializer(obj.parent).data

    def get_folders(self, obj):
        return FolderBaseSerializer(obj.children, many=True).data



class TagBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("name",)
        read_only_fields = ("name",)


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ("id","nickname", "avatar", "brief", "url")
        read_only_fields = ("nickname", "avatar", "brief", "url")