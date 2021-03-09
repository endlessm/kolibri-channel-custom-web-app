#!/usr/bin/env python
import subprocess
from _common import (
    bundle_zip, set_channel_override, get_available_overrides,
)

for override in get_available_overrides():
    set_channel_override(override)
    subprocess.run(['vue-cli-service', 'build'])
    bundle_zip(override)
