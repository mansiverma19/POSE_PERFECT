
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
# from django.core.validators import RegexValidator
from django.core.validators import MaxValueValidator, MinValueValidator,MinLengthValidator

# from common.models import IndexedTimeStampedModel


class UserManager(BaseUserManager):
    def create_user(self, firstname,lastname,email, password=None, **kwargs):
        email = self.normalize_email(email)
        user = self.model(firstname=firstname,lastname=lastname,email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,firstname,lastname,email, password):
        user = self.create_user(firstname,lastname,email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    others=(("Male","Male"),
    ("Female","Female"),
    ("Other","Other"),
    ("Don't want to specify","Don't want to specify"))
    email = models.EmailField(db_index=True, max_length=255, unique=True)
    firstname = models.CharField(max_length=255, blank=False)
    lastname = models.CharField(max_length=255, blank=False)
    age = models.IntegerField(default=18,blank=False)
    contact =  models.CharField(validators=[MinLengthValidator(4)], max_length=10,blank=False)
    address = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=100,choices=others)
    height = models.FloatField(validators=[MinValueValidator(61.0), MaxValueValidator(250.0)],blank=False,default=160)
    weight= models.FloatField(blank=False,default=60)
    is_staff = models.BooleanField(
        default=False, help_text="Designates whether the user can log into this admin site."
    )
    is_active = models.BooleanField(
        default=True, help_text="Designates whether this user should be treated as active.")

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firstname","lastname"]

    def __str__(self):
        return f'{self.email}'