#!/usr/bin/env python
import os
import subprocess


def get_project_dir():
    return subprocess.check_output(
        ["/usr/bin/git", "rev-parse", "--show-toplevel"],
        universal_newlines=True,
    ).strip()


TEMPLATE_WORKSPACE = 'template-ui'

OVERRIDES_PATH = os.path.join(
    get_project_dir(),
    TEMPLATE_WORKSPACE,
    'src', 'overrides',
)

DEFAULT_OVERRIDE_PATH = os.path.join(
    get_project_dir(),
    TEMPLATE_WORKSPACE,
    'channel-overrides', 'default',
)
