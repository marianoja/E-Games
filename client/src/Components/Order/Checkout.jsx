import React from 'react';
import './styles/checkout.css'
import {checkOut} from '../../store/actions/Order'
import {connect} from 'react-redux'

export class Checkout extends React.Component {
    constructor() {
        super();
        this.state={
            firstName:"",
            lastName:"",
            adress:"",
            country:"",
            state:"",
            zip:"",
            ccname:"",
            ccnumber:"",
            ccexpiration:"",
            cccvv:"",
        }
        this.setInput = this.setInput.bind(this)
        this.submit = this.submit.bind(this)
    }

    setInput= e =>{
        const value = e.target.value;
        const id = e.target.id;
        this.setState({
            [id] : value
        })
    }

    submit = e =>{
        e.preventDefault();
        this.props.checkout(this.state)

    }

    render() {
        console.log(this.state)
        return (
            <div id="checkout" class="container">
                <div class="py-5 text-center">
                    <h2>Checkout </h2>
                </div>

                <div class="row">
                    <div class="col-md-12 order-md-1">
                        <h4 class="mb-3">Billing address</h4>
                        <form onSubmit={this.submit.bind(this)} class="needs-validation" novalidate>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="firstName">First name</label>
                                    <input onChange={this.setInput} type="text" class="form-control" id="firstName" placeholder="" value={this.state.firstName} required />
                                    <div class="invalid-feedback">
                                        Valid first name is required.
                      </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="lastName">Last name</label>
                                    <input onChange={this.setInput} type="text" class="form-control" id="lastName" placeholder="" value={this.state.lastName} required />
                                    <div class="invalid-feedback">
                                        Valid last name is required.
                      </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="address">Address</label>
                                <input onChange={this.setInput} type="text" class="form-control" id="address" value={this.state.address} placeholder="1234 Main St" required />
                                <div class="invalid-feedback">
                                    Please enter your shipping address.
                    </div>
                            </div>

                            <div class="mb-3">
                                <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                            </div>

                            <div class="row">
                                <div class="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select onChange={this.setInput} class="custom-select d-block w-100" id="country" required>
                                        <option value="">Choose...</option>
                                        <option id="country" value="Argentina">Argentina</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid country.
                      </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="state">State</label>
                                    <select onChange={this.setInput.bind(this)} class="custom-select d-block w-100" id="state" required>
                                        <option value="">Choose...</option>
                                        <option id="state" value="Buenos Aires">Buenos Aires</option>
                                        <option id="state" value="Mendoza">Mendoza</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please provide a valid state.
                      </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="zip">Zip</label>
                                    <input onChange={this.setInput} type="text" class="form-control" id="zip" placeholder="" value={this.state.zip} required />
                                    <div class="invalid-feedback">
                                        Zip code required.
                      </div>
                                </div>
                            </div>
                            <hr class="mb-4" />

                            <h4 class="mb-3">Payment</h4>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="cc-name">Name on card</label>
                                    <input onChange={this.setInput} value={this.state.ccname} type="text" class="form-control" id="ccname" placeholder="" required />
                                    <small class="text-muted">Full name as displayed on card</small>
                                    <div class="invalid-feedback">
                                        Name on card is required
                      </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="cc-number">Credit card number</label>
                                    <input onChange={this.setInput} value={this.state.ccnumber} type="text" class="form-control" id="ccnumber" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Credit card number is required
                      </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 mb-3">
                                    <label for="cc-expiration">Expiration</label>
                                    <input onChange={this.setInput} value={this.state.ccexpiration} type="text" class="form-control" id="ccexpiration" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Expiration date required
                      </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="cc-cvv">CVV</label>
                                    <input onChange={this.setInput} value={this.state.ccvv} type="text" class="form-control" id="cccvv" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Security code required
                      </div>
                                </div>
                            </div>
                            <hr class="mb-4" />
                            <button class="btn btn-primary btn-lg btn-block" type="submit">Check out</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return{
        checkout : (o) => dispatch(checkOut(o)),
    }
}

export default connect(null,mapDispatchToProps)(Checkout)