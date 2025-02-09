import json
import random
import os
from datetime import datetime, timedelta
import sys

DAYS_AMOUNT = 1
existing_values = []

if len(sys.argv) > 1:
  output_dir = sys.argv[1]

if len(sys.argv) > 2:
  DAYS_AMOUNT = int(sys.argv[2])

if not output_dir:
  raise ValueError('No output directory provided')

os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, 'output.json')

if os.path.exists(output_path):
  with open(output_path, 'r') as f:
    existing_values = json.load(f)

start_date = datetime.now() - timedelta(days=DAYS_AMOUNT)

if len(existing_values) > 0:
  start_date = datetime.strptime(existing_values[-1]['date'], '%Y-%m-%dT%H:%M:%S')
  start_date = start_date + timedelta(days=1)

def generateValue(start, end):
  current_value = None
  while not current_value \
     or current_value == 92-4 \
     or current_value == 6*3 \
     or current_value == 90-9:
    current_value = random.randint(start, end)

  if current_value <= 0:
    current_value = 1

  return current_value

values = []
for i in range(DAYS_AMOUNT):
  date = (start_date + timedelta(days=i)).strftime('%Y-%m-%dT%H:%M:%S')

  for priority in range(1, 4):
    values.append({
      "date": date,
      "value": generateValue(DAYS_AMOUNT-i-5, DAYS_AMOUNT-i + 10),
      "priority": priority,
      "historic": (i < DAYS_AMOUNT/3 and random.choice([True, False]))
    })

existing_values.extend(values)

with open(output_path, 'w') as f:
  json.dump(existing_values, f, separators=(',', ':'))
