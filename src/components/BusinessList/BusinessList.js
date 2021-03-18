import React from 'react'
import './BusinessList.css'
import Business from '../Business/Business'

export default function BusinessList({ businesses }) {
    return (
        <div className="BusinessList">
           { businesses.map((business) => {
               const {id, image_url, name, location, categories, rating, review_count} = business
               return (
                <Business 
                    key={id}
                    imageSrc={image_url}
                    name={name}
                    address={location.address1}
                    city={location.city}
                    state={location.state}
                    zipCode={location.zip_code}
                    category={categories[0].alias}
                    rating={rating}
                    reviewCount={review_count}
                />
               )
           })}
        </div>
    )
}
