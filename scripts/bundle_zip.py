#!/usr/bin/env python
import argparse
from _common import DEFAULT_ZIP_NAME, bundle_zip

parser = argparse.ArgumentParser(
    description='Create a ZIP from a build in dist/.',
)
parser.add_argument('zip_name', nargs='?', default=DEFAULT_ZIP_NAME)
args = vars(parser.parse_args())
bundle_zip(**args)
