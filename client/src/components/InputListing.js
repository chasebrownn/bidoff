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
    function handleValueChange(evt){
        const value = evt.target.value
        setAuction({
            ...auction,
            [evt.target.name]: value
        })
    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            // const body = { auction };
            const response = await fetch ("http://localhost:5000/auction", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(auction)
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
                    name="title"
                    value={auction.title}
                    placeholder="Title"
                    onChange={handleValueChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={auction.description}
                    placeholder="Description"
                    onChange={handleValueChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="image_link"
                    value={auction.image_link}
                    placeholder="Image_link"
                    onChange={handleValueChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="user_id"
                    value={auction.user_id}
                    placeholder="User ID"
                    onChange={handleValueChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="end_datetime"
                    value={auction.end_datetime}
                    placeholder="end datetime"
                    onChange={handleValueChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="min_bid"
                    value={auction.min_bid}
                    placeholder="min bid"
                    onChange={handleValueChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="inst_buy_enabled"
                    value={auction.inst_buy_enabled}
                    placeholder="inst buy enabled"
                    onChange={handleValueChange}
                />
                <input
                    type="text"
                    className="form-control"
                    name="inst_buy_price"
                    value={auction.inst_buy_price}
                    placeholder="inst buy price"
                    onChange={handleValueChange}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}
export default InputListing;