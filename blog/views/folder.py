from django.http import JsonResponse
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from blog.models import Folder
from blog.serializers import FolderSerializer


class FolderDetail(RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = FolderSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Folder.objects.get(pk=self.kwargs['pk'])


    
class FileList(RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = FolderSerializer
    lookup_field = 'pk'

    def get_object(self):
        if self.kwargs['pk'] == 0:
            return Folder.objects.get(pk=0)
        return Folder.objects.get(pk=self.kwargs['pk'])

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data)