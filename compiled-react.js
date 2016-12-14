'use strict';

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}

function tryConvert(value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return React.createElement(
            'p',
            null,
            'The water would boil.'
        );
    }
    return React.createElement(
        'p',
        null,
        'The water would not boil.'
    );
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: '' };
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        const scale = this.props.scale;
        return React.createElement(
            'fieldset',
            null,
            React.createElement(
                'legend',
                null,
                'Enter temperature in ',
                scaleNames[scale],
                ':'
            ),
            React.createElement('input', {
                value: value,
                onChange: this.handleChange })
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { value: '', scale: 'c' };
    }

    handleCelsiusChange(value) {
        this.setState({ scale: 'c', value });
    }

    handleFahrenheitChange(value) {
        this.setState({ scale: 'f', value });
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
        const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

        return React.createElement(
            'div',
            null,
            React.createElement(TemperatureInput, {
                scale: 'c',
                value: celsius,
                onChange: this.handleCelsiusChange }),
            React.createElement(TemperatureInput, {
                scale: 'f',
                value: fahrenheit,
                onChange: this.handleFahrenheitChange }),
            React.createElement(BoilingVerdict, {
                celsius: parseFloat(celsius) })
        );
    }
}

ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));
