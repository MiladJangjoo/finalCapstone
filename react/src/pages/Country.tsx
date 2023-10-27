import { CountryDetailsType, CountryISType, StateOfCountryDetailsType } from '../types'
import { useEffect, useState } from 'react'

import { Spinner } from 'react-bootstrap'

const Country = () => {
    const [pageLoading, setPageLoading] = useState(false)
    const [countryIS, setCountryIS] = useState<CountryISType>({} as CountryISType)
    const [statesOfCountryList, setStatesOfCountryList] = useState<StateOfCountryDetailsType[]>([
        {
            // "id": 4008,
            // "name": "Maharashtra",
            // "iso2": "MH"
        },] as StateOfCountryDetailsType[])
    const [countryDetails, setCountryDetails] = useState<CountryDetailsType>({
        // "id": 101,
        // "name": "India",
        // "iso3": "IND",
        // "iso2": "IN",
        // "phonecode": "91",
        // "capital": "New Delhi",
        // "currency": "INR",
        // "native": "भारत",
        // "emoji": "🇮🇳",
        // "emojiU": "U+1F1EE U+1F1F3"
    } as CountryDetailsType)


    useEffect(() => {
        getCountryByIP()
    }, [])

    useEffect(() => {
        if (countryIS.country) {
            getStatesOfCountryAndDetails()
        }
    }, [countryIS])


    async function getCountryByIP() {
        setPageLoading(true);
        const res = await fetch(`https://api.country.is/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(formUserDetails)
        })

        const data = await res.json()
        setCountryIS(data)
        setPageLoading(false)
    }


    async function getStatesOfCountryAndDetails() {
        setPageLoading(true);
        const res = await fetch(`https://api.countrystatecity.in/v1/countries/${countryIS.country}/states/`, {
            method: 'GET',
            headers: {
                'X-CSCAPI-KEY': 'NzBiMFlIaHZZcXN1b0l1S1ZHWHNYVEJ2WHkxa1ZFdk8yNXV4SFhWUA==',
            },
            redirect: 'follow',
        })

        const data = await res.json()
        setStatesOfCountryList(data)



        const res1 = await fetch(`https://api.countrystatecity.in/v1/countries/${countryIS.country}`, {
            method: 'GET',
            headers: {
                'X-CSCAPI-KEY': 'NzBiMFlIaHZZcXN1b0l1S1ZHWHNYVEJ2WHkxa1ZFdk8yNXV4SFhWUA==',
            },
            redirect: 'follow',
        })

        const data1 = await res1.json()
        setCountryDetails(data1)
        setPageLoading(false)
    }


    return (
        <>
            {
                pageLoading ? (
                    <Spinner className='mx-auto' />
                ) : (
                    <div>
                        <h3>The country associated with your IP is <span className="text-primary">{countryIS.country}</span></h3>
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="country-details-tab" data-bs-toggle="tab" data-bs-target="#country-details" type="button" role="tab" aria-controls="country-details" aria-selected="true">Country's Details</button>
                                {/* <button className="nav-link" id="my-trips-tab" data-bs-toggle="tab" data-bs-target="#my-trips" type="button" role="tab" aria-controls="my-trips" aria-selected="false">My Trips</button> */}
                                <button className="nav-link" id="country-states-tab" data-bs-toggle="tab" data-bs-target="#country-states" type="button" role="tab" aria-controls="country-states" aria-selected="false">Country's States</button>
                            </div>
                        </nav>
                        <div className="tab-content pt-4" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="country-details" role="tabpanel" aria-labelledby="country-details-tab" tabIndex={0}>
                                <div className='table-responsive'>
                                    <table className="table">
                                        <thead className="table-light">
                                            <tr>
                                                {
                                                    Object.entries(countryDetails).map(([key,], i: number) => (
                                                        // skip id column
                                                        (i > 0) && (
                                                            <th key={i}>{key}</th>
                                                        )
                                                    ))
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {
                                                    Object.entries(countryDetails).map(([, value], i) => (
                                                        // skip id column
                                                        (i > 0) && (
                                                            <td key={i}>{value}</td>
                                                        )
                                                    ))
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="country-states" role="tabpanel" aria-labelledby="country-states-tab" tabIndex={0}>
                                <div className=' d-flex flex-wrap'>
                                    {statesOfCountryList.map((state: StateOfCountryDetailsType, i: number) => {
                                        return <p className="badge fs-6 bg-info me-2 text-black" key={i}>{i + 1}- {state.name}</p>;
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )

}

export default Country