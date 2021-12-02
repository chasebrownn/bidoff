import React, {Fragment} from "react";
import Select from "react-select";
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

class ListListings extends React.Component {
    prevMonth = new Date().setMonth(new Date().getMonth() - 1)
    nextMonth = new Date().setMonth(new Date().getMonth() + 1)

    constructor(props) {
        super(props);
        this.state = {
            auctions: [],
            tag_filter: 0,
            date_filter: 0,
            dateValue: [new Date(this.prevMonth), new Date(this.nextMonth)],
            newValue: null,
        }

    }

    getAuctions = async () => {
        try {
            const queryParams = {
                tag: this.state.tag_filter,
                end_date: this.state.dateValue[1].toISOString().slice(0, 10),
            };
            const queryString = Object.keys(queryParams)
                .map(key => key + '=' + queryParams[key])
                .join('&');
            console.log(queryString);
            const response = await fetch("http://localhost:5000/auctions?" + queryString);
            const jsonData = await response.json();
            let auctions = [];
            jsonData.forEach(auction => {
                auctions.push(auction);
            });
            this.setState({auctions: auctions});
        } catch (err) {
            console.error(err.message);
        }
    }

    buyAuctions = async (auction_id, price) => {
        try {
            const response = await fetch("http://localhost:5000/buy/",
                {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: 1,
                    auction_id: auction_id,
                    purchase_price: price
                })
            });
            await this.getAuctions();

        } catch (err) {
            console.error(err.message);
        }
    }
    handleSelect = (newTag) => {
        this.setState({tag_filter: newTag.value}, this.getAuctions);
    }

    componentDidMount() {
        this.getAuctions();
    }

    handleDateRange = (event) => {
        if (event[1] < new Date()){
            event[1] = new Date();
        }

        this.setState({dateValue: event}, this.getAuctions);
    }

    handleBuyNow (id, price) {
        return event => {
            event.preventDefault();
            this.buyAuctions(id, price)
        }
    }

    handleBid(id) {
        return event => {
            event.preventDefault();
            console.log(id);
        }
    }
    options = [
        {value: 0, label: 'Every Tag'},
        {value: 1, label: 'Arts & Entertainment'},
        {value: 2, label: 'Software'},
        {value: 3, label: 'Vehicles & Parts'},
        {value: 4, label: 'Sporting Goods'},
        {value: 5, label: 'Health & Beauty'},
        {value: 6, label: 'Baby & Toddler'},
        {value: 7, label: 'Home & Garden'},
        {value: 8, label: 'Religious & Ceremonial'},
        {value: 9, label: 'Business & Industrial'},
        {value: 10, label: 'Media'},
        {value: 11, label: 'Mature'},
        {value: 12, label: 'Food, Beverages & Tobacco'},
        {value: 13, label: 'Electronics'},
        {value: 14, label: 'Office Supplies'},
        {value: 15, label: 'Apparel & Accessories'},
        {value: 16, label: 'Luggage & Bags'},
        {value: 17, label: 'Animals & Pet Supplies'},
        {value: 18, label: 'Toys & Games'},
        {value: 19, label: 'Hardware'},
        {value: 20, label: 'Cameras & Optics'},
        {value: 21, label: 'Furniture'},
        {value: 22, label: 'Dog'},
        {value: 23, label: 'Baseball'},
        {value: 24, label: 'Food'},
        {value: 25, label: 'Costume'},
        {value: 26, label: 'Outdoors'}
    ]

    auctionRendering() {
        if (this.state.auctions .length === 0) {
            return (
                <div>
                    <h1>No auctions found</h1>
                </div>
            )
        }else{
            return (
            this.state.auctions.map(auction => (
                <tr key={auction.auction_id}>
                    <td><img className="card-img" src={auction.image_link}/></td>
                    <td>{auction.title}</td>
                    <td>{auction.description}</td>
                    <td>{auction.first_name}</td>
                    <td><button className='submit-btn btn btn-primary contact-btn' onClick={this.handleBuyNow(auction.auction_id, auction.inst_buy_price)} type='submit'>${auction.inst_buy_price}</button></td>
                    <td><button className='submit-btn btn btn-primary contact-btn' onClick={this.handleBid(auction.auction_id)} type='submit'>Bid</button></td>
                </tr>
            )))
        }
    }
    
    render() {

        return (
            <Fragment>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}>
                    <div
                        style={{width: '300px'}}>
                        <Select
                            options={this.options}
                            onChange={this.handleSelect}
                            placeholder="Filter by Tag"
                        />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            startText="Auction Start Date"
                            endText="Auction End Date"
                            value={this.state.dateValue}
                            minDate={this.prevMonth}
                            maxDate={this.nextMonth}
                            onChange={(newValue) => {
                                this.handleDateRange(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{mx: 2}}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                </div>
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>IMAGE</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Seller</th>
                        <th>Buy Now</th>
                        <th>Bid</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.auctionRendering()}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default ListListings;