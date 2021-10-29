import React, {Fragment, useState} from "react";

const InputListing = () => {
    const [auction, setAuction] = useState({
        title: '',
        description:'',
        image_link: '',
        user_id:'1',
        end_datetime:'',
        min_bid:'',
        inst_buy_enabled:'',
        inst_buy_price:''
    });
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { auction };
            const response = await fetch ("http://localhost:5000/auction", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/"; //once a response has been sent, it refreshes
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">Welcome to BidOff</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={auction.title}
                    onChange={e => setAuction(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    value={auction.description}
                    onChange={e => setAuction(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    value={auction.image_link}
                    onChange={e => setAuction(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    value={auction.user_id}
                    onChange={e => setAuction(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    value={auction.end_datetime}
                    onChange={e => setAuction(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    value={auction.min_bid}
                    onChange={e => setAuction(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    value={auction.inst_buy_enabled}
                    onChange={e => setAuction(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    value={auction.inst_buy_price}
                    onChange={e => setAuction(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}
export default InputListing;