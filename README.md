# svelte-progress-bar

[![Greenkeeper badge](https://badges.greenkeeper.io/saibotsivad/svelte-progress-bar.svg)](https://greenkeeper.io/)

The idea is a little Svelte component that shows a cool progress bar, like
what's on YouTube, or [this cool thing](http://ricostacruz.com/nprogress).

You can use it in your plain old web app like this:

```html
<script src="ProgressBar.min.js"></script>
<script>
const progress = new ProgressBar({
	target: document.querySelector('body')
})
</script>
```

Or to include it in your built web app:

```js
import ProgressBar from 'svelte-progress-bar'
// or
const ProgressBar = require('svelte-progress-bar')
// then
const progress = new ProgressBar({
	target: document.querySelector('body')
})
```

If you were using a web app with a page change event
emitter, it might look like:

```js
const router = // the page/state change event emitter
router.on('stateChangeStart', () => {
	progress.start()
})
router.on('stateChangeEnd', () => {
	progress.complete()
})
```

Or if you had some progress event emitter that actually told you the
percent of progress, you might set the progress bar width manually
with something like this:

```js
const dataLoad = // some sort of data load progress event emitter
dataLoad.on('percentDone', percent => {
	progress.set({ width: percent / 100 }) // must be a ratio
})
dataLoad.on('end', () => {
	progress.complete()
})
```

Or if you are using the progress bar inside a Svelte template, you might
use it like this:

```html
<ProgressBar width="{{width}}" />

<script>
import ProgressBar from 'svelte-progress-bar'
export default {
	components: { ProgressBar }
	// somewhere later: this.set({ width: 0.4 })
}
</script>
```

## bar color

The progress bar does not have a default color, so you
will need to set one. You can either set the color as a
data property or override the CSS.

JavaScript:

```js
const progress = new ProgressBar({
	target: document.querySelector('body'),
	data: { color: 'blue' }
})
```

Svelte component:

```html
<ProgressBar width="{{width}}" color="blue" />
```

CSS:

```css
.svelte-progress-bar, .svelte-progress-bar-leader {
	background-color: blue;
}
.svelte-progress-bar-leader {
	color: blue;
}
```

## other styles

If you are using some type of navbar at the top of the page, like
Bootstrap's, it is likely that you will need to change the z-index
to get the progress bar to appear over the navbar:

```css
.svelte-progress-bar {
	z-index: 100;
}
.svelte-progress-bar-leader {
	z-index: 101;
}
```

## options

The properties available are:

* `minimum` *(number, range: 0-1, default: 0.08)*: The starting percent width
	to use when the bar starts. Starting at `0` doesn't usually look very good.
* `maximum` *(number, range: 0-1, default: 0.994)*: The maximum percent width
	value to use when the bar is at the end but not marked as complete. Letting
	the bar stay at 100% width for a while doesn't usually look very good either.
* `intervalTime` *(number, default: 800)*: Milliseconds to wait between incrementing
	bar width when using the `start` (auto-increment) method.
* `settleTime` *(number, default: 700)*: Milliseconds to wait after the `complete`
	method is called to hide the progress bar. Letting it sit at 100% width for
	a very short time makes it feel more fluid.

## methods

These additional methods are available on an instantiated progress bar:

* `start()`: Set the width to the minimum and increment until maximum width.
* `complete()`: Set the width to `100%` and then hide after `settleTime`.
* `reset()`: Set the width to minimum but do not start incrementing.
* `continue()`: Start incrementing from whatever the current width is.
* `stop()`: Stop incrementing and take no further action.

## license

Published and released under the [Very Open License](http://veryopenlicense.com).
