<?php

namespace App\Http\Controllers;

use App\Models\EPOrder;
use App\Models\EPReview;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function saveReview(Request $rq)
    {
        $review = new EPReview();
        $review->customer_id= $rq->header("UserID");
        $review->order_id= $rq->o_id;
        $review->order_rating=$rq->order_rating;
        $review->comment=$rq->comment;
        $review->delman_rating=$rq->rider_rating;
        $review->save();
        if ($review->save()) {
            EPOrder::where('order_id',$rq->o_id)->update(['review_status' => "true"]);
            return response()->json(["msg" => "reg success"]);
        }
        // if ($cus->save())
        //     session()->flash('regSuccess', 'Registration Success, Login now');
        //return redirect()->route('home');

        //return "Registration failed";

    }
}
