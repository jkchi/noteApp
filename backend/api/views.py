from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics,viewsets
from .serializer import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.


class CreateUserView(generics.CreateAPIView):
    # create a create view inherent from the rest framework CreateAPIView
    
    # define what model this view should be opreate on
    queryset = User.objects.all()

    # define the serializer, which is the must 
    # the serialize define the data model and other behaviors
    serializer_class = UserSerializer

    # define the permission of the view, and it is open to all the people
    permission_classes = [AllowAny]

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)

    def get_permissions(self):
        
        # the action here is django action not 
        # http request type
        if self.action in ['create', 'list', 'destroy','retrieve']:
            # return an instance of permission class
            # it will perform the checks as an instance

            # in a api view 
            # just define permission_classes = [X]
            return [IsAuthenticated()]
    
    def perform_create(self, serializer):

        user = self.request.user
        # add the extra info
        serializer.save(author = user)

        # return the method from parent class
        return super().perform_create(serializer)
    

