from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
from rest_framework import status
from .models import Employee, Attendance, Leaves
from .serializers import EmployeeSerializer, AttendanceSerializer, LeavesSerializer

# Create your views here.

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def create(self, request, *args, **kwargs):
        employee_id = request.data.get('employee_id')
        attendance_data = {
            'employeeid': employee_id,
            'attendance_status': request.data.get('attendance_status'),
            'day_status': request.data.get('day_status'),
            'status': request.data.get('status', True),
            'comments': request.data.get('comments', ''),
        }

        serializer = AttendanceSerializer(data=attendance_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LeavesViewSet(viewsets.ModelViewSet):
    queryset = Leaves.objects.all()
    serializer_class = LeavesSerializer
