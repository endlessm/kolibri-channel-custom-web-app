# Technical information for the Template System

To use the template system you need to create a new directory inside
`template-ui/channel-overrides/` with an empty `styles.scss`.

The override is no more than a symlink pointing to your directory from
`template-ui/src/overrides`. You can use the commands
`scripts/set_override.py` and `scripts/clear_override.py` to do it
safely. Check the `--help` of each command for details.

Custom CSS goes to your `styles.scss`. In particular, Bootstrap
variables can be set, like: `$primary: #42b983;`. See the
`default/styles.scss` for reference.

Image assets can be added to your override in a `assets/`
subdirectory. Right now the file names (and thus format because of the
way Webpack bundling works) have to match exactly. Use the following
command to find all the current asset overrides available:

```
git grep dynamicRequireAsset\(
```

Vue components can be added to your override in a `components/`
subdirectory. They will replace any component in `src/components/` if
they have the same file name. You can start by copying one component
and doing slight modifications.
