import json
import random
import os
from datetime import datetime, timedelta
import sys

amount = 100

print(sys.argv)

if len(sys.argv) > 1:
  output_dir = sys.argv[1]

if len(sys.argv) > 2:
  amount = sys.argv[2]

if not output_dir:
  raise ValueError('No output directory provided')

# Generate a random starting date between 2 to 4 weeks ago
start_date = datetime.now() - timedelta(weeks=random.randint(2, 4))

# Generate random values with a downwards trend
values = []
for i in range(amount):
  current_value = random.randint(amount-i, amount-i + 10)
  values.append({
    "date": (start_date + timedelta(days=i)).strftime('%Y-%m-%d'),
    "value": current_value
  })
  current_value -= random.randint(0, 5)
  if current_value < 0:
    current_value = 0

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

# Output the JSON
output_path = os.path.join(output_dir, 'output.json')
with open(output_path, 'w') as f:
  json.dump(values, f, separators=(',', ':'))
