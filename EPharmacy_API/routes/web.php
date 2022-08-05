<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/med/id={id}/Order/place',[MedicineController::class,'checkStock'])->name('check.stock');
//**THIS ROUTE IS MERGED WITH CART PAGE # Route::post('/place',[OrderController::class,'placeOrder'])->name('place.order'); //after clicking Checkout. provide address & pay method in this page
//Route::get('/testall',[UserController::class,'getAll'])->name('details.all');
Route::get('/',[CustomerController::class,'home'])->name('home');
Route::get('/aboutUs',[CustomerController::class,'about'])->name('about');
Route::get('/contactUs',[CustomerController::class,'contact'])->name('contactUs');

Route::get('/login',[LoginController::class,'login'])->name('user.login');
Route::post('/login',[LoginController::class,'verifyLogin'])->name('user.login.verify');
Route::get('/logout',[LoginController::class,'logout'])->name('user.logout')->middleware('logged.Customer');
Route::get('/registration',[CustomerController::class,'reg'])->name('cus.reg');
Route::post('/registration',[CustomerController::class,'regSubmit'])->name('cus.reg.submit');

Route::get('/profile',[CustomerController::class,'profile'])->name('cus.profile')->middleware('logged.Customer'); //edit or view profile
Route::post('/profile',[CustomerController::class,'editProfile'])->name('cus.profile.edit')->middleware('logged.Customer'); //save the edit after click 'save'

Route::get('/search',[MedicineController::class,'searchResult'])->name('search.result'); //show search result
Route::get('/details/med/id={id}',[MedicineController::class,'details'])->name('med.details'); //show medicine full details
Route::post('/add-to-cart',[CartController::class,'addtocart'])->name('cus.addtocart')->middleware('logged.Customer'); //from search result/detials page


Route::get('/cart',[CustomerController::class,'cart'])->name('cus.cart')->middleware('logged.Customer'); //view cart
Route::get('/cart/remove_med/{id}',[CartController::class,'removeFromCart'])->name('cart.remove')->middleware('logged.Customer'); //remove medicine from cart
Route::post('/order/confirm',[OrderController::class,'confirmOrder'])->name('confirm.order')->middleware('logged.Customer'); //after clicking placeOrder button in cart page
Route::post('/order/placed_confirm',[OrderController::class,'confirmPage'])->name('confirm.order.page')->middleware('logged.Customer'); //confirmation msg page
Route::get('/order/all/list',[OrderController::class,'showList'])->name('order.list')->middleware('logged.Customer'); //show all order of customer
Route::get('/cancel/order/{id}',[OrderController::class,'cancelOrder'])->name('order.cancel')->middleware('logged.Customer'); //cancel an order on click
Route::get('/details/order/{id}',[OrderController::class,'orderDetails'])->name('order.details')->middleware('logged.Customer'); //show details in individual page
Route::get('/order/receipt/{id}',[OrderController::class,'downloadReceipt'])->name('receipt.download')->middleware('logged.Customer');




