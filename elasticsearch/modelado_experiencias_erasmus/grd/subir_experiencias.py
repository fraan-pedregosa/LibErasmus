import json
import requests

# Elasticsearch and API configuration
ELASTICSEARCH_URL = 'http://localhost:9200'
API_URL = 'http://localhost:5000/api/data/get_exps'
INDEX_NAME = 'experiencias'
DOCUMENT_TYPE = '_doc'  # Use '_doc' for Elasticsearch 6.0 and later

def upload_json_to_elasticsearch():
    putResponse = requests.put(f'{ELASTICSEARCH_URL}/{INDEX_NAME}')
    try:
        response = requests.get(API_URL)
        response.raise_for_status()  # Raise exception if the request failed
        json_docs = response.json()

        for i, json_doc in enumerate(json_docs):
            doc_id = json_doc.pop('_id', None)
            url = f'{ELASTICSEARCH_URL}/{INDEX_NAME}/{DOCUMENT_TYPE}/{doc_id}'

            response = requests.post(url, json=json_doc)
            if response.status_code == 201:
                print(f"Document uploaded successfully.")
            else:
                print(f"Error uploading document {response.text}")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from API: {e}")
    except json.JSONDecodeError:
        print(f"Error decoding JSON from API response.")

if __name__ == '__main__':
    upload_json_to_elasticsearch()