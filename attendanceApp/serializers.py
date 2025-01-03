from rest_framework import serializers
from .models import Employee, Attendance, Leaves

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class LeavesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaves
        fields = '__all__'
