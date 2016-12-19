'use strict';

function ProductRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.product.name
        ),
        React.createElement(
            "td",
            null,
            props.product.price
        )
    );
}

class ProductCategoryRow extends React.Component {
    render() {
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "th",
                { colSpan: "2" },
                this.props.title
            )
        );
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = "";

        this.props.products.forEach(product => {
            //Check for filters
            if (product.name.indexOf(this.props.filterText) === -1 || !product.stocked && this.props.inStockOnly) {
                //Not going to display you
                return;
            }

            //See if we have a new category
            if (lastCategory !== product.category) {
                //Create new ProductCategoryRow
                rows.push(React.createElement(ProductCategoryRow, { title: product.category }));

                //Update lastCategory
                lastCategory = product.category;
            }

            rows.push(React.createElement(ProductRow, { product: product }));
        });

        return React.createElement(
            "table",
            null,
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "th",
                    null,
                    "Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Price"
                )
            ),
            React.createElement(
                "tbody",
                null,
                rows
            )
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(this.filterTextInput.value, this.inStockOnlyInput.checked);
    }

    render() {
        return React.createElement(
            "form",
            null,
            React.createElement("input", {
                type: "text",
                placeholder: "Search...",
                value: this.props.filterText,
                ref: input => this.filterTextInput = input,
                onChange: this.handleChange }),
            React.createElement("br", null),
            React.createElement(
                "label",
                null,
                React.createElement("input", {
                    type: "checkbox",
                    checked: this.props.inStockOnly,
                    ref: input => this.inStockOnlyInput = input,
                    onChange: this.handleChange }),
                "Only show products in stock"
            )
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    }
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(SearchBar, {
                filterText: this.state.filterText,
                inStockOnly: this.state.inStockOnly,
                onUserInput: this.handleUserInput }),
            React.createElement(ProductTable, {
                products: this.props.products,
                filterText: this.state.filterText,
                inStockOnly: this.state.inStockOnly })
        );
    }
}

var PRODUCTS = [{ category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' }, { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' }, { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' }, { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' }, { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' }, { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }];

ReactDOM.render(React.createElement(FilterableProductTable, { products: PRODUCTS }), document.getElementById('root'));
