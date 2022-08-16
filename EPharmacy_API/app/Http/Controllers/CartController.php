<?php

namespace App\Http\Controllers;

use App\Models\EPCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    // public function addToCart(Request $rq)
    // { //adding to cart after click add to cart button
    //     $rq->validate(
    //         [
    //             "quantity$rq->key" => "required|integer|max:$rq->avlQuantity",
    //         ],
    //         [
    //             "quantity$rq->key.required" => "The quantity field is required.",
    //             "quantity$rq->key.integer" => "Must be an decimal number",
    //             "quantity$rq->key.max" => "More than avaiable stock",
    //         ]
    //     );
    //     $cart = EPCart::where('customer_id', session()->get('loggedCustomer')->customer_id)
    //         ->where('medicine_id', $rq->medId)->first();
    //     if ($cart) { //update quantity if medicine already exist
    //         EPCart::where('cart_id', $cart->cart_id)->update(
    //             ['quantity' => $cart->quantity + $rq["quantity$rq->key"]]
    //         );
    //         session()->flash("added$rq->key", 'Medicine quantity updated');
    //         return back();
    //     }
    //     //if not exist
    //     $cart = new EPCart();
    //     $cart->customer_id = session()->get('loggedCustomer')->customer_id;
    //     $cart->medicine_id = $rq->medId;
    //     $cart->quantity = $rq["quantity$rq->key"];
    //     $cart->save();
    //     if ($cart->save()) {
    //         session()->flash("added$rq->key", 'Medicine added to cart');
    //         return back();
    //     } else {
    //         session()->flash("added$rq->key", 'Add to cart failed');
    //         return back();
    //     }
    // }
    public function addToCart(Request $rq)
    { //adding to cart after click add to cart button
        $validator = Validator::make(
            $rq->all(),
            [
                "quantity" => "required|integer|max:$rq->avlQuantity",
            ],
            [
                "quantity.required" => "The quantity field is required.",
                "quantity.integer" => "Must be an decimal number",
                "quantity.max" => "More than avaiable stock",
            ]
        );
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $cart = EPCart::where('customer_id', $rq->header("UserID"))
            ->where('medicine_id', $rq->medId)->first();
        if ($cart) { //update quantity if medicine already exist
            EPCart::where('cart_id', $cart->cart_id)->update(
                ['quantity' => $cart->quantity + $rq["quantity"]]
            );
            session()->flash("added", 'Medicine quantity updated');
            return back();
        }
        //if not exist
        $cart = new EPCart();
        $cart->customer_id = $rq->header("UserID");
        $cart->medicine_id = $rq->medId;
        $cart->quantity = $rq["quantity"];
        $cart->save();
        if ($cart->save()) {
            session()->flash("added", 'Medicine added to cart');
            return back();
        } else {
            session()->flash("added", 'Add to cart failed');
            return back();
        }
    }
    public function removeFromCart($id)
    {
        EPCart::where('cart_id', $id)->delete();
        return redirect()->route('cus.cart');
    }
}
