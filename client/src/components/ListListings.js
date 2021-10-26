import React, {Fragment, useEffect, useState} from "react";
import EditListing from "./EditListing";

const ListListings = () => {
    const [auctions, setAuctions] = useState([]);

    const getAuctions = async () => {
        try {
            const response = await fetch("http://localhost:5000/auctions");
            const jsonData = await response.json();

            setAuctions(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAuctions();
    }, []);

    console.log(auctions);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>BUY NOW</th>
                    </tr>
                </thead>
                <tbody>
                    {auctions.map(auction => (
                        <tr key={auction.auction_id}>
                            <td>{auction.user_id}</td>
                            <td>{auction.inst_buy_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListListings;