from lib.record import Record


SPLIT = 'split'
JOIN = 'join'


class Rule(Record):
    name = None

    def __call__(self, split):
        raise NotImplementedError


# Rule Functor
# name     - function name
# function - function to call on 'Splitted Sentence'
class FunctionRule(Rule):
    __attributes__ = ['name']

    def __init__(self, function):
        self.name = function.__name__
        self.function = function

    def __call__(self, split):
        # print(self.name)
        # print(split)
        return self.function(split)
