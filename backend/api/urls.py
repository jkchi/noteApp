from django.urls import path
from api.views import NoteViewSet

note_list = NoteViewSet.as_view({
    'post' : 'create',
    'get' : 'list',
})

note_detail = NoteViewSet.as_view({
    'get':'retrieve',
    'delete': 'destroy'
})

urlpatterns = [
    path("notes/", note_list, name = 'note-list'),
    path("notes/<int:pk>/", note_detail, name = 'note-detail'),
]
