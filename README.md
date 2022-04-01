# Catche Search Widget

*Also known as a [Ctrl/Cmd-K Menu](https://uiw.tf/cmdk) or a [Command Palette](https://tailwindui.com/components/application-ui/navigation/command-palettes)*

[Catche](https://try.catche.co/) provides a low-code way to add instant search to your website in two steps!

1. Go to https://try.catche.co and enter your website URL
2. Add the provided code snippet to your website's <head>

---

For those who are interested, this repo contains the code for the widget, as well as tutorials for how to create custom themes and use self-hosted data.

Contributions welcome!

## Overview

This widget is built with Vue and TypeScript and uses Tailwind for styling.

Catche uses Supabase for our database hosting but you don't need to do that if you intend to self-host your data - you just need a JSON file!

We use [MiniSearch](https://github.com/lucaong/minisearch) for searching, while [fast-fuzzy](https://github.com/EthanRutherford/fast-fuzzy) is used for highlighting.