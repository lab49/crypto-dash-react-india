import React from "react";
import AccountWallet from '../../src/components/accountWallet/indes';

const WalletLayout = () => {

    return (
        <div className="row col-11 flex-column main">
            <section>
                <AccountWallet/>
            </section>
        </div>
    )
}

export default WalletLayout;