import Sidebar from "../sidebar/Sidebar";

const React = require('react');

function WalletsPage() { // FIXME
    return ([
        <main>
            <h1>WIP</h1>
            STATIC
            <div className="card">
                <div className="head">
                    <h1>My wallets</h1>
                    <div className="right actions">
                        <a className="create" href="create-wallet.html"><i className="fas fa-plus-square"></i></a>
                    </div>
                </div>
            </div>

            <section className="card">
                <div className="head">
                    <h2><a className="link" href="wallet.html">My wallet 1</a></h2>
                    <div className="actions">
                        <a className="edit" href="edit-wallet.html"><i className="fas fa-edit"></i></a>
                        <a className="delete" href="wallet/ID/delete"><i className="fas fa-trash"></i></a>
                        <a className="send" href="create-transaction.html"><i className="fas fa-share"></i></a>
                    </div>
                </div>

                <div className="row">
                    <p className="field-label">Balance:</p>
                    <p className="field">100</p>
                </div>
                <div className="row">
                    <p className="field-label">Currency:</p>
                    <p className="field">UAH</p>
                </div>
            </section>

            <section className="card">
                <div className="head">
                    <h2><a className="link" href="wallet.html">My wallet 2</a></h2>
                    <div className="actions">
                        <a className="edit" href="edit-wallet.html"><i className="fas fa-edit"></i></a>
                        <a className="delete" href="wallet/ID/delete"><i className="fas fa-trash"></i></a>
                        <a className="send" href="create-transaction.html"><i className="fas fa-share"></i></a>
                    </div>
                </div>

                <div className="row">
                    <p className="field-label">Balance:</p>
                    <p className="field">50</p>
                </div>
                <div className="row">
                    <p className="field-label">Currency:</p>
                    <p className="field">USD</p>
                </div>
            </section>
        </main>,
        <Sidebar/>
    ]);
}

export default WalletsPage;