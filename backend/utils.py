from validate_email import validate_email
import re

def check_email(email):
    return validate_email(email)


def check_name(name):
    return len(name) > 1


def check_surname(surname):
    return len(surname) > 1


def check_number(number):
    regPattern = re.compile("^[2-9]\d{2}-\d{3}-\d{3}$")
    return regPattern.match(number) is not None