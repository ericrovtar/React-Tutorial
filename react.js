'use strict';

function ProductRow(props) {
    return (
        <tr>
            <td>{props.product.name}</td>
            <td>{props.product.price}</td>
        </tr>
    );
}

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="2">{this.props.title}</th>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = "";

        this.props.products.forEach((product) => {
            //Check for filters
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                //Not going to display you
                return; 
            }

            //See if we have a new category
            if (lastCategory !== product.category) {
                //Create new ProductCategoryRow
                rows.push(<ProductCategoryRow title={product.category} />);
                
                //Update lastCategory
                lastCategory = product.category;
            }

            rows.push(<ProductRow product={product} />);
        });

        return (
            <table>
                <thead>
                    <th>Name</th>
                    <th>Price</th>
                </thead>
                
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.filterTextInput.value,
            this.inStockOnlyInput.checked
        )
    }

    render() {
        return (
            <form>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={this.props.filterText} 
                    ref={(input) => this.filterTextInput = input}
                    onChange={this.handleChange} />
                <br />
                <label>
                    <input 
                        type="checkbox" 
                        checked={this.props.inStockOnly}
                        ref={(input) => this.inStockOnlyInput = input}
                        onChange={this.handleChange} />
                    Only show products in stock
                </label>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            filterText : '', 
            inStockOnly : false 
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText : filterText,
            inStockOnly : inStockOnly
        });
    }
    render() {
        return (
            <div>
                <SearchBar 
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput} />
                <ProductTable 
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly} />
            </div>
        );
    }
}

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);