#!/usr/bin/env python
import argparse
from _common import set_channel_override, get_available_overrides


parser = argparse.ArgumentParser(
    description='Set the channel override to the specified argument.',
)
parser.add_argument('channel_override', type=str,
                    choices=get_available_overrides(),
                    help='Channel override to set.')
args = vars(parser.parse_args())
set_channel_override(**args)
