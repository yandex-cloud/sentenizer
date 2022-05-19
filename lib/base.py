from itertools import tee

from lib.record import Record
from lib.rule import JOIN
from lib.substring import find_substrings


def safe_next(iter):
    try:
        return next(iter)
    except StopIteration:
        return


class Segmenter(Record):
    __attributes__ = ['split', 'rules']

    def __init__(self, split, rules):
        self.split = split
        self.rules = rules

    # look into join rules
    def join(self, split):
        for rule in self.rules:
            action = rule(split)
            if action:
                return action == JOIN

    def segment(self, parts):
        # print('segment, parts:', list(tee(tee(parts)[0])))
        # print('segment, parts:', list(tee(tee(parts)[1])))
        buffer = safe_next(parts)
        if buffer is None:
            return

        print('segment, parts:', buffer)

        for split in parts:
            right = next(parts)
            split.buffer = buffer
            print('segment>parts_it>split:', split)
            print('segment>parts_it>right:', right)
            if self.join(split):
                buffer = buffer + split.delimiter + right
            else:
                yield buffer + split.delimiter
                buffer = right
        yield buffer

    post = None

    def __call__(self, text):
        print('Segmenter called with text:', text)
        print('parts:', list(self.split(text)))
        # print('chunks:', list(self.segment(self.split(text))))
        parts = self.split(text)
        chunks = self.segment(parts)
        if self.post:
            chunks = self.post(chunks)
        return find_substrings(chunks, text)


class DebugSegmenter(Segmenter):
    def join(self, split):
        print("{split.left!r} | {split.delimiter!r} | {split.right!r}".format(split=split))
        for rule in self.rules:
            action = rule(split)
            if action:
                print('\t', action, rule.name)
                return action == JOIN
