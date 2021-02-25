#!/usr/bin/env python
import os
import argparse
from _common import OVERRIDES_PATH, DEFAULT_OVERRIDE_PATH


def main():
    if os.path.exists(OVERRIDES_PATH):
        return
    os.symlink(DEFAULT_OVERRIDE_PATH, OVERRIDES_PATH)


parser = argparse.ArgumentParser(
    description='Check if there is a channel override. '
    'Set to default if not.',
)
parser.parse_args()
main()
