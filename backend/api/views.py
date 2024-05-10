from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
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

class NoteListCreate(generics.ListCreateAPIView):
    # two funciton
    # list all created notes view, when get is called
    # it return a list of note object(dict) with key defined as column name
    # create a new notes, when post is called
    serializer_class = NoteSerializer
    # only authenticated and pass in jwt token
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get the logged in user object
        user = self.request.user
        # return the obj filter by logged in user
        # notice .all and .filter are method, not attribute
        return Note.objects.filter(author = user)
        
        

    def perform_create(self, serializer):
        # the default create method
        # we need to overide it
        if serializer.is_valid():
            # save the serialized and check note with its author
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)

        return super().perform_create(serializer)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get the logged in user object
        user = self.request.user
        # return the obj filter by logged in user
        return Note.objects.filter(author = user)