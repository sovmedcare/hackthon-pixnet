import requests
import os
import json
import copy

current_chunk = 2
client_id = 'Ob40nvPTHhd985ccAp0OVWfJ'
client_secret = 'gbKxX9SpnNmuHcBHIGTD7S07lzDMG2bROMel0W7vnB0fplSv'
food_merged_path = '/Users/tinghao/Documents/GitHub/hackthon-pixnet/static/food_merged.json'
everypixel_food_keywords = '/Users/tinghao/Documents/GitHub/hackthon-pixnet/static/everypixel_food_keywords_{current_chunk}.json'.format(current_chunk = current_chunk)

def get_keyword(item):
  return item['keyword']

def chunks(l, n):
    n = max(1, n)
    return [l[i:i+n] for i in range(0, len(l), n)]

with open(food_merged_path, 'r', encoding='utf-8') as food_merge:
  data = json.load(food_merge)
  chunk_one = chunks(data, 84)[current_chunk]
  output_data = []
  for i, element in enumerate(chunk_one):
      params = {'url': element['image_url'], 'num_keywords': 30}
      res = requests.get('https://api.everypixel.com/v1/keywords', params=params, auth=(client_id, client_secret)).json()
      keywords = res['keywords']
      output_data.append(dict())
      output_data[i]['worker'] = data[i + (current_chunk * 84)]['worker']
      output_data[i]['image_url'] = data[i + (current_chunk * 84)]['image_url']
      output_data[i]['keywords'] = keywords
      output_data[i]['labels'] = list(map(get_keyword, keywords))
      print(output_data[i])
      print('Successfully get keywords', i)

  with open(everypixel_food_keywords, 'a', encoding='utf-8') as output_file:
    output_file.write(json.dumps(output_data, indent = 4, ensure_ascii=False))