import Card from '../components/Card';
import Row from '../components/Row';
import PageWithSidebar from './PageWithSidebar';

const React = require('react');

export default function WalletsPage() { // FIXME
    return (
        <PageWithSidebar>
            <h1>WIP STATIC</h1>
            <Card title='My wallets'
                actions={
                    <div className='right actions'>
                        <a className='create' href='create-wallet.html'><i className='fas fa-plus-square'/></a>
                    </div>
                }/>

            <Card title={<a className='link' href='wallet.html'>My wallet 1</a>}
                actions={
                    <div className='actions'>
                        <a className='edit' href='edit-wallet.html'><i className='fas fa-edit'/></a>
                        <a className='delete' href='wallet/ID/delete'><i className='fas fa-trash'/></a>
                        <a className='send' href='create-transaction.html'><i className='fas fa-share'/></a>
                    </div>
                }>

                <Row label='Balance:' value='100'/>
                <Row label='Currency:' value='UAH'/>
            </Card>

            <Card title={<a className='link' href='wallet.html'>My wallet 2</a>}
                actions={
                    <div className='actions'>
                        <a className='edit' href='edit-wallet.html'><i className='fas fa-edit'/></a>
                        <a className='delete' href='wallet/ID/delete'><i className='fas fa-trash'/></a>
                        <a className='send' href='create-transaction.html'><i className='fas fa-share'/></a>
                    </div>
                }>

                <Row label='Balance:' value='50'/>
                <Row label='Currency:' value='USD'/>
            </Card>
        </PageWithSidebar>
    );
}
