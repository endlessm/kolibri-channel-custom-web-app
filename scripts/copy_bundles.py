#!/usr/bin/env python
import argparse
import os.path
import shutil
import subprocess
import json

ZIP_FILENAME = 'custom-channel-ui.zip'
SKIP_WORKSPACES = ['kolibri-api']


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


def copy_bundle_zip(workspace, dest_path):
    bundle_zip_path = os.path.join(workspace, ZIP_FILENAME)
    if not os.path.exists(bundle_zip_path):
        print(f'Skipping {workspace}, zip not found.')
        return
    print(f'Copying {workspace}.zip...')
    dest_file = os.path.join(dest_path, f'{workspace}.zip')
    if os.path.exists(dest_file):
        os.remove(dest_file)
    shutil.copy(bundle_zip_path, dest_file)


parser = argparse.ArgumentParser()
parser.add_argument('dest_path', type=validate_dir_path)
args = parser.parse_args()

for workspace in get_workspaces():
    copy_bundle_zip(workspace, args.dest_path)
