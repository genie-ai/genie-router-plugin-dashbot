genie-router-plugin-dashbot
===========================

This [genie-router](https://github.com/matueranet/genie-router) plugin logs all received
input and output to [dashbot.io](https://dashbot.io).

# Installation and configuration

Run `npm install matueranet/genie-router-plugin-dashbot` in your genie-router plugin
location (default is `$HOME/.genie-router`). Add an attribute `dashbot` to your `config.json`.

There is only one configuration item, the `apiKey` of the bot you configured at dashbot.io. The
apiKey can be found in your bot settings.

## Example

```
{
  "plugins": {
    "dashbot": {
      "apiKey": "<insert-key-here>"
    }
  }
}
```
