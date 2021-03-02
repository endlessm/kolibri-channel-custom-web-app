#!/usr/bin/env python
import argparse
import os.path
import shutil
import subprocess
import json

from _common import TEMPLATE_WORKSPACE

ZIP_FILENAME = 'custom-channel-ui.zip'
SKIP_WORKSPACES = ['kolibri-api', TEMPLATE_WORKSPACE]


def validate_dir_path(path):
    if os.path.isdir(path):
        return path
    else:
        raise NotADirectoryError(path)


def get_workspaces_info():
    result = subprocess.run(['yarn', 'workspaces', 'info'],
                            stdout=subprocess.PIPE)
    output = result.stdout.decode('utf-8')
    return json.loads(output)


def get_workspaces():
    info = get_workspaces_info()
    return list(filter(lambda x: x not in SKIP_WORKSPACES, info.keys()))


def workspace_to_appname(workspace):
    # Remove the last '-ui' to obtain the app name:
    return '-'.join(workspace.split('-')[:-1])


def copy_bundle_zip(workspace, dest_path, app_name=None):
    bundle_zip_path = os.path.join(workspace, ZIP_FILENAME)
    if not os.path.exists(bundle_zip_path):
        print(f'Skipping {workspace}, zip not found.')
        return
    print(f'Copying {workspace}...')
    if app_name is None:
        app_name = workspace_to_appname(workspace)
    dest_zip_path = os.path.join(dest_path, app_name)
    if not os.path.exists(dest_zip_path):
        os.mkdir(dest_zip_path)
    shutil.copy(bundle_zip_path, dest_zip_path)


parser = argparse.ArgumentParser()
parser.add_argument('dest_path', type=validate_dir_path)
args = parser.parse_args()

for workspace in get_workspaces():
    copy_bundle_zip(workspace, args.dest_path)

copy_bundle_zip(TEMPLATE_WORKSPACE, args.dest_path, 'default')
