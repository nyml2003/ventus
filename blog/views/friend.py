from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from blog.serializers import FriendSerializer
from blog.models import Friend
class FriendList(ListAPIView):
    """
    好友列表
    """
    serializer_class = FriendSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    def get_queryset(self):
        return Friend.objects.all()