# kolibri-channel-custom-web-app
Kolibri channels support displaying HTML5 apps. If content creators want to customize the channel experience they can do this with a custom web app. This is the proof of concept of such an app.

## Project setup

Just like kolibri, we'll use a Python virtual environment along with
Node to obtain the exact same dependencies.

```
./scripts/bootstrap.sh
```

All the commands below assume that you are standing in a pipenv shell:

```
pipenv shell
```

We use yarn workspaces to have multiple projects in the same git
repository. You should stand in a workspace directory to run commands
specific to it. Example:

```
cd sikana-ui
yarn serve
```

### Compiles and hot-reloads for development
```
cd WORKSPACE
yarn serve
```

### Compiles and minifies for production

To build all projects:

```
yarn build
```

To build one project:

```
cd WORKSPACE
yarn build
```

### Copy all bundled zip files to a destination

Use `yarn deploy DEST_PATH`, for example:

```
yarn deploy ../kolibri-explore-plugin/kolibri_explore_plugin/apps
```

### Lints and fixes files
```
yarn lint
flake8 scripts/
```

### Create mock nodes

There is a script to create a randomized `nodes.json` file, for
development:

```
./scripts/create_mock_nodes.py > template-ui/src/nodes.json
```

### Upgrading the vue CLI
```
yarn global upgrade --latest @vue/cli
vue upgrade
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
