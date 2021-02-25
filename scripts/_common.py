#!/usr/bin/env python
import os
import subprocess


def get_project_dir():
    return subprocess.check_output(
        ["/usr/bin/git", "rev-parse", "--show-toplevel"],
        universal_newlines=True,
    ).strip()


TEMPLATE_WORKSPACE = 'template-ui'

TEMPLATE_WORKSPACE_PATH = os.path.join(get_project_dir(), TEMPLATE_WORKSPACE)

CHANNEL_OVERRIDES_DIR = os.path.join(
    TEMPLATE_WORKSPACE_PATH, 'channel-overrides')

OVERRIDES_PATH = os.path.join(TEMPLATE_WORKSPACE_PATH, 'src', 'overrides')

DEFAULT_OVERRIDE = 'default'

DEFAULT_OVERRIDE_PATH = os.path.join(CHANNEL_OVERRIDES_DIR, DEFAULT_OVERRIDE)


def get_available_overrides():
    return os.listdir(CHANNEL_OVERRIDES_DIR)


def get_override_path(override):
    return os.path.join(CHANNEL_OVERRIDES_DIR, override)


def set_channel_override(channel_override=DEFAULT_OVERRIDE, ensure=False):
    if os.path.exists(OVERRIDES_PATH):
        if ensure:
            return
        os.remove(OVERRIDES_PATH)
    os.symlink(get_override_path(channel_override), OVERRIDES_PATH)
