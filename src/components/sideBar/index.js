import React from 'react';
import Image from 'next/image';
import ListItems from './ListItems';
import { Bag, Wallet } from 'react-bootstrap-icons';

const SideBar = () => {
    const listItem = [
        { id: 'market', label: 'Market', ImageComp: Bag, path: '/' },
        // { id: 'wallet', label: 'Wallet', ImageComp: Wallet, path: '/wallet' },
    ]

    return (
        <nav className="col-1 side-bar">
            <div className="app-logo">
                <Image src="/app-logo.png" height={48} width={48} alt="Crypto App"/>
            </div>
            <ul className="menu-list">
                {listItem.map(ListItems)}
            </ul>
        </nav>
    )
}

export default SideBar;