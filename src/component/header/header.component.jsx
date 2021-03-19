import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import '../header/header.styles.scss'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user-selectors'
import { stateHidden } from '../../redux/cart/cart-selectors'
import { connect } from 'react-redux'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import CartIcon  from '../cart-icon/cart-icon.component'

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link to='/shop' className='option'>
                Shop
            </Link>
            <Link to='/shop' className='option'>
                Contact
            </Link>
            {
                currentUser ? (
                    <div className='option' onClick={ () => auth.signOut()}>Sign Out, {currentUser.displayName}</div>
                )
                : (
                    <Link className='option' to='/signin'>
                        Sign In
                    </Link>
                )

            }
            <CartIcon/>
        </div>
        {
        hidden ? null : 
        <CartDropdown/>
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: stateHidden
})

export default connect(mapStateToProps)(Header)