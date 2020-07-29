#!/usr/bin/env python
import shutil
zip_name = 'custom-channel-ui'
shutil.make_archive(zip_name, 'zip', 'dist/')
print(f'File ./{zip_name}.zip created.')
