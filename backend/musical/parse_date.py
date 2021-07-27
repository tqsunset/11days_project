from datetime import datetime

text = '2021.09.08 ~ 2021.11.28'


def parse_date(text):
    dates_str = text.split(' ~ ')
    return list(map(str_to_date, dates_str))


def str_to_date(input):
    if input =='오픈런':
        return ''
    else:
        date = list(map(int, input.split('.')))
        return datetime(date[0], date[1], date[2])
