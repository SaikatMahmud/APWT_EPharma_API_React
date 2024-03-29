<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/',[CustomerController::class,'home'])->name('home');
Route::get('/aboutUs',[CustomerController::class,'about'])->name('about');
Route::get('/contactUs',[CustomerController::class,'contact'])->name('contactUs');

Route::get('/login',[LoginController::class,'login'])->name('user.login');
Route::post('/login',[LoginController::class,'verifyLogin'])->name('user.login.verify');
Route::get('/logout',[LoginController::class,'logout'])->name('user.logout');
Route::get('/registration',[CustomerController::class,'reg'])->name('cus.reg');
Route::post('/registration',[CustomerController::class,'regSubmit'])->name('cus.reg.submit');

Route::get('/profile',[CustomerController::class,'profile'])->name('cus.profile')->middleware('verify.api'); //edit or view profile
Route::post('/profile',[CustomerController::class,'editProfile'])->name('cus.profile.edit')->middleware('verify.api'); //save the edit after click 'save'
Route::post('/profile-image',[CustomerController::class,'editProfileImage'])->name('cus.profile.editImage')->middleware('verify.api'); //save the edit after click 'save'

Route::get('/search',[MedicineController::class,'searchResult'])->name('search.result'); //show search result
Route::get('/details/med/id={id}',[MedicineController::class,'details'])->name('med.details'); //show medicine full details
Route::post('/add-to-cart',[CartController::class,'addtocart'])->name('cus.addtocart')->middleware('verify.api'); //from search result/detials page


Route::get('/cart',[CustomerController::class,'cart'])->name('cus.cart')->middleware('verify.api'); //view cart
Route::post('/cart/remove_med/{id}',[CartController::class,'removeFromCart'])->name('cart.remove')->middleware('verify.api'); //remove medicine from cart
Route::post('/order/confirm',[OrderController::class,'confirmOrder'])->name('confirm.order')->middleware('verify.api'); //after clicking placeOrder button in cart page
Route::post('/order/placed_confirm',[OrderController::class,'confirmPage'])->name('confirm.order.page')->middleware('verify.api'); //confirmation msg page
Route::get('/order/all/list',[OrderController::class,'showList'])->name('order.list')->middleware('verify.api'); //show all order of customer
Route::post('/cancel/order/{id}',[OrderController::class,'cancelOrder'])->name('order.cancel')->middleware('verify.api'); //cancel an order on click
Route::post('/details/order/{id}',[OrderController::class,'orderDetails'])->name('order.details')->middleware('verify.api'); //show details in individual page
Route::get('/order/receipt/{id}',[OrderController::class,'downloadReceipt'])->name('receipt.download')->middleware('verify.api');


Route::post('/return/order/{id}',[OrderController::class,'returnOrder'])->name('order.return')->middleware('verify.api'); //cancel an order on click
Route::post('/review/order',[ReviewController::class,'saveReview'])->name('order.review')->middleware('verify.api'); //cancel an order on click
Route::post('/expense/history',[OrderController::class,'orderHistory'])->name('order.review')->middleware('verify.api'); //cancel an order on click
