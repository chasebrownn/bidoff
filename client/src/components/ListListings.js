import React, {Fragment} from "react";
import Select from "react-select";


class ListListings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auctions: [],
            tag_filter: 0,
            date_filter: 0,
        }

    }

    getAuctions = async () => {
        try {
            const queryParams = {tag: this.state.tag_filter, date: this.state.date_filter};
            const queryString = Object.keys(queryParams)
                .map(key => key + '=' + queryParams[key])
                .join('&');
            const response = await fetch("http://localhost:5000/auctions?" + queryString);
            const jsonData = await response.json();
            let auctions = [];
            jsonData.forEach(auction => {
                auctions.push(auction);
            });
            this.setState({auctions: auctions});
        }
         catch (err) {
            console.error(err.message);
        }
    }

    handleSelect = (newTag) => {
        this.setState({tag_filter: newTag.value}, this.getAuctions);
    }
    componentDidMount() {
        this.getAuctions();
    }

    options = [
        { value:0, label: 'All Tags'},
        { value:1,label:'Arts & Entertainment'},
        { value:2, label:'Software'},
        { value:3, label:'Vehicles & Parts'},
        { value:4, label:'Sporting Goods'},
        { value:5, label:'Health & Beauty'},
        { value:6, label:'Baby & Toddler'},
        { value:7, label:'Home & Garden'},
        { value:8, label:'Religious & Ceremonial'},
        { value:9, label:'Business & Industrial'},
        { value:10, label: 'Media'},
        { value:11, label: 'Mature'},
        { value:12, label: 'Food, Beverages & Tobacco'},
        { value:13, label: 'Electronics'},
        { value:14, label: 'Office Supplies'},
        { value:15, label: 'Apparel & Accessories'},
        { value:16, label: 'Luggage & Bags'},
        { value:17, label: 'Animals & Pet Supplies'},
        { value:18, label: 'Toys & Games'},
        { value:19, label: 'Hardware'},
        { value:20, label: 'Cameras & Optics'},
        { value:21, label: 'Furniture'},
        { value:22, label: 'Dog'},
        { value:23, label: 'Baseball'},
        { value:24, label: 'Food'},
        { value:25, label: 'Costume'},
        { value:26, label: 'Outdoors'}
    ]
    render() {
        return (
            <Fragment>
                <Select
                    options={this.options}
                    onChange={this.handleSelect}
                    defaultValue={ this.options[0]}/>
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>IMAGE</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Seller</th>
                        <th>BUY NOW</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.auctions.map(auction => (
                        <tr key={auction.auction_id}>
                            <td><img className="card-img" src={auction.image_link} /></td>
                            <td>{auction.title}</td>
                            <td>{auction.description}</td>
                            <td>{auction.first_name}</td>
                            <td>{auction.inst_buy_price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default ListListings;