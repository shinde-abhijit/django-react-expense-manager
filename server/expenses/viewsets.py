from rest_framework import viewsets, permissions
from expenses.models import Expense
from expenses.serializers import ExpenseSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the Expense
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Keep the user unchanged during update
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # Each user only accesses their own Expenses
        return Expense.objects.filter(user=self.request.user)
