# kolibri-channel-custom-web-app
Kolibri channels support displaying HTML5 apps. If content creators want to customize the channel experience they can do this with a custom web app. This is the proof of concept of such an app.

## Project setup

Just like kolibri, we'll use a Python virtual environment along with
Node to obtain the exact same dependencies.

```
pipenv --python 3
pipenv shell
```

Inside the pipenv shell:

```
pip install -r requirements.txt --upgrade
nodeenv -p --node=10.15.3
npm install -g yarn
yarn global add @vue/cli
yarn install
```

All the commands below assume that you are standing in a pipenv shell.

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
./scripts/bundle_zip.py
```

Then upload the ZIP to kolibri studio.

### Lints and fixes files
```
yarn lint
```

### Upgrading the vue CLI
```
yarn global upgrade --latest @vue/cli
vue upgrade
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
