import React from 'react'

import CollectionItem from '../../component/collection-item/collection-item.component'

import { connect } from 'react-redux'

import { selectCollection } from '../../redux/shop/shop.selectors'

import './collection.styles.scss'

const CollectionPage = ({colleciton}) => {
    const {title, items} = colleciton;
    return(
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => (<CollectionItem key={item.id} item={item}/>))
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    colleciton: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);