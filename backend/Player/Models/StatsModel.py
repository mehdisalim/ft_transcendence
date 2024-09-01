from django.db import models
from .GraphModel import Graph

class Stats(models.Model):
    win = models.IntegerField(default=0)
    loss = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)
    league = models.CharField(max_length=100, default="bronze")
    graph = models.OneToOneField(Graph, on_delete=models.CASCADE, related_name='graph', null=True, blank=True)

    def __str__(self):
        return self.league