git_repositories = {"facebook": "react", "angular": "angular.js", "emberjs": "ember.js", "vuejs": "vue"}

# Map the relavant topics to github metrics i.e. commits are a proxy for development activity
criteria = [
        {
            "topic": "development activity",
            "metric": "commits",
            "parameters": {"state": "all", "per_page": 1}
        },
        {
            "topic": "community support",
            "metric": "pulls",
            "parameters": {"state": "all", "per_page": 1}
        },
        {
            "topic": "stability",
            "metric": "issues",
            "parameters": {"state": "all", "per_page": 1}
        },
        ]

api_endpoint = "https://api.github.com/repos/:org:/:repo:/:metric:"
