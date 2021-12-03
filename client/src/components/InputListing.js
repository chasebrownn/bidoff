import React, {Fragment, useState, useRef} from "react";
import '../App.css';
//import { Button } from './Button';
import './InputListing.css';
import {useForm} from 'react-hook-form';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import {DatePicker, LocalizationProvider} from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import {TextField} from "@mui/material";
import ReactDropdown from "react-dropdown";
import 'react-dropdown/style.css';
const InputListing = () => {
    const nextMonth = new Date().setMonth(new Date().getMonth() + 1);
    const [auction, setAuction] = useState({
        title: '',
        description: '',
        image_link: '',
        user_id: '1',
        end_datetime: new Date(nextMonth).toISOString().slice(0, 10),
        current_bid: '',
        inst_buy_enabled: false,
        inst_buy_price: '',
        category_id: 0
    });

    function handleValueChange(evt) {
        const value = evt.target.value
        setAuction({
            ...auction,
            [evt.target.name]: value
        })
    }

    function handleInstBuyChange(){
        setAuction({
            ...auction,
            inst_buy_enabled: !auction.inst_buy_enabled
        })
    }

    function handleDropdownChange(evt) {
        const value = evt.value
        auction.category_id = evt.value
    }

    const onSubmitForm = async (e) => {
        console.log(auction);
        e.preventDefault();
        try {
            // const body = { auction };
            const token = JSON.parse(localStorage.getItem('auth_token'))
            console.log("READ TOKEN: " + token)
            const response = await fetch("http://localhost:5000/auction", {
                method: "POST",
                headers: {"Content-Type": "application/json", "authorization": token},
                body: JSON.stringify(auction)
            });
            console.log(response);
            window.location = "/dashboard"; //once a response has been sent, it refreshes
        } catch (err) {
            console.log("Errored out, in onSubmitForm, with error:")
            console.error(err.message);
        }
    }
    const options = [
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
    return (
        <div id="contact" className='ContactForm contact-section'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 text-center'>
                        <div className='contactForm ContactForm-blue-background'>
                            <div className='contact-title'>
                                <h3>Add a Product for Sale</h3>
                            </div>
                            <form id='contact-form' onSubmit={onSubmitForm}>
                                {/* Row 1 of form */}
                                <div className='row formRow'
                                style={{
                                    justifyContent: 'space-around',
                                }}>
                                    <div className='col-4'
                                         style={{width: '48%'}}>
                                        <input
                                            type='text'
                                            className='form-control formInput'
                                            name='title'
                                            value={auction.title}
                                            placeholder='Title'
                                            onChange={handleValueChange}
                                        />
                                        {/* {errors.name && <span className='errorMessage'>{errors.name.message}</span>} */}
                                    </div>
                                    {/*<div className='col-4'>*/}
                                    {/*    <LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                                    {/*        <DatePicker*/}
                                    {/*            className='form-control formInput'*/}
                                    {/*            name='end_datetime'*/}
                                    {/*            value={auction.end_datetime}*/}
                                    {/*            onChange={handleDateChange}*/}
                                    {/*            renderInput={(params) => <TextField {...params} label="End Date" />}*/}
                                    {/*            label="End Date"*/}
                                    {/*            format="MM/dd/yyyy"*/}
                                    {/*            disablePast*/}
                                    {/*            disableToolbar*/}
                                    {/*            autoOk*/}
                                    {/*            variant="inline"*/}
                                    {/*            inputVariant="outlined"*/}
                                    {/*        />*/}
                                    {/*    </LocalizationProvider>*/}

                                    {/*</div>*/}
                                    <div className='col-4'
                                         style={{width: '48%'}}>
                                        <input
                                            type='text'
                                            name='image_link'
                                            className='form-control formInput'
                                            value={auction.image_link}
                                            placeholder='Image Link'
                                            onChange={handleValueChange}
                                        />
                                </div>
                                {/* Row 2 of form */}
                                <div className='row formRow'>
                                    <div className='col-4'>
                                        <input
                                            type='text'
                                            name='inst_buy_price'
                                            className='form-control formInput'
                                            value={auction.inst_buy_price}
                                            placeholder='Instant Buy Price'
                                            onChange={handleValueChange}
                                        />
                                    </div>
                                    <div className='col-4'>
                                        <div>
                                            Instant Buy Enabled?
                                        </div>
                                        <input
                                            type='checkbox'
                                            name='inst_buy_enabled'
                                            value={auction.inst_buy_enabled}
                                            placeholder='Enable Instant Buy'
                                            onChange={handleInstBuyChange}
                                        />
                                    </div>
                                    <div className='col-4'>
                                        <input
                                            type='text'
                                            name='min_bid'
                                            className='form-control formInput'
                                            value={auction.min_bid}
                                            placeholder='Minimum Bid'
                                            onChange={handleValueChange}
                                        />
                                    </div>
                                </div>
                                {/* Row 3 of form */}
                                <div className='row formRow'>

                                    </div>
                                </div>
                                {/* Row 4 of form */}
                                <div className='row formRow'>
                                    <div className='col'>
                                        <textarea
                                            rows={3}
                                            name='description'
                                            className='form-control formInput'
                                            value={auction.description}
                                            placeholder='Product Description'
                                            onChange={handleValueChange}
                                        />

                                    </div>
                                </div>
                                <div>
                                    <ReactDropdown
                                        options={options}
                                        onChange={handleDropdownChange}
                                        name='category_id'
                                        value={auction.category_id}
                                        placeholder='Category' />
                                </div>
                                <button className='submit-btn btn btn-primary contact-btn' type='submit'>
                                    Add
                                </button>
                            </form>
                        </div>
                        <ToastContainer/>
                    </div>
                </div>
            </div>
        </div>
    );
};


//     return (
//         <Fragment>
//             <h1 className="text-center mt-5">Welcome to BidOff</h1>
//             <form className="d-flex mt-5" onSubmit={onSubmitForm}>
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="title"
//                     value={auction.title}
//                     placeholder="Title"
//                     onChange={handleValueChange}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="description"
//                     value={auction.description}
//                     placeholder="Description"
//                     onChange={handleValueChange}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="image_link"
//                     value={auction.image_link}
//                     placeholder="Image_link"
//                     onChange={handleValueChange}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="user_id"
//                     value={auction.user_id}
//                     placeholder="User ID"
//                     onChange={handleValueChange}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="end_datetime"
//                     value={auction.end_datetime}
//                     placeholder="end datetime"
//                     onChange={handleValueChange}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="min_bid"
//                     value={auction.min_bid}
//                     placeholder="min bid"
//                     onChange={handleValueChange}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="inst_buy_enabled"
//                     value={auction.inst_buy_enabled}
//                     placeholder="inst buy enabled"
//                     onChange={handleValueChange}
//                 />
//                 <input
//                     type="text"
//                     className="form-control"
//                     name="inst_buy_price"
//                     value={auction.inst_buy_price}
//                     placeholder="inst buy price"
//                     onChange={handleValueChange}
//                 />
//                 <button className="btn btn-success">Add</button>
//             </form>
//         </Fragment>
//     )
// }

export default InputListing;