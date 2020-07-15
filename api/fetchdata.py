"""
Fetch and postprocess github commit data.
"""
import requests
import json
import constants
import re
from urllib.parse import urlparse
from urllib.parse import parse_qs


def main():
    """
    fetch data from github refactor that data to be used by d3
    """
    return_data = {} 

    for criteria in constants.criteria:
        return_data[criteria['topic']] = [] 
        for org, repo in constants.git_repositories.items():
            data_set = []
            data_set.append(org)
            data_set.append(repo)
            endpoint = constants.api_endpoint.replace(':org:', org)
            endpoint = endpoint.replace(':repo:', repo)
            endpoint = endpoint.replace(':metric:', criteria['metric'])
            return_response = requests.get(endpoint, params=criteria['parameters'], timeout=20)
            if return_response.status_code != 200:
                return_response.raise_for_status()
            else:
                temp = return_response.headers['link'].split(';')[1]
                temp = re.search('<(.*)>', temp)
                url = temp.group(1)
                parsed = urlparse(url)
                qs = parse_qs(parsed.query)
                data_set.append(qs['page'][0])
                return_data[criteria['topic']].append(data_set)

    return return_data

if __name__ == '__main__':
    main()
