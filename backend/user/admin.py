from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *


class CustomUserAdmin(UserAdmin):
    list_display = ("email", "firstname","lastname", 'is_active', 'is_staff')
    # list_filter = ("is_active", "is_staff")
    ordering=("age","firstname",)
    search_fields=("email","firstname")
    # filter_horizontal = (
    #     "groups",
    #     "user_permissions",
    # )

    fieldsets = (
        (None, {"fields": ("email","firstname","lastname", "password")}),
        ("Personal", {"fields": ("address","contact","gender","age","height","weight" ),}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser",  "user_permissions")}),
    )
    # add_fieldsets = ((None, {"classes": ("wide",), "fields": ("email", "password1", "password2")}),)


admin.site.register(User, CustomUserAdmin)


#creating user via shell

# from user.models import User 
# user=User.objects.create_user(firstname='aarav',lastname='shukla',email='aarav@gmail.com', password='aarav@19',age=23,contact='7896541230',address='asdff',gender='Male',height=170.0,weight=70.0) 
# user