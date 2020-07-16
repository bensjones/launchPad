"""
Cast and tally votes 
"""
import csv


class Vote:

    def __init__(self):
        self.vote_file = "./vote.csv"
        self.vote_dic = {}
        self.csv_to_dic()

    def cast(self, token, email, framework):
        self.vote_dic[(token, email)] = framework
        self.dic_to_csv()

    def tally(self):
        react = 0
        angular = 0
        emberjs = 0
        vuejs  = 0
        for key, value in self.vote_dic.items():
            if "react" == value:
                react += 1
            elif "angular" == value:
                angular += 1
            elif "vuejs" == value:
                vuejs += 1
            elif "emberjs" == value:
                emberjs += 1
        return {"react": react, "angular": angular, "emberjs": emberjs, "vuejs": vuejs}

    def csv_to_dic(self):
        with open(self.vote_file, newline="") as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                self.vote_dic[(row[0], row[1])] = row[2]

    def dic_to_csv(self):
        with open(self.vote_file, "w", newline="") as csvfile:
            writer = csv.writer(csvfile, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL)
            for x in self.vote_dic:
                writer.writerow([x[0], x[1], self.vote_dic[x]])