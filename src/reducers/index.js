import { combineReducers } from 'redux';

import {user} from './user'
import {cart} from './cart'
import {search} from './search'
import {drawer} from './drawer'
import {coupon} from './coupon'

export default combineReducers({
    user,
    cart,
    search,
    drawer,
    coupon
});
