const React = require('react');

export default function UserWallets() { // FIXME
    return (
        <section className='card'>
            <h1>WIP STATIC</h1>
            <div className='head'>
                <h2><a className='link' href='index.html'>My wallets</a></h2>
            </div>

            <ul>
                <li>
                    <a className='link' href='wallet.html'>
                        <div className='row'>
                            <p className='field-label'>Wallet 1:</p>
                            <p className='field'>100 UAH</p>
                        </div>
                    </a>
                </li>

                <li>
                    <a className='link' href='wallet.html'>
                        <div className='row'>
                            <p className='field-label'>Wallet 2:</p>
                            <p className='field'>50 USD</p>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
    );
}
