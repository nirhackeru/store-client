import React, {useEffect, lazy, Suspense } from 'react'
import {Switch, Route} from "react-router-dom"
import {loadUser} from './actions/user'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from './store';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register'
// import Home from './pages/Home'
// import Header from './components/nav/Header'
// 
// import AdminDashboard from './pages/admin/AdminDashboard'
// import CategoryCreate from './pages/admin/CategoryCreate'
// import CategoryUpdate from './pages/admin/CategoryUpdate'
// import SubCreate from './pages/admin/SubCreate'
// import SubUpdate from './pages/admin/SubUpdate'
// import ProductCreate from './pages/admin/ProductCreate'
// import History from './pages/user/History'

// import AdminRoute from './components/routes/AdminRoute'
// import UserRoute from "./components/routes/UserRoute";

const Login = lazy(() => import('./pages/auth/Login'))  ;
const Register = lazy(() => import('./pages/auth/Register'))
const Home = lazy(() => import('./pages/Home'))

const Header = lazy(() =>import('./components/nav/Header')) 
const AdminDashboard = lazy(() =>import('./pages/admin/AdminDashboard')) 
const CategoryCreate = lazy(() =>import('./pages/admin/CategoryCreate')) 
const CategoryUpdate = lazy(() =>import('./pages/admin/CategoryUpdate')) 
const SubCreate = lazy(() =>import('./pages/admin/SubCreate')) 
const SubUpdate = lazy(() =>import('./pages/admin/SubUpdate')) 
const ProductCreate = lazy(() =>import('./pages/admin/ProductCreate')) 
const History = lazy(() =>import('./pages/user/History')) 
const AllProducts = lazy(() => import('./pages/admin/AllProducts'))
const ProductUpdate= lazy(()=>import("./pages/admin/ProductUpdate"))  
const Product= lazy(()=>import("./pages/Product"))  


const CategoryHome = lazy(() => import("./pages/category/CategoryHome"))
const SubHome = lazy(() => import("./pages/sub/SubHome"))
const Shop = lazy(() => import("./pages/Shop"))
const Cart = lazy(() => import("./pages/Cart"))
const Checkout = lazy(() => import("./pages/Checkout"))
const CreateCouponPage = lazy(() => import("./pages/admin/CreateCouponPage"))
const Wishlist = lazy(() => import("./pages/user/Wishlist"))


const AdminRoute = lazy(() =>import('./components/routes/AdminRoute')) 
const UserRoute = lazy(() =>import("./components/routes/UserRoute"));




const App = () => {
  useEffect(() => {
    console.log('app get token')
    let token
        if (localStorage.getItem("token")) {
            token = localStorage.getItem("token");
            store.dispatch(loadUser(token));
        } 
    
  }, []);
  return (
    <Suspense fallback={<div className="col text-center p-5">loading...</div>}>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/product/:slug" component={Product} />
        
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />

        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />


      
      </Switch>

    </Suspense>
  );
}

export default App;
