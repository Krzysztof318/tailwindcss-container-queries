# @krzysztof318/tw-container-queries

A plugin for Tailwind CSS v3.2+ that provides utilities for container queries.

This is fork of original repo [LINK](https://github.com/tailwindlabs/tailwindcss-container-queries)

I modificated prefix '@' to 'qc-' so now it works better with Razor syntax and many other things.

## Installation

Install the plugin from npm:

```sh
npm install -D @krzysztof318/tw-container-queries
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@krzysztof318/tw-container-queries'),
    // ...
  ],
}
```

## Usage

Start by marking an element as a container queryable using the `qc-queryable` class, and then applying styles based on the size of that container using the container variants like `qc-md:`, `qc-lg:`, and `qc-xl:`:

```html
<div class="qc-queryable">
  <div class="qc-lg:underline">
    <!-- This text will be underlined when the container is larger than or equals `1024px` -->
  </div>
</div>
```

Default `container-type` is `inline-size`.

By default we provide [queryable sizes](#configuration) from `qc-sm` (`640px`) to `qc-2xl` (`1536px`).

### Max modifiers

You can mark an element with `qc-max-{breakpoint}` class, for example `qc-max-md` (width < 768px), `qc-max-lg` (width < 1024px>).

```html
<div class="qc-queryable">
  <div class="qc-max-lg:underline">
    <!-- This text will be underlined when the container is smaller than `1024px` -->
  </div>
</div>
```

### Range modifiers

You can mark an element with `qc-{breakpoint}:qc-max-{breakpoint}` class, for example `qc-sm:qc-max-lg` (min-width: 640px and width < 1024px).

```html
<div class="qc-queryable">
  <div class="qc-sm:qc-max-lg:underline">
    <!-- This text will be underlined when the container is larger than or equals `640px and smaller than `1024px` -->
  </div>
</div>
```

### Named containers

You can optionally name containers using a `qc-queryable/{name}` class, and then include that name in the container variants using classes like `qc-lg/{name}:underline`:

```html
<div class="qc-queryable/main">
  <!-- ... -->
  <div class="qc-lg/main:underline">
    <!-- This text will be underlined when the "main" container is larger than `1024px` -->
  </div>
</div>
```

### Arbitrary container sizes

In addition to using one of the [container sizes](#configuration) provided by default, you can also create one-off sizes using any arbitrary value:

```html
<div class="qc-queryable">
  <div class="qc-[17.5rem]:underline"></div>
    <!-- This text will be underlined when the container is larger than `17.5rem` -->
  </div>
</div>
```

### Removing a container

To stop an element from acting as a container, use the `qc-queryable-normal` class.

<div class="qc-queryable xl:qc-queryable-normal">
  <!-- ... -->
</div>

### Arbitrary container

You can create container with arbitary value:

```html
<div class="qc-queryable-[size]">
  <!-- ... -->
</div>
```
This will be compiled to:

```css
.qc-queryable-\[size\] {
  container-type: size;
}
```

### Fixed size container component

I provided also `qc-container` similar to tailwind container component:

```html
<div class="qc-queryable">
  <div class="qc-container"></div>
    <!-- Fixed size -->
  </div>
</div>
```

By default I provide [container sizes](#configuration).
Containers are not default centered but you can enable this in configuration.

### With a prefix

If you have configured Tailwind to use a prefix, make sure to prefix both the `qc-queryable` class and any classes where you are using a container query modifier:

```html
<div class="tw-qc-queryable">
  <!-- ... -->
  <div class="qc-lg:tw-underline">
    <!-- ... -->
  </div>
</div>
```

## Configuration

By default we ship with the following configured breakpoints:

| Name     | CSS                                          | Name         | CSS                                          |
| -------- | -------------------------------------------- | ------------ | -------------------------------------------- |
| `qc-sm`  | `@container (min-width: 640px)`              | `qc-max-sm`  | `@container (width < 640px)`                 |
| `qc-md`  | `@container (min-width: 768px)`              | `qc-max-md`  | `@container (width < 768px)`                 |
| `qc-lg`  | `@container (min-width: 1024px)`             | `qc-max-lg`  | `@container (width < 1024px)`                |
| `qc-xl`  | `@container (min-width: 1280px)`             | `qc-max-xl`  | `@container (width < 1280px)`                |
| `qc-2xl` | `@container (min-width: 1536px)`             | `qc-max-2xl` | `@container (width < 1536px)`                |

Default containers:

| Breakpoint | Properties          |
| ---------- | ------------------- |
| `none`     | `width: 100%`       |
| `240px`    | `max-width: 240px`  |
| `320px`    | `max-width: 320px`  |
| `480px`    | `max-width: 480px`  |
| `640px`    | `max-width: 640px`  |
| `768px`    | `max-width: 768px`  |
| `1024px`   | `max-width: 1024px` |
| `1280px`   | `max-width: 1280px` |

You can add breakpoints which are available for this plugin under the `containers` key in your `tailwind.config.js` file:

It will be applied to `qc-{breakpoint}` and `qc-max-{breakpoint}`.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      'qc-queryables': {
        '2xs': '16rem',
      },
    },
  },
}
```

Or override all breakpoints with yours:

```js
// tailwind.config.js
module.exports = {
  theme: {
    'qc-queryables': {
      'xs': '16rem',
      'md': '32rem',
      'lg': '48rem',
    },
  },
}
```

You can also configure containers fixed sizes and their breakpoints:

```js
// tailwind.config.js
module.exports = {
  theme: {
    'qc-containers': {
      '240px',
      '320px',
      '480px',
    },
  },
}
```

You can enable auto centering for `qc-containers`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    container: {
      center: true,
    },
  },
}
```