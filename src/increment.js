function getIncrement(number) {
	if (number >= 0 && number < 0.2) return 0.1
	else if (number >= 0.2 && number < 0.5) return 0.04
	else if (number >= 0.5 && number < 0.8) return 0.02
	else if (number >= 0.8 && number < 0.99) return 0.005
	return 0
}

const defaultOptions = {
	minimum: 0.08,
	maximum: 0.994,
	settleTime: 700,
	intervalTime: 700,
	stepSizes: [ 0, 0.005, 0.01, 0.02 ]
}

let updater

export default (options = defaultOptions, call) => {
	function increment() {
		if (updater) {
			// prevent multiple intervals by clearing before making
			clearInterval(updater)
		}
		updater = setInterval(() => {
			let value = this.get('width')

			const randomStep = options.stepSizes[Math.floor(Math.random() * options.stepSizes.length)]
			const step = getIncrement(value) + randomStep
			if (value < options.maximumWidth) {
				value = value + step
			}
			if (value > options.maximumWidth) {
				value = options.maximumWidth
				this.stop()
			}
			this.set({ width: value })
		}, options.intervalTime)
	}

	return {
		start() {
			call(options.minimum, false)
			increment()
		},
		reset() {
			call(options.minimum, false)
		},
		stop() {
			if (updater) {
				clearInterval(updater)
			}
		},
		complete() {
			clearInterval(updater)
			this.set({
				width: 1,
				running: false
			})
			setTimeout(() => {
				this.set({
					completed: true
				})
				setTimeout(() => {
					this.set({
						completed: false,
						width: 0
					})
				}, options.settleTime)
			}, options.settleTime)
		}
	}
}
