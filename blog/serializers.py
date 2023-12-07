from rest_framework import serializers
from .utils import remove_markdown
from blog.models import Article, Author, Category, Folder, Tag


class ArticleBaseSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(method_name="get_author")
    brief = serializers.SerializerMethodField(method_name="get_brief")
    tags = serializers.SerializerMethodField(method_name="get_tags")
    category = serializers.SerializerMethodField(method_name="get_category")
    folder = serializers.SerializerMethodField(method_name="get_folder")

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "brief",
            "author",
            "created_at",
            "updated_at",
            "is_top",
            "tags",
            "category",
            "folder",
        )
        read_only_fields = (
            "id",
            "title",
            "brief",
            "author",
            "created_at",
            "updated_at",
            "is_top",
            "tags",
            "category",
            "folder",
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


class ArticleFolderSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(method_name="get_author")
    brief = serializers.SerializerMethodField(method_name="get_brief")
    tags = serializers.SerializerMethodField(method_name="get_tags")
    category = serializers.SerializerMethodField(method_name="get_category")

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "brief",
            "author",
            "created_at",
            "updated_at",
            "is_top",
            "tags",
            "category",
        )
        read_only_fields = (
            "id",
            "title",
            "brief",
            "author",
            "created_at",
            "updated_at",
            "is_top",
            "tags",
            "category",
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


class ArticleDetailSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField(method_name="get_author")
    content = serializers.SerializerMethodField(method_name="get_content")
    tags = serializers.SerializerMethodField(method_name="get_tags")
    category = serializers.SerializerMethodField(method_name="get_category")

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "content",
            "author",
            "created_at",
            "updated_at",
            "is_top",
            "tags",
            "category",
        )
        read_only_fields = (
            "id",
            "title",
            "content",
            "author",
            "created_at",
            "updated_at",
            "is_top",
            "tags",
            "category",
        )

    def get_author(self, obj):
        return AuthorBaseSerializer(obj.author).data

    def get_content(self, obj):
        return obj.content

    def get_tags(self, obj):
        return TagBaseSerializer(obj.tags, many=True).data

    def get_category(self, obj):
        return CategoryBaseSerializer(obj.category).data


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
    class Meta:
        model = Folder
        fields = (
            "id",
            "name",
        )
        read_only_fields = (
            "id",
            "name",
        )


class FolderSerializer(serializers.ModelSerializer):
    articles = serializers.SerializerMethodField()
    parent = serializers.SerializerMethodField()
    folders = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ("id", "name", "folders", "parent", "articles")
        read_only_fields = ("id", "name", "articles")

    def get_articles(self, obj):
        return ArticleBaseSerializer(obj.articles, many=True).data

    def get_parent(self, obj):
        return FolderBaseSerializer(obj.parent).data

    def get_folders(self, obj):
        return FolderBaseSerializer(obj.children, many=True).data


class FileTreeSerializer(serializers.ModelSerializer):
    folders = serializers.SerializerMethodField()
    articles = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = (
            "id",
            "name",
            "folders",
            "articles",
        )
        read_only_fields = ("id", "name")

    def get_folders(self, obj):
        return FileTreeSerializer(obj.children, many=True).data

    def get_articles(self, obj):
        return ArticleBaseSerializer(obj.articles, many=True).data


class TagBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("name",)
        read_only_fields = ("name",)


class ArticleBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            "id",
            "title",
        )
        read_only_fields = ("id", "title")
