from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    # not only serialize data object to json for http transfer
    # but also do checks for user


    class Meta:
        # define the behavior of the serializer

        # define the data model, which the serializer should be based on
        model = User
        # define the field during serializing
        # also define the limit on each field based on the dtype of them in db
        fields = ["id", "username", 'password']

        # set the filed password to be write only
        # this field will be included in serializing
        # but will not be included in the returned json data
        # to the client side
        extra_kwargs = {"password":{"write_only":True}}
    

    def create(self,validated_data):
        # override the create method offer by rest_framework

        # a method of django user model
        # hold the security issue for user
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
     class Meta:

        model = Note
        
        fields = ["id", "title", 'content',"create_at", "author"]

        # set the author field to be read only
        extra_kwargs = {"author":{"read_only":True}}