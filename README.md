# kolibri-channel-custom-web-app

Kolibri channels support displaying HTML5 apps. If content creators
want to customize the channel experience they can do this with a
custom web app. This repository contains a sample of such
presentations, and a template system that can be used to create the
presentations easily.

## Template System

See the documentation dedicated to the template system:

- [Specification for the Template System](./docs/template-spec.md)
- [Technical information for the Template System](./docs/template-tech-info.md)

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

Ideally you should be developing this app live with real content coming
from Kolibri. See [the Explore plugin README](https://github.com/endlessm/kolibri-explore-plugin#kolibri-explore-plugin) for how to do that.

But there might be cases where you want to develop by testing a
specific node structure, or without Kolibri running. For such cases
there is a way to mock the content adding a `nodes.json` file to the
`src/` folder.

There is a script to create a randomized `nodes.json` file:

```
./scripts/create_mock_nodes.py > template-ui/src/nodes.json
```

To tell the app to use the mock file, you should pass an environment
variable:

```
VUE_APP_USE_MOCK_DATA=true yarn serve
```

And you can persist that setting in a `.env.development.local` file.

### Upgrading the vue CLI
```
yarn global upgrade --latest @vue/cli
vue upgrade
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
