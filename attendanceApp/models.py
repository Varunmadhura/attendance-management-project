from django.db import models
from django.utils import timezone
from datetime import date


# Create your models here.

class Employee(models.Model):
    Id = models.AutoField(primary_key=True)
    employeeid = models.CharField(max_length=15, unique=True)
    employeename = models.CharField(max_length=100)
    email = models.CharField(max_length=30)
    phonenumber = models.BigIntegerField()
    address = models.CharField(max_length=200)
    jobtitle = models.CharField(max_length=100)
    joiningdate = models.DateField()
    
    def __str__(self):
        return self.employeename  # Return a string representation of the employee's name

class Attendance(models.Model):
    STATUS_CHOICES = [
        (True, 'Active'),
        (False, 'Not Active'),
    ]
    
    ATTENDANCE_STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Late', 'Late'),
    ]
    
    DAY_STATUS_CHOICES = [
        ('Working', 'Working Day'),
        ('Holiday', 'Holiday'),
        ('Weekend', 'Weekend'),
    ]

    id = models.AutoField(primary_key=True)
    employeeid = models.ForeignKey(Employee, related_name='attendances', on_delete=models.CASCADE)  
    attendance_status = models.CharField(max_length=10, choices=ATTENDANCE_STATUS_CHOICES)
    day_status = models.CharField(max_length=10, choices=DAY_STATUS_CHOICES)
    status = models.BooleanField(choices=STATUS_CHOICES, default=True)
    reason = models.TextField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attendance for {self.employeeid} on {self.created_at}"
    
class Leaves(models.Model):
    Id = models.AutoField(primary_key=True)
    employeeId = models.CharField(max_length=15)
    fromdate = models.DateField()
    todate = models.DateField()
    reason = models.CharField(max_length=1000)
    discription = models.CharField(max_length=750)
    status = models.IntegerField()

    # def __str__(self):
    #     return self.employeeId+self.fromdate+self.todate+self.reason+self.discription+self.status