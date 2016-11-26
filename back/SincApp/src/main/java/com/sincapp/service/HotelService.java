
package com.sincapp.service;

import com.sincapp.domain.City;
import com.sincapp.domain.Hotel;
import com.sincapp.domain.Review;
import com.sincapp.domain.ReviewDetails;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HotelService {

	Hotel getHotel(City city, String name);

	Page<Review> getReviews(Hotel hotel, Pageable pageable);

	Review getReview(Hotel hotel, int index);

	Review addReview(Hotel hotel, ReviewDetails details);

	ReviewsSummary getReviewSummary(Hotel hotel);

}
